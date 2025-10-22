import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { WebSocketService } from '../services/websocket.service';
import { toggleReadyStatus } from './player.actions';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPlayerId, selectRoomCode } from './player.selector';

@Injectable()
export class PlayerEffects {
  emitReady$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleReadyStatus),
        concatLatestFrom(() => [
          this.store.select(selectPlayerId), 
          this.store.select(selectRoomCode),
        ]),
        tap(([a, playerId, roomCode]) => {
          this.webSocketService.toggleReadyStatus(playerId, roomCode);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private webSocketService: WebSocketService,
    private store: Store
  ) {}
}
