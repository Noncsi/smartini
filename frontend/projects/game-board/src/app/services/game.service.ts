import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountdown,
  selectCurrentCorrectAnswerId,
  selectHostPlayerId,
  selectPlayers,
  selectQuestion,
} from '../state/gameboard.selector';
import { getQuestion } from '../state/gameboard.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  players = this.store.selectSignal(selectPlayers);
  hostPlayerId = this.store.selectSignal(selectHostPlayerId);
  countdown = this.store.selectSignal(selectCountdown);
  currentQuestion = this.store.selectSignal(selectQuestion);
  currentCorrectAnswerId = this.store.selectSignal(selectCurrentCorrectAnswerId);

  getQuestion() {
    this.store.dispatch(getQuestion());
  }
}
