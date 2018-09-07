import Typography from "@material-ui/core/Typography";
import * as React from "react";
import withRoot from "../src/components/layout/withRoot";
import pages from "../src/pages";

const Index = () => <Typography>Index</Typography>;

export default withRoot(pages)(Index);
