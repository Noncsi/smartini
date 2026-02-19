import { Epic } from 'redux-observable';
import { filter, withLatestFrom, map } from 'rxjs';
import SocketEvent from '../../../../../shared/socket-event';
import { gameBoardSocketMap } from '../../../services/socket-registry';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { selectRoomByCode } from '../game.selectors';
import { emitCurrentQuestion, emitCurrentQuestionSuccess } from '../game.slice';
import { QuestionToSend } from '../../types/game.types';

export const emitCurrentQuestionEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(emitCurrentQuestion.match),
    withLatestFrom(state$),
    map(([{ payload }, state]) => ({
      socket: gameBoardSocketMap.get(payload.roomCode),
      roomCode: payload.roomCode,
      room: selectRoomByCode(state.game, payload.roomCode),
    })),
    filter(({ socket, room }) => Boolean(socket) && Boolean(room)),
    filter(({ room }) => Boolean(room?.currentQuestion)),
    map(({ socket, roomCode, room }) => {
      const { question, answerOptions } = room!.currentQuestion!;
      const questionToSend: QuestionToSend = {
        question,
        answerOptions,
      };
      socket!.nsp.to(roomCode).emit(SocketEvent.GetQuestionSuccess, questionToSend);
      return emitCurrentQuestionSuccess({ roomCode });
    }),
  );
