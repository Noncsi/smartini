import { Epic } from "redux-observable";
import { filter, withLatestFrom, map } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { selectPlayersInRoom } from "../game.selectors";
import { setReady, startGame } from "../game.slice";

export const startGameWhenEveryPlayerIsReadyEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$, state$) =>
  action$.pipe(
    filter(setReady.match),
    withLatestFrom(state$),
    filter(([{ payload }, state]) =>
      (selectPlayersInRoom(state.game, payload.roomCode) ?? []).every(
        (p) => p.isReady
      )
    ),
    map(([{ payload }]) => {
      const { roomCode } = payload;
      return startGame({ roomCode });
    })
  );