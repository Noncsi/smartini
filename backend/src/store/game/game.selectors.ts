import { log } from "../../log";
import { safeFind } from "../../utils/filters";
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
): Room | undefined =>
  safeFind(
    state.rooms,
    (room) => room.roomCode === roomCode,
    () => log.error.roomNotFound(roomCode)
  );

export const selectPlayersInRoom = (
  state: GameState,
  roomCode: RoomCode
): Player[] | undefined => selectRoomByCode(state, roomCode)?.players;

export const selectPlayerInRoomById = (
  state: GameState,
  roomCode: RoomCode,
  playerId: string
): Player | undefined => {
  const room = selectRoomByCode(state, roomCode);
  return safeFind(
    room?.players ?? [],
    (player) => player.id === playerId,
    () => log.error.playerNotFound(playerId)
  );
};
