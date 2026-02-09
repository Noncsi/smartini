import { Epic } from "redux-observable";
import { filter, map } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { addToScore, answeredCorrectly } from "../game.slice";

export const addToScoreOnAnsweredCorrectly: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(answeredCorrectly.match),
    map(({ payload }) =>
      addToScore({ roomCode: payload.roomCode, playerId: payload.playerId })
    )
  );
