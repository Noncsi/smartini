import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, setReadyStatusAttempt } from './state/lobby.actions';
import { selectIsPlayerReady, selectPlayerObject } from '../../core/state/player/player.selector';

@Injectable({ providedIn: 'root' })
export class LobbyService {
  store = inject(Store);
  me = this.store.selectSignal(selectPlayerObject);
  isReady = this.store.selectSignal(selectIsPlayerReady);

  join(joinForm: Partial<JoinForm>) {
    this.store.dispatch(joinAttempt({ joinForm }));
  }

  setReady(isReady: boolean) {
    this.store.dispatch(setReadyStatusAttempt({ isReady }));
  }
}

export interface JoinForm {
  roomCode: string;
  name: string;
  iconId: number;
}
