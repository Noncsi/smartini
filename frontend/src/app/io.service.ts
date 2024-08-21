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

  joinPlayer(playerName: string) {
    const socket: Socket = io('ws://192.168.0.103:8080');
    socket.on('connect', () => {
      socket.emit('joinPlayer', socket.id, playerName);
    });
  }

  // sendMessageToServer(socketId: string, message: string) {
  //   const fromSocket = this.playerSockets.find(
  //     (socket: Socket) => socket.id === socketId
  //   );
  //   fromSocket?.emit('message', message);
  //   console.log('message sent');
  // }

  // getMessageFromServer() {
  //   let observable = new Observable<{ message: string }>((observer) => {
  //     this.socket.on('new-message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }
}
