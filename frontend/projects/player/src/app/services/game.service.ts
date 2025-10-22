import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { join, toggleReadyStatus } from '../state/player.actions';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);

  join(roomCode: string, playerName: string) {
    this.store.dispatch(join({ roomCode, playerName }));
  }

  setReady() {
    this.store.dispatch(toggleReadyStatus());
  }
}
