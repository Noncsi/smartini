import { Epic } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { disconnectGameBoard } from "../game.slice";
import { log } from "../../../log";

export const deleteSocketOnDisconnectGameBoardEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(disconnectGameBoard.match),
    tap(({ payload }) => {
      const { socket } = payload;
      gameBoardSocketMap.delete(socket.data.roomCode);
      log.info.gameBoardDisconnected(socket.id);
    }),
    ignoreElements()
  );