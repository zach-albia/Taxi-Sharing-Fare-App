import Typography from "@material-ui/core/Typography";
import withRoot from "pangwarta-shared/dist/lib/layout/withRoot";
import * as React from "react";
import pages from "../src/pages";

const Index = () => <Typography>Index</Typography>;

export default withRoot(pages)(Index);
