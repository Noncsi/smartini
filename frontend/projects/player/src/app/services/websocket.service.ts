import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, take, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { getId, getRoomCode, startGame } from '../state/player.actions';
import { selectPlayerId, selectRoomCode } from '../state/player.selector';

export interface Question {
  question: string;
  answerOptions: string[];
}

export interface Answer {
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: Socket | undefined;
  question$ = new BehaviorSubject<Question>({
    question: '',
    answerOptions: [],
  });

  constructor(private store: Store) {
    // listening
    this.socket = io('ws://192.168.0.103:8080');
    fromEvent(this.socket, 'connect').pipe(take(1)).subscribe();
    this.connect();

    // this.socket?.on('nameTaken', () => {
    //   console.log('name is taken');
    // });
    //this.socket?.on('roomDisconnected', () => {});
    //this.socket?.on('playerDisconnected', () => {});

    fromEvent(this.socket, 'startGame')
      .pipe(
        tap(() => this.store.dispatch(startGame())),
        take(1)
      )
      .subscribe();

    fromEvent(this.socket, 'question')
      .pipe(
        tap((question: Question) => this.question$.next(question)),
        take(1)
      )
      .subscribe();

    fromEvent(this.socket, 'answerResult')
      .pipe(
        tap((isCorrect) => console.log('isCorrect', isCorrect)),
        take(1)
      )
      .subscribe();
  }

  // emitting
  connect() {
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

        this.store.dispatch(getRoomCode({ roomCode }));
        this.store.dispatch(getId({ id: newPlayerId }));
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
          this.store.dispatch(getRoomCode({ roomCode }));
          localStorage.setItem('roomCode', roomCode);
        } else {
          console.log('Error: Room was not found');
        }
      }
    );
  }

  toggleReadyStatus(playerId: string, roomCode: string) {
    this.socket?.emit('toggleReadyStatus', playerId, roomCode);
  }

  sendAnswer(text: string) {
    this.socket?.emit('answer', this.store.select(selectPlayerId), text);
  }
}
