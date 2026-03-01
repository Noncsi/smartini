import { Epic } from 'redux-observable';
import { filter, map, delay, withLatestFrom } from 'rxjs';
import { RootState } from '../../config/store';
import { GameActions } from '../../types/game.actions';
import { emitCurrentQuestion, emitScores, endGame } from '../game.slice';
import { selectRoomByCode } from '../game.selectors';
import { gameBoardSocketMap } from '../../../services/socket-registry';

export const nextQuestionEpic: Epic<GameActions, GameActions, RootState> = (action$, state$) =>
  action$.pipe(
    filter(emitScores.match),
    withLatestFrom(state$),
    map(([{ payload }, state]) => {
      const { roomCode } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      return { room: selectRoomByCode(state.game, payload.roomCode), gameBoardSocket };
    }),
    delay(3000),
    map(({ room }) => {
      const moreRounds = room!.currentRound <= room!.allQuestions.length;
      if (moreRounds) {
        return emitCurrentQuestion({ roomCode: room!.roomCode });
      } else {
        return endGame({ roomCode: room!.roomCode });
      }
    }),
  );
