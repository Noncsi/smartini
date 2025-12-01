import { Epic } from "redux-observable";
import { filter, tap, ignoreElements } from "rxjs";
import SocketEvent from "../../../../../shared/socket-event";
import { gameBoardSocketMap } from "../../../services/socket-registry";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { SocketType } from "../../types/game.types";
import { createRoom } from "../game.slice";
import { log } from "../../../log";

export const setupRoomOnCreateRoomEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(createRoom.match),
    tap(({ payload }) => {
      const { socket, newRoomCode } = payload;
      gameBoardSocketMap.set(newRoomCode, socket);
      socket.join(newRoomCode);
      socket.data.clientType = SocketType.GameboardSocket;
      socket.data.roomCode = newRoomCode;
      socket.emit(SocketEvent.CreateRoomSuccess, newRoomCode);
      log.info.roomCreated(newRoomCode);
    }),
    ignoreElements()
  );
