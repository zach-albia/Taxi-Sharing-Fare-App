import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import { MainClassKey } from "./Main";

export interface PlaceSelectProps {
  classes: Record<MainClassKey, string>;
  label: string;
  onSelect: (place: google.maps.Place) => void;
  place: google.maps.Place;
  places: google.maps.Place[];
}

type Props = PlaceSelectProps;

class PlaceSelect extends React.Component<Props> {
  private onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSelect, places } = this.props;
    const i = e.target.value;
    onSelect(places[i]);
  };

  render() {
    const { classes, label, place, places } = this.props;
    return (
      places.length > 0 && (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.markerIcon}>
                <MapMarkerIcon />
              </InputAdornment>
            )
          }}
          fullWidth={true}
          label={label}
          margin="normal"
          onChange={this.onSelect}
          select={true}
          value={places.indexOf(place)}
          variant="outlined"
        >
          {places.map((p, i) => (
            <MenuItem key={p.placeId} value={i}>
              {p.query}
            </MenuItem>
          ))}
        </TextField>
      )
    );
  }
}

export default PlaceSelect;
