import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { WebSocketService } from '../../../services/websocket.service';
import SocketEvent from '../../../../../../../../socket-event';
import { selectPlayerId, selectRoomCode } from '../../../state/player.selector';
import { toggleReadyStatusAttempt, toggleReadyStatusSuccess, toggleReadyStatusError } from './ready.actions';

@Injectable()
export class ReadyEffects {
  private webSocketService = inject(WebSocketService);
  private store = inject(Store);
  private actions$ = inject(Actions);

  emitToggleReadyStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleReadyStatusAttempt),
        concatLatestFrom(() => [
          this.store.select(selectPlayerId),
          this.store.select(selectRoomCode),
        ]),
        tap(([, playerId, roomCode]) =>
          this.webSocketService.socket?.emit(
            SocketEvent.ToggleReadyStatus,
            playerId,
            roomCode
          )
        )
      ),
    { dispatch: false }
  );

  toggleReadyStatusSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleReadyStatusSuccess),
      tap(() => console.log('toggleReadyStatusSuccess'))
    )
  );

  toggleReadyStatusError = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleReadyStatusError),
      tap(() => console.log('toggleReadyStatusError'))
    )
  );
}
