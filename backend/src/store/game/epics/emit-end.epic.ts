import { Epic } from 'redux-observable';
import { filter, withLatestFrom, tap, ignoreElements } from 'rxjs';
import SocketEvent from '../../../../../shared/socket-event';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { selectRoomByCode } from '../game.selectors';
import { endGame } from '../game.slice';

export const emitEndEpic: Epic<GameActions, GameActions, RootState> = (action$, state$) =>
  action$.pipe(
    filter(endGame.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      const room = selectRoomByCode(state.game, payload.roomCode);
      const winnerPlayerId = room?.players.reduce((prev, current) =>
        prev.score > current.score ? prev : current,
      )!.id;
      gameBoardSocket!.nsp.to(room!.roomCode).emit(SocketEvent.End, winnerPlayerId);
    }),
    ignoreElements(),
  );
