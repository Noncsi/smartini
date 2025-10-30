import { correctAnswer } from "../app";
import { GameBoardSocket, RoomCode, QuestionResponse } from "../types";
import { shuffle } from "../utils";

export const getQuestion = (socket: GameBoardSocket, roomCode: RoomCode) => {
  fetch("https://opentdb.com/api.php?amount=1&type=multiple").then(
    (response) => {
      response.json().then((resp) => {
        const question: QuestionResponse = {
          question: resp.results[0].question,
          correctAnswer: resp.results[0].correct_answer,
          wrongAnswers: resp.results[0].incorrect_answers,
        };

        // const shuffledIndexedAnswers = Object.assign(
        //   {},
        //   shuffle([question.correctAnswer, ...question.wrongAnswers])
        // );

        // console.log("ASD", shuffledIndexedAnswers);

        // correctAnswerId = shuffledIndexedAnswers.find(
        //   (answer: any) => answer.value === question.correctAnswer
        // );

        // correctAnswer = question.correctAnswer;

        socket.nsp.to(roomCode).emit("question", {
          question: question.question,
          answerOptions: shuffle([
            question.correctAnswer,
            ...question.wrongAnswers,
          ]),
        });
      });
    }
  );
};