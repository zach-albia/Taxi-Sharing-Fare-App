import { IResolvers } from "../generated/resolvers";
import { AuthPayload } from "./AuthPayload";
import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Todo } from "./Todo";
import { TypeMap } from "./types/TypeMap";
import { User } from "./User";

export const resolvers: IResolvers<TypeMap> = {
  AuthPayload,
  Mutation,
  Query,
  Todo,
  User
};
