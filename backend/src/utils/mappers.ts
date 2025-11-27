import { correctAnswer } from "../create-server";
import { IQuestionApiResponse, Question } from "../store/types/game.types";
import { formatString } from "./formatters";
import { generateQuestionId } from "./id-generators";

// export const mapQuestionApiResponseToQuestion = (
//   response: IQuestionApiResponse
// ): Question => {
//   const id = generateQuestionId();
//   const question: Question = {
//     // question: formatString(response.results[0].question),
//     correctAnswer: id,
//     text: response.results[0].correct_answer,
//     // incorrectAnswers: response.results[0].incorrect_answers.map((answer) => ({
//     //   id,
//     //   text: formatString(answer),
//     // })),
//   };

//   correctAnswer.id = question.correctAnswer.id;
//   return question;
// };
