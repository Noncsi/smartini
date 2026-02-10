import { Epic } from 'redux-observable';
import { filter, tap, ignoreElements, map } from 'rxjs';
import SocketEvent from '../../../../../shared/socket-event';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { fetchQuestionSuccess, sendQuestionSuccess } from '../game.slice';

export const broadcastQuestionToGameBoardEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = action$ =>
  action$.pipe(
    filter(fetchQuestionSuccess.match),
    map(({ payload }) => ({
      socket: gameBoardSocketMap.get(payload.roomCode),
      roomCode: payload.roomCode,
      question: payload.question,
    })),
    filter(({ socket }) => Boolean(socket)),
    map(({ socket, roomCode, question }) => {
      socket?.nsp.to(roomCode).emit(SocketEvent.GetQuestionSuccess, question);
      return sendQuestionSuccess({ roomCode });
    }),
  );
