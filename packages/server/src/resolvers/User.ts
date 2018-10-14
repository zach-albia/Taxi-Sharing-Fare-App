import { UserResolvers } from "../generated/resolvers";
import { TypeMap } from "./types/TypeMap";

export interface UserParent {
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export const User: UserResolvers.Type<TypeMap> = {
  createdAt: parent => parent.createdAt,
  email: parent => parent.email,
  id: parent => parent.id,
  name: parent => parent.name
};
