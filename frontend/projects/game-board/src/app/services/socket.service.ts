import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import {
  receivePlayers,
  createRoomSuccess,
  setPlayerReadyStatus,
} from '../state/gameboard.actions';
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
      this.socket.on(SocketEvent.Connect, () => {}),
      SocketEvent.Connect
    )
      .pipe(
        tap(() => this.socket?.emit(SocketEvent.CreateRoomAttempt))
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

    fromEvent(this.socket, SocketEvent.PlayerSetReady)
      .pipe(
        tap((result) => {
          this.store.dispatch(
            setPlayerReadyStatus({
              playerId: result.playerId,
              isReady: result.isReady,
            })
          );
        })
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
