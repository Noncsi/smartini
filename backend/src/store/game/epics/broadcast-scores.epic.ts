import { Epic } from "redux-observable";
import { filter, map, tap, withLatestFrom, delay, ignoreElements } from "rxjs";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { emitScores } from "../game.slice";
import { selectRoomByCode } from "../game.selectors";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import SocketEvent from "../../../../../shared/socket-event";

export const broadcastScoresEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(emitScores.match),
    withLatestFrom(state$),
    delay(2000),
    map(([{ payload }, state]) => ({
      room: selectRoomByCode(state.game, payload.roomCode),
      socket: gameBoardSocketMap.get(payload.roomCode),
    })),
    tap(({ socket, room }) =>
      socket?.nsp.to(room!.roomCode).emit(SocketEvent.Players, room?.players)
    ),
    ignoreElements()
  );
