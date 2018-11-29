import Routes from "next-routes";
// tslint:disable:no-var-requires
// @ts-ignore
const nextRoutes = require("next-routes");

const routes: Routes = nextRoutes();

export default routes
  .add({ page: "index", pattern: "/", name: "main" })
  .add({ name: "ride", page: "ride", pattern: "ride/:id" });
