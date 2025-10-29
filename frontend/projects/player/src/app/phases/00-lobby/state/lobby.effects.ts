import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import SocketEvent from '../../../../../../../../shared/socket-event';
import { SocketService } from '../../../core/services/socket.service';
import {
  selectRoomCode,
  selectPlayerId,
} from '../../../core/state/player.selector';
import {
  joinAttempt,
  joinSuccess,
  joinError,
  toggleReadyStatusAttempt,
  toggleReadyStatusSuccess,
  toggleReadyStatusError,
} from './lobby.actions';

@Injectable()
export class LobbyEffects {
  private socketService = inject(SocketService);
  private store = inject(Store);
  private actions$ = inject(Actions);

  emitJoinAttempt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinAttempt),
        tap(({ roomCode, playerName }) => {
          this.socketService
            .connect()
            .emit(SocketEvent.JoinRoomAttempt, roomCode, playerName);
        })
      ),
    { dispatch: false }
  );

  joinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinSuccess),
        concatLatestFrom(() => this.store.select(selectRoomCode)),
        tap(([, roomCode]) => localStorage.setItem('roomCode', roomCode)),
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

  emitToggleReadyStatusAttempt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleReadyStatusAttempt),
        concatLatestFrom(() => [
          this.store.select(selectRoomCode),
          this.store.select(selectPlayerId),
        ]),
        tap(([, roomCode, playerId])=> console.log(roomCode, playerId)),
        tap(([, roomCode, playerId]) =>
          this.socketService.socket?.emit(
            SocketEvent.ToggleReadyStatusAttempt,
            roomCode,
            playerId
          )
        )
      ),
    { dispatch: false }
  );

  toggleReadyStatusSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleReadyStatusSuccess),
        tap(() => console.log('toggleReadyStatusSuccess'))
      ),
    { dispatch: false }
  );

  toggleReadyStatusError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleReadyStatusError),
        tap(() => console.log('toggleReadyStatusError'))
      ),
    { dispatch: false }
  );
}
