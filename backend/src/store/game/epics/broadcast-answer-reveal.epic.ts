import { Epic } from "redux-observable";
import { filter, map, tap, withLatestFrom, race, timer, interval, takeWhile } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import {
  emitScores,
  evaluateAnswer,
} from "../game.slice";
import { selectRoomByCode } from "../game.selectors";
import { Player } from "../../types/game.types";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import SocketEvent from "../../../../../shared/socket-event";
import { message, logger } from "../../../log";

export const broadcastAnswerRevealEpic: Epic<
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
    // Race condition: whichever happens first - all players answered OR 10 second countdown
    tap(({ socket, room }) => {
      const allAnsweredCondition$ = action$.pipe(
        filter(evaluateAnswer.match),
        withLatestFrom(state$),
        map(([{ payload }, state]) => selectRoomByCode(state.game, payload.roomCode)),
        filter((room) => room !== null && room.players.every((player: Player) => player.hasAnswered)),
        tap(() => logger.info(message.info.allPlayersAnswered(room!.roomCode)))
      );

      // Emit countdown from 10 down to 0
      const countdownEmitter$ = interval(1000).pipe(
        map((n) => 10 - n),
        takeWhile((n) => n >= 0),
        tap((n) => socket?.nsp.to(room!.roomCode).emit(SocketEvent.AnswerRevealCountdown, n))
      );

      const timeoutCondition$ = timer(10000).pipe(
        tap(() => logger.info(message.info.answerTimedOut(room!.roomCode)))
      );

      // Start emitting countdown immediately
      countdownEmitter$.subscribe();

      race(allAnsweredCondition$, timeoutCondition$).subscribe(() => {
        socket?.nsp
          .to(room!.roomCode)
          .emit(
            SocketEvent.ShowCorrectAnswer,
            room?.currentQuestion?.correctAnswerId
          );
      });
    }),
    map(({ room }) => emitScores({ roomCode: room!.roomCode }))
  );
