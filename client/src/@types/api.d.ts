export type ApiFunction<Result, Vars, Error extends object = object> = (
  vars: { variables?: Vars }
) => Promise<void | { data?: Result; error?: Error }>;

export interface ApiRenderProps<PageData, PageVars, Error> {
  data?: PageData;
  error?: Error;
  loading: boolean;
}
