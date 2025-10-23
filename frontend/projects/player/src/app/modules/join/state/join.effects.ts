import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { joinAttempt, joinError, joinSuccess } from './join.actions';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import SocketEvent from '../../../../../../../../socket-event';
import { WebSocketService } from '../../../services/websocket.service';
import { selectRoomCode } from '../../../state/player.selector';

@Injectable()
export class PlayerEffects {
  private webSocketService = inject(WebSocketService);
  private store = inject(Store);
  private actions$ = inject(Actions);

  joinAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinAttempt),
      tap(({ roomCode, playerName }) => {
        this.webSocketService.socket?.emit(
          SocketEvent.JoinRoom,
          roomCode,
          playerName
        );
      })
    )
  );

  joinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinSuccess),
        concatLatestFrom(() => this.store.select(selectRoomCode)),
        tap(([, roomCode]) => localStorage.setItem('roomCode', roomCode))
      ),
    { dispatch: false }
  );

  joinError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinError),
        tap(() =>
          console.log('Join failed (Room not found or name is already taken)')
        )
      ),
    { dispatch: false }
  );
}
