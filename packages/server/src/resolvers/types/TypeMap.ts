import { ITypeMap } from "../../generated/resolvers";
import { TodoParent } from "../Todo";
import { Context } from "./Context";

export interface TypeMap extends ITypeMap {
  Context: Context;
  QueryParent: {};
  MutationParent: {};
  TodoParent: TodoParent;
}
