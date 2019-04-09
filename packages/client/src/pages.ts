import HistoryIcon from "@material-ui/icons/History";
import TaxiIcon from "@material-ui/icons/LocalTaxi";
import Page from "pangwarta-shared/@types/page";

const pages: Page[] = [
  {
    icon: TaxiIcon,
    pathname: "/",
    title: "Taxi Sharing"
  },
  {
    icon: HistoryIcon,
    pathname: "/history",
    title: "Ride History"
  }
];

export default pages;
