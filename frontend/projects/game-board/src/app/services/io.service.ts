import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import {
  askQuestion,
  getPlayers,
  getRoomCode,
  pause,
  setPlayerReadyStatus,
  startGame,
} from '../state/gameboard.actions';
import { Player, Question } from '../state/gameboard.reducer';

@Injectable({
  providedIn: 'root',
})
export class IoService {
  socket: Socket | undefined;

  constructor(private store: Store<{ players: Player[] }>) {
    this.socket = io('ws://192.168.0.103:8080');
    this.socket.on('connect', () => {
      this.socket?.emit('createRoom');
    });

    this.socket.on('roomDisconnected', () => {
      this.store.dispatch(pause());
    });
    this.socket.on('playerDisconnected', () => {
      this.store.dispatch(pause());
    });

    this.socket.on('roomCreated', (roomCode: string) => {
      this.store.dispatch(getRoomCode({ roomCode: roomCode }));
    });

    this.socket.on('players', (players: Player[]) => {
      this.store.dispatch(getPlayers({ players: players }));
    });

    this.socket.on('ready', (playerId: string, isReady: boolean) => {
      this.store.dispatch(setPlayerReadyStatus({ playerId, isReady }));
    });

    this.socket.on('startGame', () => {
      this.store.dispatch(startGame());
    });

    this.socket.on('question', (question: Question) => {
      console.log('asd', question);
      this.store.dispatch(askQuestion({ question }));
    });
  }
}
