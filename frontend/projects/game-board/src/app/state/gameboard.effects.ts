import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';
import { getQuestion } from './gameboard.actions';
import SocketEvent from '../../../../../../shared/socket-event';
import { concatLatestFrom } from '@ngrx/operators';
import { selectRoomCode } from './gameboard.selector';
import { Store } from '@ngrx/store';

@Injectable()
export class GameBoardEffects {
  private store = inject(Store);
  private socketService = inject(SocketService);
  private actions$ = inject(Actions);

  getQuestion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getQuestion),
        concatLatestFrom(() => this.store.select(selectRoomCode)),
        tap(([, roomCode]) => {
          this.socketService.socket.emit(SocketEvent.GetQuestion, roomCode);
        })
      ),
    { dispatch: false }
  );
}
