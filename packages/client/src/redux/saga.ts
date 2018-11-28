/* global fetch */

import es6promise from "es6-promise";
import { Set } from "immutable";
import "isomorphic-unfetch";
import differenceWith from "lodash/differenceWith";
import findIndex from "lodash/findIndex";
import isEqual from "lodash/isEqual";
import uniqWith from "lodash/uniqWith";
import { all, call, put, select } from "redux-saga/effects";
import { createSelector } from "reselect";
import uuid from "uuid/v1";
import { passengersSelector } from "../components/pages/main/Main";
import orangeTaxiFare from "../domain/orange-taxi-fare";
import { Game } from "../domain/shapley";
import TaxiRide, { Passenger, Player } from "../domain/TaxiRide";
import { addResultAction } from "./actions";
import State from "./State";

es6promise.polyfill();

function rideSelector(state: State) {
  return state.currentTaxiRide;
}

const selector = createSelector(
  rideSelector,
  passengersSelector,
  (taxiRide, passengers) => ({
    passengers,
    taxiRide
  })
);

function getDirections(request: google.maps.DirectionsRequest) {
  const directionsService = new google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(status);
      }
    });
  });
}

function initPlayers(passengers: Passenger[]): Player[] {
  return passengers.map(p => ({
    ...p,
    legs: []
  }));
}

function assignPlayerLegs(
  players: Player[],
  legs: google.maps.DirectionsLeg[]
): Player[] {
  return players.map(player => {
    const firstLegIndex = findIndex(legs, leg =>
      isEqual(leg.start_location.toJSON(), player.pickUpLocation.location)
    );
    const lastLegIndex = findIndex(legs, leg =>
      isEqual(leg.end_location.toJSON(), player.dropOffLocation.location)
    );
    return {
      ...player,
      legs: legs.slice(firstLegIndex, lastLegIndex + 1)
    };
  });
}

function identifyPlayers(
  passengers: Passenger[],
  directionsResult: google.maps.DirectionsResult
): Player[] {
  const { legs } = directionsResult.routes[0];
  return assignPlayerLegs(initPlayers(passengers), legs).map(player => {
    return {
      ...player,
      distance: player.legs.reduce(
        (total, leg) => total + leg.distance.value,
        0
      )
    };
  });
}

function withMinutes(minutes: number, isBooked: boolean, isDaytime: boolean) {
  return function coalitionFare(coalition: Set<Player>): number {
    const legs: Set<google.maps.DirectionsLeg> = coalition
      .map(c => Set(c.legs))
      .toSet()
      .flatten()
      .toSet();
    const distance = legs.reduce((total, leg) => total + leg.distance.value, 0);
    return orangeTaxiFare({
      distance,
      isBooked,
      isDaytime,
      minutes
    });
  };
}

function* splitFareSaga() {
  const {
    taxiRide,
    passengers
  }: { taxiRide: TaxiRide; passengers: Passenger[] } = yield select(selector);
  const waypoints: google.maps.DirectionsWaypoint[] = passengers
    .map(p => [p.dropOffLocation, p.pickUpLocation])
    .reduce((a, b) => a.concat(b))
    .map(p => ({
      location: p.location,
      stopover: true
    }));
  const originAndDest: google.maps.DirectionsWaypoint[] = [
    { location: taxiRide.origin.location, stopover: true },
    { location: taxiRide.destination.location, stopover: true }
  ];
  const distinctWaypoints = uniqWith(
    differenceWith(waypoints, originAndDest, isEqual),
    (a: google.maps.DirectionsWaypoint, b: google.maps.DirectionsWaypoint) =>
      isEqual(a.location, b.location)
  );
  const request: google.maps.DirectionsRequest = {
    destination: taxiRide.destination,
    optimizeWaypoints: true,
    origin: taxiRide.origin,
    travelMode: google.maps.TravelMode.DRIVING,
    waypoints: distinctWaypoints
  };
  const directionsResult: google.maps.DirectionsResult = yield call(
    getDirections,
    request
  );
  const players: Player[] = identifyPlayers(passengers, directionsResult);
  const { isBooked, isDaytime } = taxiRide;
  const tenMinGame = new Game(
    Set(players),
    withMinutes(10, isBooked, isDaytime)
  );
  const tenMinPlayers = players.map(p => ({
    ...p,
    fare: Number(tenMinGame.shapley(p).toString())
  }));

  const zeroMinGame = new Game(
    Set(players),
    withMinutes(0, isBooked, isDaytime)
  );

  const zeroMinPlayers = players.map(p => ({
    ...p,
    fare: Number(zeroMinGame.shapley(p).toString())
  }));
  yield put(
    addResultAction({
      directionsResult,
      id: uuid(),
      result: {
        tenMinPlayers,
        zeroMinPlayers
      },
      taxiRide
    })
  );
}

function* rootSaga() {
  yield all([splitFareSaga]);
}

export default rootSaga;
