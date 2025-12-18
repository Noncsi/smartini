export interface Player {
  id: string;
  name: string;
  iconId: number;
  score: number;
  isReady: boolean;
  didAnswerCurrentQuestion: boolean;
  chosenAnswerId?: number;
}
