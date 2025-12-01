import { Epic } from "redux-observable";
import { filter, ignoreElements, map, tap, withLatestFrom } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import {
  addToScore,
  answeredCorrectly,
  answeredIncorrectly,
  emitAnswerResults,
  evaluateAnswer,
} from "../game.slice";
import { selectPlayerInRoomById, selectRoomByCode } from "../game.selectors";
import { Player, Room } from "../../types/game.types";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import SocketEvent from "../../../../../shared/socket-event";

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

export const answeredCorrectlyEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(answeredCorrectly.match),ignoreElements()
    // map(({ payload }) => addToScore({ player: payload.player! }))
  );

export const answeredIncorrectlyEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(filter(answeredIncorrectly.match), ignoreElements());

export const emitAnswerResultsEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$, state$) =>
  action$.pipe(
    filter(evaluateAnswer.match),
    withLatestFrom(state$),
    map(([{ payload }, state]) => ({
      room: selectRoomByCode(state.game, payload.roomCode),
      socket: gameBoardSocketMap.get(payload.roomCode),
    })),
    filter(({ room, socket }) => Boolean(room) && Boolean(socket)),
    filter(({ room }) =>
      room!.players.every((player: Player) => player.hasAnswered)
    ),
    tap(({ socket, room }) =>
      socket?.nsp
        .to(room!.roomCode)
        .emit(
          SocketEvent.ShowCorrectAnswer,
          room?.currentQuestion?.correctAnswerId
        )
    ),
    ignoreElements()
  );
