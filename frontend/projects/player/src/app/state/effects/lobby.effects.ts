import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  connectToSocketSuccess,
  connectToSocketError,
  joinAttempt,
  joinSuccess,
  joinError,
  setReadyStatusAttempt,
} from '../../state/actions/lobby.actions';
import { SocketService } from '../../services/socket.service';
import { selectRoomCode } from '../selectors/game.selector';
import { selectPlayerId } from '../selectors/player.selector';

@Injectable()
export class LobbyEffects {
  private socketService = inject(SocketService);
  private store = inject(Store);
  private actions$ = inject(Actions);

  connectSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinAttempt),
      switchMap(({ joinForm }) =>
        this.socketService.connect().pipe(
          map(() =>
            connectToSocketSuccess({
              roomCode: joinForm.roomCode!,
              name: joinForm.name!,
              iconId: joinForm.iconId!,
            })
          ),
          catchError(() => {
            console.error('Failed to connect to socket.');
            return of(connectToSocketError());
          })
        )
      )
    )
  );

  emitJoinAttempt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSocketSuccess),
        tap(({ roomCode, name, iconId }) =>
          this.socketService.emitJoinAttempt(roomCode, name, iconId)
        )
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
          this.socketService.emitSetReadyStatusAttempt(
            roomCode,
            playerId,
            action.isReady
          )
        )
      ),
    { dispatch: false }
  );
}
