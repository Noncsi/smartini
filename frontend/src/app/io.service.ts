import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  private _hostSocket: Socket | undefined;

  joinHost(): Socket {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('joinHost');
      this._hostSocket = socket;
    });
    return socket;
  }

  joinPlayer(roomCode: string, playerName: string) {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('joinPlayer', roomCode, playerName);
    });
  }

  markAsReady() {}
}
