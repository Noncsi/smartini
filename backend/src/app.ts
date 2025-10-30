import { Server, ServerOptions, Socket } from "socket.io";
import SocketEvent from "../../shared/socket-event";
import { log } from "./log";
import { instrument } from "@socket.io/admin-ui";
import { Room } from "./models/room";
import { RoomCode } from "./types";
import { disconnect } from "./eventHandlers/disconnect";
import { createRoom } from "./eventHandlers/createRoom";
import { joinPlayerToRoom } from "./eventHandlers/joinPlayerToRoom";
import { toggleReadyStatus } from "./eventHandlers/toggleReadyStatus";
import { checkAnswer } from "./eventHandlers/checkAnswer";
import { getQuestion } from "./eventHandlers/getQuestion";

export const rooms = new Map<RoomCode, Room>();
export let correctAnswer: string;

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const server = new Server(port, serverOptions);
  server.on(SocketEvent.Connection, (socket: Socket) => {
    log.info.newSocketConnected(socket.id);
    socket.on(SocketEvent.Disconnect, () => disconnect(socket));
    socket.on(SocketEvent.CreateRoomAttempt, () => createRoom(socket));
    socket.on(
      SocketEvent.JoinRoomAttempt,
      (roomCode: RoomCode, playerName: string) =>
        joinPlayerToRoom(server, socket, roomCode, playerName)
    );
    socket.on(
      SocketEvent.ToggleReadyStatusAttempt,
      (roomCode: RoomCode, playerId: string) => {
        toggleReadyStatus(socket, server, roomCode, playerId);
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
