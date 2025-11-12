export interface Answer {
  id: string;
  text: string;
}

export interface QuestionPrompt {
  question: string;
  options: Answer[];
}
