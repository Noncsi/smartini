import { Server, ServerOptions } from "socket.io";
import {
  connectPlayer,
  createRoom,
  disconnect,
  getQuestion,
  joinPlayerToRoom,
  reJoinPlayerToRoom,
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
  const io = new Server(port, serverOptions);
  io.on("connection", (socket) => {
    socket.on("createRoom", () => createRoom(socket));
    socket.on("connectPlayer", (roomCodeForReconnect: RoomCode, cb: () => {}) =>
      connectPlayer(roomCodeForReconnect, cb)
    );
    socket.on(
      "joinRoom",
      (roomCode: RoomCode, playerName: string, cb: () => {}) => {
        joinPlayerToRoom(socket, roomCode, playerName, cb);
      }
    );
    socket.on(
      "reJoinRoom",
      (roomCode: RoomCode, playerId: string, cb: () => {}) => {
        reJoinPlayerToRoom(socket, roomCode, playerId, cb);
      }
    );
    socket.on("markAsReady", (roomCode: RoomCode) => {
      setPlayerReadyStatus(socket, roomCode);
    });
    socket.on("getQuestion", async (roomCode: RoomCode) => {
      getQuestion(socket, roomCode);
    });
  });

  Log.info.serverIsRunning(port);
  instrument(io, { auth: false });
};
