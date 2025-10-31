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
  setReadyStatusAttempt,
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
        tap(({ roomCode, name }) => {
          this.socketService
            .connect()
            .emit(SocketEvent.JoinRoomAttempt, roomCode, name);
        })
      ),
    { dispatch: false }
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

  emitSetReadyStatusAttempt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setReadyStatusAttempt),
        concatLatestFrom(() => [
          this.store.select(selectRoomCode),
          this.store.select(selectPlayerId),
        ]),
        tap(([action, roomCode, playerId]) =>
          this.socketService.socket?.emit(
            SocketEvent.SetReadyStatusAttempt,
            roomCode,
            playerId,
            action.isReady
          )
        )
      ),
    { dispatch: false }
  );
}
