import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import {
  receivePlayers,
  receiveRoomCode,
} from '../state/gameboard.actions';
import { Player } from '@models/player';
import { fromEvent, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  socket: Socket | undefined;

  constructor(private store: Store) {
    // handshake
    this.socket = io('ws://192.168.0.103:8080');
    // connect -> client emits to create room
    fromEvent(this.socket, 'connect')
      .pipe(
        tap(() => this.socket?.emit('createRoom')),
        take(1)
      )
      .subscribe();

    // server emits proof of successful room creation -> client receives room code
    fromEvent(this.socket, 'roomCreated')
      .pipe(
        tap((roomCode: string) =>
          this.store.dispatch(receiveRoomCode({ roomCode }))
        ),
        take(1)
      )
      .subscribe();

    // server emits players -> client receives players
    fromEvent(this.socket, 'players')
      .pipe(
        tap((players: Player[]) =>
          this.store.dispatch(receivePlayers({ players }))
        ),
        take(1)
      )
      .subscribe();

    // server emits readiness for a player -> client sets the player's ready state
    fromEvent(this.socket, 'ready')
      .pipe(
        tap(
          (asd) => console.log('asd', asd)
          // this.store.dispatch(setPlayerReadyStatus({ playerId, isReady }))
        ),
        take(1)
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
