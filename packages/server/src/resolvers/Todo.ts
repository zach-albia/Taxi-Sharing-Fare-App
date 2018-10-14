import { TodoResolvers } from "../generated/resolvers";
import { TypeMap } from "./types/TypeMap";

export interface TodoParent {
  id: string;
  title: string;
  completed?: boolean;
}

export const Todo: TodoResolvers.Type<TypeMap> = {
  completed: parent => parent.completed,
  id: parent => parent.id,
  title: parent => parent.title
};
