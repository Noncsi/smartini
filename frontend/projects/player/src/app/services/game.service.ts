import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountdown,
  selectQuestion,
  selectRoomCode,
} from '../../core/state/game/game.selector';
import { emitAnswer } from '../state/actions/game.actions';
import { selectDidAnswerCurrentQuestion, selectPlayerId, selectChosenAnswerId } from '../../core/state/player/player.selector';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  questionPrompt = this.store.selectSignal(selectQuestion);
  roomCode = this.store.selectSignal(selectRoomCode);
  playerId = this.store.selectSignal(selectPlayerId);
  countdown = this.store.selectSignal(selectCountdown);
  didAnswer = this.store.selectSignal(selectDidAnswerCurrentQuestion);
  chosenAnswerId = this.store.selectSignal(selectChosenAnswerId);

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
