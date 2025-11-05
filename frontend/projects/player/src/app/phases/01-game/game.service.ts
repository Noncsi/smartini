import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsPlayerReady, selectPlayerObject } from '../../../core/state/player/player.selector';
import { selectQuestion } from '../../../../../../game-board/src/app/state/gameboard.selector';

@Injectable({ providedIn: 'root' })
export class GameService {
  store = inject(Store);
  questionPrompt = this.store.selectSignal(selectQuestion);

}
