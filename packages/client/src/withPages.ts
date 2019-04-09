import { withRouter } from "next/router";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import pages from "./pages";

export default withRoot(pages, withRouter);
