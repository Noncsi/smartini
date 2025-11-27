import { gameSlice } from "./game.slice";

export const gameActions = gameSlice.actions;

export type GameActions = ReturnType<
  (typeof gameSlice.actions)[keyof typeof gameSlice.actions]
>;