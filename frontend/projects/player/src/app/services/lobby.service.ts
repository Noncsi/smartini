import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { joinAttempt, setReadyStatusAttempt } from '../state/actions/lobby.actions';
import { selectHostPlayerId } from '../../../../game-board/src/app/state/gameboard.selector';
import { selectPlayerObject, selectIsPlayerReady } from '../state/selectors/player.selector';

@Injectable({ providedIn: 'root' })
export class LobbyService {
  store = inject(Store);
  me = this.store.selectSignal(selectPlayerObject);
  isReady = this.store.selectSignal(selectIsPlayerReady);
  hostPlayerId = this.store.selectSignal(selectHostPlayerId);

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
