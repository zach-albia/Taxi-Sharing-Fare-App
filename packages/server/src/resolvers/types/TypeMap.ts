import { ITypeMap } from "../../generated/resolvers";
import { AuthPayloadParent } from "../AuthPayload";
import { TodoParent } from "../Todo";
import { UserParent } from "../User";
import { Context } from "./Context";

export interface TypeMap extends ITypeMap {
  Context: Context;
  QueryParent: {};
  MutationParent: {};
  TodoParent: TodoParent;
  UserParent: UserParent;
  AuthPayloadParent: AuthPayloadParent;
}
