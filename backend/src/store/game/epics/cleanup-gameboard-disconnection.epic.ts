import { Epic } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { disconnectGameBoard } from "../game.slice";
import { message, logger } from "../../../log";

export const cleanupGameBoardDisconnectionEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(disconnectGameBoard.match),
    tap(({ payload }) => {
      const { socket } = payload;
      gameBoardSocketMap.delete(socket.data.roomCode);
      logger.info(message.info.gameBoardDisconnected(socket.id));
    }),
    ignoreElements()
  );