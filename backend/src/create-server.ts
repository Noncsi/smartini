import { Server, ServerOptions, Socket } from "socket.io";
import SocketEvent from "../../shared/socket-event";
import { log } from "./log";
import { instrument } from "@socket.io/admin-ui";
import { Answer, Room, RoomCode } from "./store/types/game.types";
import { SocketEventController } from "./services/socket-event-controller";

export const rooms = new Map<RoomCode, Room>();
export let correctAnswer: Answer = { id: "", text: "" };

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const server = new Server(port, serverOptions);
  server.on(SocketEvent.Connection, (socket: Socket) => {
    log.info.newSocketConnected(socket.id);
    socket.on(SocketEvent.Disconnect, () =>
      SocketEventController.disconnect(socket)
    );
    socket.on(SocketEvent.CreateRoomAttempt, () =>
      SocketEventController.createRoom(socket)
    );
    socket.on(
      SocketEvent.JoinRoomAttempt,
      (roomCode: RoomCode, playerName: string) =>
        SocketEventController.playerJoins(socket, roomCode, playerName)
    );
    socket.on(
      SocketEvent.SetReadyStatusAttempt,
      (roomCode: RoomCode, playerId: string, isReady: boolean) => {
        SocketEventController.setReady(roomCode, playerId, isReady);
      }
    );
    socket.on(SocketEvent.GetQuestion, async (roomCode: RoomCode) => {
      // getQuestion(socket, roomCode);
    });
    socket.on(SocketEvent.Answer, (answer: string) => {
      // checkAnswer(socket, answer);
    });
  });

  log.info.serverIsRunning();
  instrument(server, { auth: false });

  return server;
};
