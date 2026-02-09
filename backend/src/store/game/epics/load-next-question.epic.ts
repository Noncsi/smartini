import { Epic } from "redux-observable";
import { filter, map, delay } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { emitScores, fetchQuestion } from "../game.slice";

export const loadNextQuestionEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
) =>
  action$.pipe(
    filter(emitScores.match),
    delay(4000),
    map(({ payload }) => fetchQuestion({ roomCode: payload.roomCode }))
  );
