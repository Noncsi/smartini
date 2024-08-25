import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  gamePadSocket: Socket | undefined;
  roomCode: string = '';

  createRoom(): Socket {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('createRoom');
    });
    return socket;
  }

  connectGamePad(roomCode: string, playerName: string) {
    this.gamePadSocket = io('ws://192.168.0.103:8080');
    this.gamePadSocket.on('connect', () => {
      this.gamePadSocket?.emit(
        'connectGamePad',
        roomCode,
        playerName,
        (resp: any) => {
          this.roomCode = roomCode;
        }
      );
    });
  }

  markAsReady() {
    console.log('roomcode:', this.roomCode);
    this.gamePadSocket?.emit('markAsReady', this.roomCode);
  }
}
