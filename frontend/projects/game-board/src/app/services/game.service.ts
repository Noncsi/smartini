import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountdown,
  selectPlayers,
  selectQuestion,
} from '../state/gameboard.selector';
import { getQuestion } from '../state/gameboard.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  players = this.store.selectSignal(selectPlayers);
  countdown = this.store.selectSignal(selectCountdown);
  currentQuestion = this.store.selectSignal(selectQuestion);

  getQuestion() {
    this.store.dispatch(getQuestion());
  }
}
