import { Epic } from "redux-observable";
import { filter, withLatestFrom, tap, ignoreElements } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import {
  playerSocketMap,
  gameBoardSocketMap,
} from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { selectPlayersInRoom } from "../game.selectors";
import { disconnectPlayer } from "../game.slice";
import { message, logger } from "../../../log";

export const deleteSocketOnDisconnectPlayerEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(disconnectPlayer.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { socket } = payload;
      const { roomCode, playerId } = socket.data;
      playerSocketMap.delete(playerId);

      gameBoardSocketMap
        .get(roomCode)
        ?.emit(SocketEvent.Players, selectPlayersInRoom(state.game, roomCode));

      logger.info(message.info.playerDisconnected(playerId, roomCode, socket.id));
    }),
    ignoreElements()
  );
