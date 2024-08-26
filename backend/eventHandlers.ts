import ShortUniqueId from "short-unique-id";
import { Socket } from "socket.io";
import { Player } from "./model/player";
import { Log } from "./log";
import { Room, RoomCode } from "./model/room";
import { rooms } from "./app";

export const createRoom = (socket: Socket) => {
  const roomCode: RoomCode = new ShortUniqueId({ length: 4 })
    .rnd()
    .toUpperCase();
  rooms.set(roomCode, new Room(roomCode, socket));
  Log.success.gameBoardCreated(roomCode);
};

export const connectGamePad = (
  gamePadSocket: Socket,
  roomCode: string,
  playerName: string,
  cb: (isJoinSuccess: boolean) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.addPlayer(gamePadSocket.id, playerName);
    gamePadSocket.join(roomCode);
    gamePadSocket
      .to(room?.gameBoardSocket.id ?? "")
      .emit("players", room?.players);
    cb(true); // send
    Log.success.playerJoined(playerName, roomCode);
  } else {
    Log.error.roomNotFound();
  }
};

export const markAsReady = (socket: Socket, roomCode: RoomCode) => {
  const room = rooms.get(roomCode);
  if (room) {
    const readyPlayer = room.players.find(
      (player: Player) => player.id === socket.id
    );
    if (readyPlayer) {
      readyPlayer.isReady = true;
      socket.to(room.gameBoardSocket.id).emit("ready", readyPlayer.id, true);
    }
  }
};
