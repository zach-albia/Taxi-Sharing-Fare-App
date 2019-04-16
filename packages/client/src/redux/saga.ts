/* global fetch */

import es6promise from "es6-promise";
import { Set } from "immutable";
import "isomorphic-unfetch";
import differenceWith from "lodash/differenceWith";
import findIndex from "lodash/findIndex";
import isEqualWith from "lodash/isEqualWith";
import uniqWith from "lodash/uniqWith";
import { all, call, select, takeLatest } from "redux-saga/effects";
import { createSelector } from "reselect";
import uuid from "uuid/v1";
import routes from "../../routes";
import { passengersSelector } from "../components/pages/main/Main";
import orangeTaxiFare from "../domain/orange-taxi-fare";
import { Game } from "../domain/shapley";
import TaxiRide, { Passenger, Player } from "../domain/TaxiRide";
import localStorageKeys from "../localStorageKeys";
import { FareMatrix } from "../types";
import actionTypes from "./actionTypes";
import State, { Result } from "./State";

es6promise.polyfill();

const { Router } = routes;

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

const epsilon = 0.001;

/**
 * Compares equality of locations up to up to ε * 111 km where ε is the epsilon
 *
 * @param a First location
 * @param b Second location
 *
 * @return boolean Whether locations are within ε * 111 km of each other
 */
function locationEqual(
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral
): boolean {
  return (
    Math.abs(a.lat - b.lat) <= epsilon && Math.abs(a.lng - b.lng) <= epsilon
  );
}

function assignPlayerLegs(
  players: Player[],
  legs: google.maps.DirectionsLeg[]
): Player[] {
  return players.map(player => {
    const firstLegIndex = findIndex(legs, leg => {
      return isEqualWith(
        leg.start_location.toJSON(),
        player.pickUpLocation.location,
        locationEqual
      );
    });
    const lastLegIndex = findIndex(legs, leg => {
      return isEqualWith(
        leg.end_location.toJSON(),
        player.dropOffLocation.location,
        locationEqual
      );
    });
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
    const fareMatrix = JSON.parse(
      localStorage.getItem(localStorageKeys.fareMatrix)
    ) as FareMatrix;
    return orangeTaxiFare(
      {
        distance,
        isBooked,
        isDaytime,
        minutes
      },
      fareMatrix
    );
  };
}

function* splitFare() {
  const {
    taxiRide,
    passengers
  }: { taxiRide: TaxiRide; passengers: Passenger[] } = yield select(selector);
  const points: google.maps.DirectionsWaypoint[] = passengers
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
  const justWaypoints = differenceWith(points, originAndDest, (a, b) =>
    locationEqual(
      a.location as google.maps.LatLngLiteral,
      b.location as google.maps.LatLngLiteral
    )
  );
  const distinctWaypoints = uniqWith(
    justWaypoints,
    (a: google.maps.DirectionsWaypoint, b: google.maps.DirectionsWaypoint) =>
      isEqualWith(a.location, b.location, locationEqual)
  );
  const request: google.maps.DirectionsRequest = {
    destination: taxiRide.destination.location,
    optimizeWaypoints: true,
    origin: taxiRide.origin.location,
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
  const result: Result = {
    directionsResult,
    id: uuid(),
    result: {
      tenMinPlayers,
      zeroMinPlayers
    },
    taxiRide
  };
  localStorage.setItem(`ride-${result.id}`, JSON.stringify(result));
  yield Router.pushRoute("ride", { id: result.id });
}

function* rootSaga() {
  yield all([takeLatest(actionTypes.SPLIT_FARE, splitFare)]);
}

export default rootSaga;
