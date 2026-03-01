import { Epic } from 'redux-observable';
import { filter, withLatestFrom, tap, ignoreElements } from 'rxjs';
import SocketEvent from '../../../../../shared/socket-event';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { selectRoomByCode } from '../game.selectors';
import { emitScores } from '../game.slice';

export const emitScoresEpic: Epic<GameActions, GameActions, RootState> = (action$, state$) =>
  action$.pipe(
    filter(emitScores.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      const room = selectRoomByCode(state.game, payload.roomCode);
      gameBoardSocket!.nsp.to(roomCode).emit(SocketEvent.Players, room!.players);
    }),
    ignoreElements(),
  );
