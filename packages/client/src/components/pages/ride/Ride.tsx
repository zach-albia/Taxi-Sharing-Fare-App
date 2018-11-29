import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import GoogleMap from "google-map-react";
import getConfig from "next/config";
import * as React from "react";
import { connect } from "react-redux";
import GoogleMapsApi from "../../../@types/GoogleMapsApi";
import State, { Result } from "../../../redux/State";
import TaxiSharingAppBar from "../TaxiSharingAppBar";

export interface RideProps {
  id: string;
}

interface ReduxProps {
  results: Record<string, Result>;
}

type Props = RideProps & ReduxProps;

const {
  publicRuntimeConfig: {
    google: {
      api: { key }
    }
  }
} = getConfig();

interface RideState {
  duration: number; // in seconds
  finished: boolean;
  startTime?: Date;
  timer?: any;
  timerRunning: boolean;
}

const tenMinutes = 600; // seconds

class Ride extends React.Component<Props> {
  state: RideState = { duration: 0, finished: false, timerRunning: false };
  private startTimer = () => {
    const timer = setInterval(() => {
      const now = new Date();
      const duration = (now.getTime() - this.state.startTime.getTime()) / 1000;
      this.setState({ duration });
    }, 1000);
    this.setState({
      startTime: new Date(),
      timer,
      timerRunning: true
    });
  };

  private stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({ finished: true, timerRunning: false });
  };

  render() {
    const { id, results } = this.props;
    const { duration, finished, timerRunning } = this.state;
    const result = results[id];
    const players =
      duration >= tenMinutes
        ? result.result.tenMinPlayers
        : result.result.zeroMinPlayers;
    const { legs } = result.directionsResult.routes[0];
    const distance = legs.reduce((s, l) => s + l.distance.value, 0);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return (
      <>
        <TaxiSharingAppBar />
        <div
          style={{
            height: "calc(100vh - 104px)",
            padding: 0,
            position: "relative",
            width: "100%",
            zIndex: 1
          }}
        >
          <GoogleMap
            bootstrapURLKeys={{
              key
            }}
            defaultCenter={{
              lat: 26.1065941,
              lng: 50.5093452
            }}
            defaultZoom={10}
            onGoogleApiLoaded={({ map }: GoogleMapsApi) => {
              const directionsDisplay = new google.maps.DirectionsRenderer();
              directionsDisplay.setMap(map);
              directionsDisplay.setDirections(result.directionsResult);
            }}
            yesIWantToUseGoogleMapApiInternals={true}
          />
          <ExpansionPanel
            style={{ position: "relative", top: -16 }}
            elevation={0}
            expanded={true}
          >
            <ExpansionPanelSummary>
              <Typography variant="subheading">Ride Itinerary</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Typography variant="caption">Origin</Typography>
                <Typography gutterBottom={true}>
                  {result.taxiRide.origin.query}
                </Typography>
                <Typography variant="caption">Destination</Typography>
                <Typography gutterBottom={true}>
                  {result.taxiRide.destination.query}
                </Typography>
                <Typography variant="caption">Distance</Typography>
                <Typography gutterBottom={true}>
                  {distance / 1000} km
                </Typography>
                <Typography variant="caption">Passengers:</Typography>
                {players.map(p => {
                  return (
                    <Typography key={p.id} gutterBottom={true}>
                      {p.name} - BD {p.fare / 1000} - {p.distance / 1000} km
                    </Typography>
                  );
                })}
                <Typography variant="caption">Duration</Typography>
                <Typography>
                  {minutes}:{paddedSeconds}
                </Typography>
              </div>
            </ExpansionPanelDetails>
            {!finished && (
              <ExpansionPanelActions>
                {timerRunning ? (
                  <Button onClick={this.stopTimer}>End Ride</Button>
                ) : (
                  <Button onClick={this.startTimer}>Start Ride</Button>
                )}
              </ExpansionPanelActions>
            )}
          </ExpansionPanel>
        </div>
      </>
    );
  }
}

function mapStateToProps({ results }: State) {
  return { results };
}

export default connect(mapStateToProps)(Ride);
