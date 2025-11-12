import ShortUniqueId from "short-unique-id";
import { IQuestionApiResponse, Question, RoomCode } from "./types";
import { correctAnswer } from "./app";

export const generateRoomCode = (): RoomCode => {
  const roomCode = new ShortUniqueId({
    length: 4,
    dictionary: "alpha_upper",
  });

  return roomCode.rnd();
};

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

export const mapQuestionApiResponseToQuestion = (
  response: IQuestionApiResponse
): Question => {
  const uid = new ShortUniqueId({ length: 2 });
  const question: Question = {
    question: formatString(response.results[0].question),
    correctAnswer: { id: uid.rnd(), text: response.results[0].correct_answer },
    incorrectAnswers: response.results[0].incorrect_answers.map((answer) => ({
      id: uid.rnd(),
      text: formatString(answer),
    })),
  };

  correctAnswer.id = question.correctAnswer.id;
  return question;
};

export const formatString = (string: string): string =>
  string.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
