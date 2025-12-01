export interface Answer {
  id: number;
  text: string;
}

export interface QuestionPrompt {
  question: string;
  answerOptions: Answer[];
}
