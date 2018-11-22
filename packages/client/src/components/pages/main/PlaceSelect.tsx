import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MapMarkerIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField/TextField";
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
        SelectProps={{
          classes: {
            icon: classes.selectIcon
          }
        }}
        label={label}
        select={true}
        variant="outlined"
        fullWidth={true}
        value={place.placeId}
        margin="normal"
      >
        {places.map(origin => (
          <MenuItem key={origin.placeId} value={origin.placeId}>
            {origin.query}
          </MenuItem>
        ))}
      </TextField>
    )
  );
};

export default PlaceSelect;
