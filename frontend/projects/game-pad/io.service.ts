import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  socket: Socket | undefined;
  roomCode: string = '';

  constructor() {}

  connectGamePad(roomCode: string, playerName: string) {
    this.socket = io('ws://192.168.0.103:8080');
    this.socket.on('connect', () => {
      this.socket?.emit('connectGamePad', roomCode, playerName, (resp: any) => {
        this.roomCode = roomCode;
      });
    });
  }

  markAsReady() {
    console.log('roomcode:', this.roomCode);
    this.socket?.emit('markAsReady', this.roomCode);
  }
}
