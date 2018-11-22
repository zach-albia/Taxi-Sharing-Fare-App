import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import GoogleMapsApi from "../../../@types/GoogleMapsApi";

export interface SearchBoxProps {
  google: GoogleMapsApi;
  placeholder: string;
}

function setPacContainerZIndex() {
  $(".pac-container").css({
    position: "absolute",
    "z-index": 1200
  });
}

export default class SearchBox extends React.Component<SearchBoxProps> {
  private markers: google.maps.Marker[] = [];
  private readonly inputRef: React.RefObject<HTMLInputElement>;
  private searchBox: google.maps.places.SearchBox;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return (
      <Input
        fullWidth={true}
        inputRef={this.inputRef}
        margin="dense"
        onChange={setPacContainerZIndex}
        placeholder={this.props.placeholder}
        startAdornment={
          <InputAdornment position="end" style={{ marginRight: 8 }}>
            <SearchIcon />
          </InputAdornment>
        }
        style={{
          padding: 8
        }}
        type="text"
      />
    );
  }

  componentDidMount() {
    const input = ReactDOM.findDOMNode(
      this.inputRef.current
    ) as HTMLInputElement;
    const google = this.props.google;
    const map = google.map;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.setBounds(map.getBounds());
    map.addListener("bounds_changed", () => {
      this.searchBox.setBounds(map.getBounds());
    });
    this.searchBox.addListener("places_changed", () => {
      const places = this.searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear out the old markers.
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry) {
          // console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          anchor: new google.maps.Point(17, 34),
          origin: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(25, 25),
          size: new google.maps.Size(71, 71),
          url: place.icon
        };

        // Create a marker for each place.
        this.markers.push(
          new google.maps.Marker({
            icon,
            map,
            position: place.geometry.location,
            title: place.name
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  componentWillUnmount() {
    // https://developers.google.com/maps/documentation/javascript/events#removing
    this.props.google.maps.event.clearInstanceListeners(this.searchBox);
  }
}
