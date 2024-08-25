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
  cb: (roomCode: RoomCode) => {}
) => {
  if (rooms.has(roomCode)) {
    // ts flow analysis doesn't recognise .has() as undefined check
    const room = rooms.get(roomCode);
    room?.addPlayer(gamePadSocket.id, playerName);
    gamePadSocket.join(roomCode);
    gamePadSocket
      .to(room?.gameBoardSocket.id ?? "")
      .emit("players", room?.players);
    cb(roomCode); // send
    Log.success.playerJoined(playerName, roomCode);
  } else {
    Log.error.roomNotFound();
  }
};

export const markAsReady = (socket: Socket, roomCode: RoomCode) => {
  console.log("code", roomCode);
  const room = rooms.get(roomCode);
  const readyPlayer = room?.players.find(
    (player: Player) => player.id === socket.id
  );
  console.log("room", room);
  console.log("readyPlayer", readyPlayer);
  socket
    .to(room?.gameBoardSocket.id ?? "")
    .emit("ready", { playerId: readyPlayer?.id, isReady: true });
};

// export const getPlayersInRoom = (
//   players: Map<string, Player>,
//   roomCode: string
// ) => {
//   return Array.from(players.values()).filter(
//     (player: Player) => player.roomCode === roomCode
//   );
// };
