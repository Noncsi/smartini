import { Server, ServerOptions } from "socket.io";
import { connectGamePad, createRoom, markAsReady } from "./eventHandlers";
import { Log } from "./log";
import { Room, RoomCode } from "./model/room";

export const rooms = new Map<RoomCode, Room>();

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const ioServer = new Server(port, serverOptions);

  ioServer.on("connection", (socket) => {
    socket.on("createRoom", () => createRoom(socket));
    socket.on(
      "connectGamePad",
      (roomCode: RoomCode, playerName: string, cb: () => {}) =>
        connectGamePad(socket, roomCode, playerName, cb)
    );
    socket.on("markAsReady", (roomCode: RoomCode) => {
      return markAsReady(socket, roomCode);
    });
  });

  Log.info.serverIsRunning();
};
