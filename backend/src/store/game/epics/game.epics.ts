import {
  tap,
  filter,
  map,
  takeWhile,
  switchMap,
} from "rxjs/operators";
import type { Epic } from "redux-observable";
import SocketEvent from "../../../../../shared/socket-event";
import { GameActions } from "../../types/game.actions";
import {
  fetchQuestion,
} from "../game.slice";
import { RootState } from "../../config/store";
import { of, timer } from "rxjs";



// export const autoNextQuestionEpic = (action$, state$, { io }) =>
//   action$.pipe(
//     ofType(updateScores.type),
//     delay(5000), // wait 5s before next question
//     withLatestFrom(state$),
//     mergeMap(([action, state]) => {
//       const { roomCode } = action.payload;
//       return from(fetchQuestion()).pipe(
//         tap((question) =>
//           io.to(roomCode).emit('newQuestion', {
//             text: question.text,
//             options: question.options,
//           })
//         ),
//         map((question) => nextQuestion({ roomCode, question }))
//       );
//     })
//   );

// export const rootEpic: Epic<any, any, any, EpicDependencies> = combineEpics(
//   createRoomEpic,
//   playerJoinEpic
// );
// export const rootEpic = combineEpics(startGameEpic, answerEpic, autoNextQuestionEpic);
