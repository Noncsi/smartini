import { Epic } from 'redux-observable';
import { filter, withLatestFrom, tap, ignoreElements } from 'rxjs';
import SocketEvent from '../../../../../../shared/socket-event';
import { playerSocketMap, gameBoardSocketMap } from '../../../../services/socket-registry';
import { RootState } from '../../../config/store';
import { GameActions } from '../../../types/game.actions';
import { SocketType } from '../../../types/game.types';
import { selectPlayerInRoomById, selectPlayersInRoom, selectRoomByCode } from '../../game.selectors';
import { playerJoins } from '../../game.slice';
import { message, logger } from '../../../../log';

export const setupPlayerOnPlayerJoinsEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(playerJoins.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode, newPlayerId, newPlayerName, socket } = payload;

      const room = selectRoomByCode(state.game, roomCode);
      if (!room) {
        socket.emit(SocketEvent.JoinRoomError, message.error.roomNotFound(roomCode));
        return;
      }
      const newPlayer = selectPlayerInRoomById(state.game, roomCode, newPlayerId);
      if (!newPlayer) {
        socket.emit(SocketEvent.JoinRoomError, message.error.nameAlreadyTaken(newPlayerName));
        return;
      }

      socket.join(roomCode);
      playerSocketMap.set(newPlayer.id, socket);
      socket.data.clientType = SocketType.PlayerSocket;
      socket.data.roomCode = roomCode;
      socket.data.playerId = newPlayer.id;

      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      if (room.hostPlayerId === newPlayerId) {
        gameBoardSocket?.nsp.emit(SocketEvent.HostPlayerId, room.hostPlayerId);
      }
      gameBoardSocket?.emit(SocketEvent.Players, selectPlayersInRoom(state.game, roomCode));
      socket.emit(SocketEvent.JoinRoomSuccess, newPlayer.id);

      logger.info(
        message.info.playerJoined(newPlayerName, roomCode, room.hostPlayerId === newPlayerId),
      );
    }),
    ignoreElements(),
  );
