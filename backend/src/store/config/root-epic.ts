import { combineEpics, Epic } from "redux-observable";
import { GameActions } from "../game/game.actions";
import { RootState } from "./store";
import {
  disconnectGameBoardEpic,
  disconnectPlayerEpic,
  emitNewRoomEpic,
  playerJoinsEpic,
  setReadyEpic,
} from "../game/game.epics";

export const rootEpic: Epic<GameActions, GameActions, RootState> = combineEpics(
  disconnectGameBoardEpic,
  disconnectPlayerEpic,
  emitNewRoomEpic,
  playerJoinsEpic,
  setReadyEpic
);
