import { Server, ServerOptions } from "socket.io";
import {
  checkAnswer,
  createRoom,
  getQuestion,
  joinPlayerToRoom,
  reJoinPlayerToRoom,
  toggleReadyStatus,
} from "./eventHandlers";
import { log } from "./log";
import { instrument } from "@socket.io/admin-ui";

export const rooms = new Map<RoomCode, Room>();

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const server = new Server(port, serverOptions);
    log.info.newSocketConnected(socket.id);
    );
    socket.on(
      "reJoinRoom",
      (roomCode: RoomCode, playerId: string, cb: () => {}) => {
        reJoinPlayerToRoom(socket, roomCode, playerId, cb);
      }
    );
    socket.on(
      SocketEvent.ToggleReadyStatus,
      (playerId: string, roomCode: RoomCode) => {
        toggleReadyStatus(socket, playerId, roomCode);
      }
    );
    socket.on("getQuestion", async (roomCode: RoomCode) => {
      getQuestion(socket, roomCode);
    });
    socket.on("answer", (playerId: string, text: string) => {
      checkAnswer(socket, playerId, text);
    });
  });

  log.info.serverIsRunning();
  instrument(server, { auth: false });
};
