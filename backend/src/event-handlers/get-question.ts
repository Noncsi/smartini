import { finalize, from, map, switchMap, takeWhile, tap, timer } from "rxjs";
import SocketEvent from "../../../shared/socket-event";
import {
  GameBoardSocket,
  RoomCode,
  IQuestionApiResponse,
  mapQuestionApiResponseToQuestion,
} from "../types";
import { formatArrayOfStrings, formatString, shuffle } from "../utils";

export const getQuestion = (socket: GameBoardSocket, roomCode: RoomCode) =>
  from(fetch("https://opentdb.com/api.php?amount=1&type=multiple")).pipe(
    switchMap((response) => response.json()),
    map((response: IQuestionApiResponse) =>
      mapQuestionApiResponseToQuestion(response)
    ),
    switchMap((q) =>
      timer(0, 1000).pipe(
        map((n) => 5 - n),
        takeWhile((n) => n >= 0),
        tap((n) => socket.nsp.to(roomCode).emit(SocketEvent.Countdown, n)),
        finalize(() =>
          socket.nsp.to(roomCode).emit(SocketEvent.GetQuestionSuccess, {
            question: formatString(q.question),
            options: formatArrayOfStrings(
              shuffle([q.correctAnswer, ...q.wrongAnswers])
            ),
          })
        )
      )
    )
  );
