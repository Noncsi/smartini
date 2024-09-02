import { Server, ServerOptions } from "socket.io";
import {
  connectGamePad,
  createRoom,
  getQuestion,
  setPlayerReadyStatus,
} from "./eventHandlers";
import { Log } from "./log";
import { Room, RoomCode } from "./model/room";
import { instrument } from "@socket.io/admin-ui";

export const rooms = new Map<RoomCode, Room>();

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const ioServer = new Server(port, serverOptions);

  ioServer.on("connection", (socket) => {
    // socket.on("disconnect", () => disconnect(socket));
    socket.on("createRoom", () => createRoom(socket));
    socket.on(
      "connectGamePad",
      (roomCode: RoomCode, playerName: string, cb: () => {}) =>
        connectGamePad(socket, roomCode, playerName, cb)
    );
    socket.on("markAsReady", (roomCode: RoomCode) => {
      setPlayerReadyStatus(socket, roomCode);
    });
    socket.on("getQuestion", async (roomCode: RoomCode) => {
      getQuestion(socket, roomCode);
    });
  });

  Log.info.serverIsRunning(port);
  instrument(ioServer, { auth: false });
};
