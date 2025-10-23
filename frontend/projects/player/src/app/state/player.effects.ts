import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import SocketEvent from '../../../../../../socket-event';
import { WebSocketService } from '../services/websocket.service';
import {
  joinAttempt,
  joinError,
  joinSuccess,
  toggleReadyStatusAttempt,
  toggleReadyStatusError,
  toggleReadyStatusSuccess,
} from './player.actions';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPlayerId, selectRoomCode } from './player.selector';

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
          playerName,
          (newPlayerId: string | '') => {
            if (!newPlayerId) return this.store.dispatch(joinError());
            return this.store.dispatch(joinSuccess({ id: newPlayerId }));
          }
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
