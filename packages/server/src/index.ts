import { CorsOptions } from "cors";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";

const cors = require("cors");

const server = new GraphQLServer({
  context: req => ({ ...req, db: prisma }),
  resolvers: resolvers as any,
  typeDefs: "../../schema.graphql"
});

const corsOptions: CorsOptions = {
  credentials: true,
  origin: "*"
};

// tslint:disable:no-console
server
  .use(cors(corsOptions))
  .start(() => console.log("Server is running on http://localhost:4000"))
  .catch(console.error);
