import { Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import red from "@material-ui/core/colors/red";
import { StandardProps } from "@material-ui/core/es";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { StyleRules } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/PersonPin";
import classNames from "classnames";
import MapMarkerIcon from "mdi-material-ui/MapMarker";
import * as React from "react";

type MainClassKey =
  | "aPersonIcon"
  | "button"
  | "fab"
  | "grow"
  | "listItem"
  | "markerIcon";

function styles(theme: Theme): StyleRules<MainClassKey> {
  return {
    aPersonIcon: {
      color: "rgba(0, 0, 0, 0.54)",
      flexShrink: 0,
      marginRight: theme.spacing.unit * 2
    },
    button: {
      marginTop: theme.spacing.unit
    },
    fab: {
      bottom: theme.spacing.unit * 2,
      position: "fixed",
      right: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    },
    listItem: {
      paddingLeft: 0
    },
    markerIcon: {
      color: red["500"]
    }
  };
}

export interface MainProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, MainClassKey> {
  classes: Record<MainClassKey, string>;
}

function Main(props: MainProps) {
  const { classes } = props;
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant="subheading"
            color="inherit"
            className={classes.grow}
          >
            Taxi-sharing
          </Typography>
          <Button color="inherit">Ride History</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="subheading" gutterBottom={true}>
        Ride Details
      </Typography>
      <Typography variant="caption" gutterBottom={true}>
        Passengers
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon
            color="inherit"
            className={classNames(classes.markerIcon, classes.aPersonIcon)}
          />
          <Typography className={classes.grow}>Fulan AlFulani</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Origin:</Typography>
                University of Bahrain
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Destination:</Typography>
                Al Kindi Specialized Hospital
              </Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small">Edit Name</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon
            color="inherit"
            className={classNames(classes.markerIcon, classes.aPersonIcon)}
          />
          <Typography className={classes.grow}>'Illan Al'illanah</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Origin:</Typography>
                Arabian Gulf University
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem} component={ButtonBase}>
              <ListItemIcon>
                <MapMarkerIcon className={classes.markerIcon} />
              </ListItemIcon>
              <Typography>
                <Typography variant="caption">Destination:</Typography>
                Al Abraaj
              </Typography>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small">Edit Name</Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <TextField
        variant="outlined"
        fullWidth={true}
        placeholder="Add a passenger..."
        margin="normal"
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.markerIcon}>
              <MapMarkerIcon />
            </InputAdornment>
          )
        }}
        label="Ride Origin"
        select={true}
        variant="outlined"
        fullWidth={true}
        value={0}
        margin="normal"
      >
        <MenuItem value={0}>University of Bahrain</MenuItem>
        <MenuItem value={1}>Arabian Gulf University</MenuItem>
      </TextField>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.markerIcon}>
              <MapMarkerIcon />
            </InputAdornment>
          )
        }}
        label="Ride Destination"
        select={true}
        variant="outlined"
        fullWidth={true}
        value={1}
        margin="normal"
      >
        <MenuItem value={0}>Al Kindi Specialized Hospital</MenuItem>
        <MenuItem value={1}>Al Abraaj</MenuItem>
      </TextField>
      <Button
        fullWidth={true}
        variant="contained"
        className={classes.button}
        color="primary"
      >
        Split the Fare
      </Button>
      <Button variant="fab" color="secondary" className={classes.fab}>
        <AddIcon />
      </Button>
    </>
  );
}

export default withStyles(styles)(Main);
