import FlashCircle from "mdi-material-ui/FlashCircle";
import GraphqlIcon from "mdi-material-ui/Graphql";
import Page from "pangwarta-shared/dist/lib/@types/page";

const pages: Page[] = [
  {
    icon: GraphqlIcon,
    pathname: "/",
    title: "Todos (GraphQL)"
  },
  {
    icon: FlashCircle,
    pathname: "/local",
    title: "Todos (Local Storage)"
  }
];

export default pages;
