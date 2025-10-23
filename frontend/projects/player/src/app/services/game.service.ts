import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, toggleReadyStatusAttempt } from '../state/player.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);

  setReady() {
    this.store.dispatch(toggleReadyStatusAttempt());
  }
}
