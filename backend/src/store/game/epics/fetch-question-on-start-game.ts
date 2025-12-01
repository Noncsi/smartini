import { Epic } from "redux-observable";
import { filter, map, tap } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { fetchQuestion, startGame } from "../game.slice";

export const fetchQuestionOnStartGameEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(startGame.match),
    map(({ payload }) => ({
      socket: gameBoardSocketMap.get(payload.roomCode),
      roomCode: payload.roomCode,
    })),
    filter(({ socket }) => Boolean(socket)),
    tap(({ socket, roomCode }) =>
      socket?.nsp.to(roomCode).emit(SocketEvent.StartGame)
    ),
    map(({ roomCode }) => fetchQuestion({ roomCode }))
  );
