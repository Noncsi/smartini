import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, map, take, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {
  joinError,
  joinSuccess,
  startGame,
  toggleReadyStatusError,
  toggleReadyStatusSuccess,
} from '../state/player.actions';
import { selectPlayerId } from '../state/player.selector';
import SocketEvent from '../../../../../../socket-event';

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
  public socket: Socket | undefined;
  question$ = new BehaviorSubject<Question>({
    question: '',
    answerOptions: [],
  });

  constructor(private store: Store) {
    // listening
    this.socket = io('ws://192.168.0.103:8080');
    fromEvent(this.socket, 'connect').pipe(take(1)).subscribe();
    this.connect();

    fromEvent(this.socket, SocketEvent.JoinRoomSuccess)
      .pipe(map(([, newPlayerId]) => this.store.dispatch(joinSuccess(newPlayerId))))
      .subscribe();

    fromEvent(this.socket, SocketEvent.JoinRoomError)
      .pipe(map(() => this.store.dispatch(joinError())))
      .subscribe();

    fromEvent(this.socket, SocketEvent.ToggleReadyStatusSuccess)
      .pipe(map(() => this.store.dispatch(toggleReadyStatusSuccess())))
      .subscribe();

    fromEvent(this.socket, SocketEvent.ToggleReadyStatusError)
      .pipe(map(() => this.store.dispatch(toggleReadyStatusError())))
      .subscribe();

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

  reJoinRoom(roomCode: string, playerId: string) {
    // this.socket?.emit(
    //   'reJoinRoom',
    //   roomCode,
    //   playerId,
    //   (isJoinSuccess: boolean) => {
    //     if (isJoinSuccess) {
    //       this.store.dispatch(getRoomCode({ roomCode }));
    //       localStorage.setItem('roomCode', roomCode);
    //     } else {
    //       console.log('Error: Room was not found');
    //     }
    //   }
    // );
  }

  sendAnswer(text: string) {
    this.socket?.emit('answer', this.store.select(selectPlayerId), text);
  }
}
