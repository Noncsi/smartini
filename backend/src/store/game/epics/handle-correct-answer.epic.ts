import { Epic } from "redux-observable";
import { filter, ignoreElements } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { answeredCorrectly } from "../game.slice";

export const handleCorrectAnswerEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(answeredCorrectly.match),
    ignoreElements()
  );
