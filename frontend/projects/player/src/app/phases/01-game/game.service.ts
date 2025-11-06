import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestion } from '../../core/state/game/game.selector';
import { emitAnswer } from './state/game.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  questionPrompt = this.store.selectSignal(selectQuestion);

  sendAnswer(answer: string) {
    this.store.dispatch(emitAnswer({ answer }));
  }
}
