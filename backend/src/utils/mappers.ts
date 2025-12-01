import { IQuestionApiResponse, Question } from "../store/types/game.types";
import { formatString } from "./formatters";
import { generateQuestionId } from "./id-generators";

export const mapQuestionApiResponseToQuestion = (
  response: IQuestionApiResponse
): Question => {
  const correctAnswerId = generateQuestionId();
  const question: Question = {
    id: generateQuestionId(),
    question: formatString(response.results?.[0].question),
    correctAnswerId: correctAnswerId,
    answerOptions: [
      { id: correctAnswerId, text: response.results?.[0].correct_answer },
      ...response.results?.[0].incorrect_answers.map((answer) => ({
        id: generateQuestionId(),
        text: answer,
      })),
    ],
  };

  return question;
};
