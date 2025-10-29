import { Server, ServerOptions, Socket } from "socket.io";
import {
  checkAnswer,
  createRoom,
  disconnect,
  getQuestion,
  joinPlayerToRoom,
  toggleReadyStatus,
} from "./eventHandlers";
import SocketEvent from "../../shared/socket-event";
import { log } from "./log";
import { instrument } from "@socket.io/admin-ui";
import { Room } from "./models/room";
import { RoomCode } from "./types";

export const rooms = new Map<RoomCode, Room>();

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const server = new Server(port, serverOptions);
  server.on(SocketEvent.Connection, (socket: Socket) => {
    log.info.newSocketConnected(socket.id);
    socket.on(SocketEvent.Disconnect, (reason) => disconnect(socket, reason));
    socket.on(SocketEvent.CreateRoomAttempt, () => createRoom(socket));
    socket.on(SocketEvent.JoinRoomAttempt, (roomCode: RoomCode, playerName: string) =>
      joinPlayerToRoom(server, socket, roomCode, playerName)
    );
    socket.on(
      SocketEvent.ToggleReadyStatusAttempt,
      (playerId: string, roomCode: RoomCode) => {
        toggleReadyStatus(socket, server, playerId, roomCode);
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
