import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  connectGameBoard(): Socket {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('connectGameBoard');
    });
    return socket;
  }

  connectGamePad(roomCode: string, playerName: string) {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('connectGamePad', roomCode, playerName);
    });
  }

  markAsReady() {}
}
