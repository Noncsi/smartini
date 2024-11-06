import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  socket: Socket | undefined;
  roomCode$ = new BehaviorSubject<string>('');
  isGameStarted$ = new BehaviorSubject<boolean>(false);

  connectToServer() {
    this.socket = io('ws://192.168.0.103:8080');
    this.socket.on('connect', () => {});
    this.socket?.emit(
      'connectGamePad',
      localStorage.getItem('roomCode'),
      (isReconnect: boolean) => {
        if (isReconnect) {
          console.log('él a szoba');
        } else {
          console.log('Room with code stored in local storage closed.');
        }
      }
    );
    this.socket?.on('nameTaken', () => {
      console.log('name is taken');
    });
    this.socket?.on('roomDisconnected', () => {});
    this.socket?.on('playerDisconnected', () => {});

    this.socket?.on('startGame', () => {
      console.log('Game has started');
      this.isGameStarted$.next(true);
    });
  }

  joinRoom(roomCode: string, playerName: string) {
    this.socket?.emit(
      'joinRoom',
      roomCode,
      playerName,
      (isJoinSuccess: boolean) => {
        if (isJoinSuccess) {
          this.roomCode$.next(roomCode);
          localStorage.setItem('roomCode', roomCode);
        } else {
          console.log('Error: Room was not found');
        }
      }
    );
  }

  reJoinRoom(roomCode: string, playerId: string) {
    this.socket?.emit(
      'reJoinRoom',
      roomCode,
      playerId,
      (isJoinSuccess: boolean) => {
        if (isJoinSuccess) {
          this.roomCode$.next(roomCode);
          localStorage.setItem('roomCode', roomCode);
        } else {
          console.log('Error: Room was not found');
        }
      }
    );
  }

  markAsReady() {
    // const value = lastValueFrom(this.roomCode$);
    // const value = this.roomCode$.pipe(last((roomCode: string) => roomCode));
    // console.log('value: ', value);
    this.socket?.emit('markAsReady', this.roomCode$.value);
  }
}
