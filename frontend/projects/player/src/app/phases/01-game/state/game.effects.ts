import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { emitAnswer } from './game.actions';
import { tap } from 'rxjs';
import { SocketService } from '../../../core/socket.service';

@Injectable()
export class GameEffects {
  private socketService = inject(SocketService);
  private actions$ = inject(Actions);

  emitAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(emitAnswer),
        tap(({ answerId }) => {
          this.socketService.emitAnswer(answerId);
        })
      ),
    { dispatch: false }
  );
}
