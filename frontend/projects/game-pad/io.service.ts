import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  last,
  lastValueFrom,
  Subject,
  takeLast,
  tap,
} from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  socket: Socket | undefined;
  roomCode$ = new BehaviorSubject<string>('');
  isGameStarted$ = new BehaviorSubject<boolean>(false);

  connectGamePad(roomCode: string, playerName: string) {
    this.socket = io('ws://192.168.0.103:8080');
    this.socket.on('connect', () => {
      this.socket?.emit('connectGamePad', roomCode, playerName, (resp: any) => {
        if (resp) {
          this.roomCode$.next(roomCode);
        }
      });

      this.socket?.on('startGame', () => {
        console.log('Game has started');
        this.isGameStarted$.next(true);
      });
    });
  }

  markAsReady() {
    // const value = lastValueFrom(this.roomCode$);
    // const value = this.roomCode$.pipe(last((roomCode: string) => roomCode));
    // console.log('value: ', value);
    this.socket?.emit('markAsReady', this.roomCode$.value);
  }
}
