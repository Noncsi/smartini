import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountdown,
  selectAnswerRevealCountdown,
  selectCurrentCorrectAnswerId,
  selectHostPlayerId,
  selectPlayers,
  selectQuestion,
  selectWinnerPlayer,
} from '../state/gameboard.selector';
import { getQuestion } from '../state/gameboard.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  players = this.store.selectSignal(selectPlayers);
  hostPlayerId = this.store.selectSignal(selectHostPlayerId);
  countdown = this.store.selectSignal(selectCountdown);
  answerRevealCountdown = this.store.selectSignal(selectAnswerRevealCountdown);
  currentQuestion = this.store.selectSignal(selectQuestion);
  currentCorrectAnswerId = this.store.selectSignal(selectCurrentCorrectAnswerId);
  winnerPlayer = this.store.selectSignal(selectWinnerPlayer);

  getQuestion() {
    this.store.dispatch(getQuestion());
  }
}
