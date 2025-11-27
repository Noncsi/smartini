import { Middleware } from "redux";
import { RootState } from "./store";

export const exampleMiddleware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = (storeApi) => (next) => (action) => {
  const state = storeApi.getState(); // correctly typed as RootState
};
