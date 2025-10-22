import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { WebSocketService } from '../services/websocket.service';

@Injectable()
export class GameBoardEffects {
  getPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('getPlayers'),
      exhaustMap(() =>
        this.webSocketService.players$.pipe(
          map((players) => players),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSocketService: WebSocketService) {}
}
