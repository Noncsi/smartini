import { IQuestionApiResponse, Question } from '../store/types/game.types';
import { formatString } from './formatters';
import { generateQuestionId } from './id-generators';
import { shuffle } from './utils';

export const mapQuestionApiResponseToQuestions = (response: IQuestionApiResponse): Question[] => {
  if (response.response_code !== 0) throw new Error('No data in API response');

  return response.results.map(result => {
    const id = generateQuestionId();
    const correctAnswerId = generateQuestionId();
    const question = formatString(result.question);

    const correctOption = {
      id: correctAnswerId,
      text: formatString(result.correct_answer),
    };

    const incorrectOptions = result.incorrect_answers.map(answer => ({
      id: generateQuestionId(),
      text: formatString(answer),
    }));

    const answerOptions = shuffle([correctOption, ...incorrectOptions]);

    return {
      id,
      question,
      correctAnswerId,
      answerOptions,
    };
  });
};
