import { Server, ServerOptions, Socket } from "socket.io";
import SocketEvent from "../../shared/socket-event";
import { log } from "./log";
import { instrument } from "@socket.io/admin-ui";
import { Room } from "./models/room";
import { RoomCode } from "./types";
import { disconnect } from "./event-handlers/disconnect";
import { createRoom } from "./event-handlers/create-room";
import { joinPlayerToRoom } from "./event-handlers/join-player-to-room";
import { toggleReadyStatus } from "./event-handlers/toggle-ready-status";
import { checkAnswer } from "./event-handlers/check-answer";
import { getQuestion } from "./event-handlers/get-question";

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
      SocketEvent.SetReadyStatusAttempt,
      (roomCode: RoomCode, playerId: string, isReady: boolean) => {
        toggleReadyStatus(socket, server, roomCode, playerId, isReady);
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
