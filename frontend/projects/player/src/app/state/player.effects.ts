import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WebSocketService } from '../services/websocket.service';
import { join, toggleReadyStatus } from './player.actions';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPlayerId, selectRoomCode } from './player.selector';

@Injectable()
export class PlayerEffects {
  private webSocketService = inject(WebSocketService);
  private actions$ = inject(Actions);

  emitReady$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(join),
        tap(({ roomCode, playerName }) => {
          this.webSocketService.joinRoom(roomCode, playerName);
        })
      ),
    { dispatch: false }
  );
}
