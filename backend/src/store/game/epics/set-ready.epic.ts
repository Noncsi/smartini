import { Epic } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { setReady } from "../game.slice";
import { log } from "../../../log";

export const setReadyEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(setReady.match),
    tap(({ payload }) => {
      const { roomCode, playerId, isReady } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      gameBoardSocket?.nsp.emit(SocketEvent.PlayerSetReady, {
        playerId,
        isReady,
      });

      log.info.playerStatusSet(playerId, roomCode, isReady);
    }),
    ignoreElements()
  );
