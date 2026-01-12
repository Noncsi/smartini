import { Epic } from "redux-observable";
import { filter, tap, ignoreElements, withLatestFrom } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { setReady } from "../game.slice";
import { log } from "../../../log";
import { selectRoomByCode } from "../game.selectors";
import { Player } from "../../types/game.types";

export const setReadyEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(setReady.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode, playerId, isReady } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      gameBoardSocket?.nsp.emit(SocketEvent.PlayerSetReady, {
        playerId,
        isReady,
      });

      log.info.playerStatusSet(playerId, roomCode, isReady);

      const isAllReady = selectRoomByCode(state.game, roomCode)?.players.every(
        (player: Player) => player.isReady
      );
      gameBoardSocket?.nsp.emit(SocketEvent.ArePlayersReady, isAllReady);
    }),
    ignoreElements()
  );
