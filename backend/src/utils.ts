import ShortUniqueId from "short-unique-id";
import { RoomCode } from "./types";

export function generateRoomCode(): RoomCode {
  const roomCode = new ShortUniqueId({
    length: 4,
    dictionary: "alpha_upper",
  });

  return roomCode.rnd();
}

export const shuffle = (array: Array<any>): Array<any> => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};
