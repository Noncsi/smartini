import { Epic } from "redux-observable";
import { filter, withLatestFrom, tap, ignoreElements } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { playerSocketMap, gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { SocketType } from "../../types/game.types";
import { selectPlayerInRoomById, selectPlayersInRoom } from "../game.selectors";
import { playerJoins } from "../game.slice";
import { log } from "../../../log";

export const setupPlayerOnPlayerJoinsEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(playerJoins.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode, newPlayerId, newPlayerName, socket } = payload;

      const newPlayer = selectPlayerInRoomById(
        state.game,
        roomCode,
        newPlayerId
      );
      if (!newPlayer) {
        socket.emit(SocketEvent.JoinRoomError);
        return;
      }

      socket.join(roomCode);
      socket.data.clientType = SocketType.PlayerSocket;
      socket.data.roomCode = roomCode;
      socket.data.playerId = newPlayer.id;
      playerSocketMap.set(newPlayerId, socket);

      gameBoardSocketMap
        .get(roomCode)
        ?.emit(SocketEvent.Players, selectPlayersInRoom(state.game, roomCode));
      socket.emit(SocketEvent.JoinRoomSuccess, newPlayer.id);

      log.info.playerJoined(newPlayerName, roomCode);
    }),
    ignoreElements()
  );