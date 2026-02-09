import { Epic } from "redux-observable";
import { filter, ignoreElements } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { answeredIncorrectly } from "../game.slice";

export const handleIncorrectAnswerEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(filter(answeredIncorrectly.match), ignoreElements());
