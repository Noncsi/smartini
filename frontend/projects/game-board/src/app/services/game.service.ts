import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestion } from '../state/gameboard.selector';
import { getQuestion } from '../state/gameboard.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  currentQuestion = this.store.selectSignal(selectQuestion);

  getQuestion() {
    this.store.dispatch(getQuestion());
  }
}
