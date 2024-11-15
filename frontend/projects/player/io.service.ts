import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface Question {
  question: string;
  answerOptions: string[];
}

export interface Answer {
  // id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class IoService {
  socket: Socket | undefined;
  roomCode$ = new BehaviorSubject<string>('');
  playerId$ = new BehaviorSubject<string>('');
  isGameStarted$ = new BehaviorSubject<boolean>(false);
  question$ = new BehaviorSubject<Question>({
    question: '',
    answerOptions: [],
  });

  connectToServer() {
    this.socket = io('ws://192.168.0.103:8080');
    this.socket.on('connect', () => {});
    this.socket?.emit(
      'connectPlayer',
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

    this.socket?.on('question', (question: Question) => {
      this.question$.next(question);
    });
    this.socket?.on('answerResult', (isCorrect) => {
      console.log('isCorrect', isCorrect);
    });
  }

  joinRoom(roomCode: string, playerName: string) {
    this.socket?.emit(
      'joinRoom',
      roomCode,
      playerName,
      (newPlayerId: string | null) => {
        if (!newPlayerId) {
          console.log('Error: Room was not found OR name was already taken.');
          return;
        }

        this.roomCode$.next(roomCode);
        this.playerId$.next(newPlayerId);
        localStorage.setItem('roomCode', roomCode);
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

  setReady() {
    this.socket?.emit('setReady', this.playerId$.value, this.roomCode$.value);
  }

  sendAnswer(text: string) {
    this.socket?.emit('answer', this.playerId$.value, text);
  }
}
