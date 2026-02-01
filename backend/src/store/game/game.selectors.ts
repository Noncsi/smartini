import { message, logger } from "../../log";
import { Player, Room, RoomCode } from "../types/game.types";
import { GameState } from "./game.slice";

export const selectRooms = (state: GameState): Room[] => state.rooms;

export const selectIsRoomExist = (
  state: GameState,
  roomCode: RoomCode
): boolean => {
  return state.rooms.some((room) => room.roomCode === roomCode);
};

export const selectRoomByCode = (
  state: GameState,
  roomCode: RoomCode
): Room | null => {
  const room = state.rooms.find((room) => room.roomCode === roomCode);
  if (!room) {
    logger.error(message.error.roomNotFound(roomCode));
    return null;
  }
  return room;
};

export const selectPlayersInRoom = (
  state: GameState,
  roomCode: RoomCode
): Player[] | null => {
  const room = selectRoomByCode(state, roomCode);
  return !room ? null : room.players;
};

export const selectPlayerInRoomById = (
  state: GameState,
  roomCode: RoomCode,
  playerId: string
): Player | null => {
  const room = selectRoomByCode(state, roomCode);
  if (!room) return null;
  const player = room.players.find((player) => player.id === playerId);
  if (!player) {
    logger.error(message.error.playerNotFound(playerId));
    return null;
  }
  return player;
};
