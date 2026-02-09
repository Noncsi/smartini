import { Epic } from "redux-observable";
import { filter, map, withLatestFrom } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import {
  answeredCorrectly,
  answeredIncorrectly,
  evaluateAnswer,
} from "../game.slice";
import { selectPlayerInRoomById, selectRoomByCode } from "../game.selectors";

export const evaluateAnswerEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(evaluateAnswer.match),
    withLatestFrom(state$),
    map(([{ payload }, state]) => ({
      room: selectRoomByCode(state.game, payload.roomCode),
      player: selectPlayerInRoomById(
        state.game,
        payload.roomCode,
        payload.playerId
      ),
      answerId: payload.answerId,
    })),
    filter(({ room, player }) => Boolean(room) && Boolean(player)),
    map(({ room, player, answerId }) =>
      room?.currentQuestion?.correctAnswerId === answerId
        ? answeredCorrectly({ roomCode: room.roomCode, playerId: player!.id })
        : answeredIncorrectly({ player: player! })
    )
  );
