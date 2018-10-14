import { IResolvers } from "../generated/resolvers";
import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Todo } from "./Todo";
import { TypeMap } from "./types/TypeMap";

export const resolvers: IResolvers<TypeMap> = {
  Mutation,
  Query,
  Todo
};
