import ShortUniqueId from "short-unique-id";
import { RoomCode } from "../store/types/game.types";

const roomCodeGenerator = new ShortUniqueId({
  length: 4,
  dictionary: "alpha_upper",
});

const playerIdGenerator = new ShortUniqueId({ length: 10 });

const questionIdGenerator = new ShortUniqueId({ length: 2 });

export const generateRoomCode = (): RoomCode => {
  return roomCodeGenerator.rnd();
};

export const generatePlayerId = (): string => {
  return playerIdGenerator.rnd();
};

export const generateQuestionId = (): string => {
  return questionIdGenerator.rnd();
};
