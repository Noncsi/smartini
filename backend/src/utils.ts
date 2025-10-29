import ShortUniqueId from "short-unique-id";
import { RoomCode } from "./types";

export function generateRoomCode(): RoomCode {
  const roomCode = new ShortUniqueId({
    length: 4,
    dictionary: 'alpha_upper',
  });

  return roomCode.rnd();
}
 