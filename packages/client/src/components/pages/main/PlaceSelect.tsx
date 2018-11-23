import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";
import { MainClassKey } from "./Main";

export interface PlaceSelectProps {
  classes: Record<MainClassKey, string>;
  label: string;
  place: google.maps.Place;
  places: google.maps.Place[];
}

type Props = PlaceSelectProps;

const PlaceSelect = (props: Props) => {
  const { classes, label, place, places } = props;
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
        label={label}
        select={true}
        variant="outlined"
        fullWidth={true}
        value={place.placeId}
        margin="normal"
      >
        {places.map(p => (
          <MenuItem key={p.placeId} value={p.placeId}>
            {p.query}
          </MenuItem>
        ))}
      </TextField>
    )
  );
};

export default PlaceSelect;
