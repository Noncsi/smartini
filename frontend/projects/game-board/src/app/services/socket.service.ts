import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import { receivePlayers, createRoomSuccess } from '../state/gameboard.actions';
import { Player } from '@models/player';
import { fromEvent, take, tap } from 'rxjs';
import SocketEvent from '../../../../../../shared/socket-event';
import { PORT } from '../../../../../../shared/constants';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private store = inject(Store);
  socket: Socket = io(`ws://192.168.0.103:${PORT}`);

  constructor() {
    fromEvent(
      this.socket.on(SocketEvent.Connect, () => {
        console.log('aha');
      }),
      SocketEvent.Connect
    )
      .pipe(
        tap(() => console.log('create room attempt')),
        tap(() => this.socket?.emit(SocketEvent.CreateRoomAttempt)),
        tap(() => console.log('create room attempt 2')),
        // take(1)
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.CreateRoomSuccess)
      .pipe(
        tap((roomCode: string) =>
          this.store.dispatch(createRoomSuccess({ roomCode }))
        ),
        take(1)
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.Players)
      .pipe(
        tap((players: Player[]) =>
          this.store.dispatch(receivePlayers({ players }))
        )
      )
      .subscribe();

    // server emits readiness for a player -> client sets the player's ready state
    fromEvent(this.socket, 'ready')
      .pipe(
        tap(
          (asd) => console.log('asd', asd)
          // this.store.dispatch(setPlayerReadyStatus({ playerId, isReady }))
        )
      )
      .subscribe();

    // this.socket.on('startGame', () => {
    //   this.store.dispatch(startGame());
    // });
    // this.socket.on('question', (question: Question) => {
    //   console.log('question', question);
    //   this.store.dispatch(askQuestion({ question }));
    // });

    // this.socket.on('roomDisconnected', () => {
    //   this.store.dispatch(pause());
    // });
    // this.socket.on('playerDisconnected', () => {
    //   this.store.dispatch(pause());
    // });
  }
}
