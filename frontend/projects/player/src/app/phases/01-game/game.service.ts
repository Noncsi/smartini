import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectQuestion,
  selectRoomCode,
} from '../../core/state/game/game.selector';
import { emitAnswer } from './state/game.actions';
import { selectPlayerId } from '../../core/state/player/player.selector';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  questionPrompt = this.store.selectSignal(selectQuestion);
  roomCode = this.store.selectSignal(selectRoomCode);
  playerId = this.store.selectSignal(selectPlayerId);

  sendAnswer(answerId: number) {
    this.store.dispatch(
      emitAnswer({
        roomCode: this.roomCode(),
        playerId: this.playerId(),
        answerId: +answerId,
      })
    );
  }
}
