import { IQuestionApiResponse, Question } from "../store/types/game.types";
import { formatString } from "./formatters";
import { generateQuestionId } from "./id-generators";
import { shuffle } from "./utils";

export const mapQuestionApiResponseToQuestion = (
  response: IQuestionApiResponse,
): Question => {
  const correctAnswerId = generateQuestionId();

  if (response.response_code !== 0)
    throw new Error("No data in API response");

  const questionData = response.results?.[0];
  const question: Question = {
    id: generateQuestionId(),
    question: formatString(questionData.question),
    correctAnswerId: correctAnswerId,
    answerOptions: shuffle([
      { id: correctAnswerId, text: formatString(questionData.correct_answer) },
      ...questionData.incorrect_answers.map((answer) => ({
        id: generateQuestionId(),
        text: formatString(answer),
      })),
    ]),
  };

  return question;
};
