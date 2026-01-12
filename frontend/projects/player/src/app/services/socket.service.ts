import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { PORT } from '../../../../../../shared/constants';
import SocketEvent from '../../../../../../shared/socket-event';
import {
  catchError,
  EMPTY,
  fromEvent,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { getQuestionSuccess, countdown } from '../state/actions/game.actions';
import {
  joinSuccess,
  joinError,
  setReadyStatusSuccess,
  setReadyStatusError,
  getHostPlayerId,
  arePlayersReady,
} from '../state/actions/lobby.actions';
import { selectRoomCode } from '../state/selectors/game.selector';

@Injectable({ providedIn: 'root' })
export class SocketService {
  public eventSubscriptions: Subscription[] = [];
  public socket: Socket = {} as Socket;
  private store = inject(Store);

  connect(): Observable<Socket> {
    if (this.socket?.connected) {
      return of(this.socket);
    }
    this.socket = io(`ws://192.168.0.103:${PORT}`);

    return fromEvent(this.socket, SocketEvent.Connect).pipe(
      map(() => {
        this.listenToSocketEvents();
        return this.socket;
      }),
      catchError(() => EMPTY)
    );
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  // LISTENERS

  listenToSocketEvents(): void {
    this.socket.on(SocketEvent.JoinRoomSuccess, (id: string) => {
      this.store.dispatch(joinSuccess({ id }));
    });

    this.socket.on(SocketEvent.JoinRoomError, () => {
      this.store.dispatch(joinError());
    });

    this.socket.on(SocketEvent.HostPlayerId, (id: string) => {
      this.store.dispatch(getHostPlayerId({ id }));
    });

    this.socket.on(SocketEvent.SetReadyStatusSuccess, () => {
      this.store.dispatch(setReadyStatusSuccess());
    });

    this.socket.on(SocketEvent.SetReadyStatusError, () => {
      this.store.dispatch(setReadyStatusError());
    });

    this.socket.on(SocketEvent.ArePlayersReady, (areReady: boolean) => {
      this.store.dispatch(arePlayersReady({ areReady }));
    });

    this.socket.on(SocketEvent.GetQuestionSuccess, (payload) => {
      this.store.dispatch(getQuestionSuccess({ payload }));
    });

    this.socket.on(SocketEvent.ShowCorrectAnswer, (isCorrect: boolean) => {
      console.log('Answer result:', isCorrect);
    });

    this.socket.on(SocketEvent.Countdown, (number: number) => {
      this.store.dispatch(countdown({ number }));
    });
  }

  // EMITTERS

  emitJoinAttempt(roomCode: string, name: string, iconId: number) {
    this.socket.emit(SocketEvent.JoinRoomAttempt, roomCode, name, iconId);
  }

  emitSetReadyStatusAttempt(
    roomCode: string,
    playerId: string,
    isReady: boolean
  ) {
    this.socket.emit(
      SocketEvent.SetReadyStatusAttempt,
      roomCode,
      playerId,
      isReady
    );
  }

  emitStartGame() {
    this.socket.emit(
      SocketEvent.StartGame,
      this.store.selectSignal(selectRoomCode)
    );
  }

  emitAnswer(roomCode: string, playerId: string, answerId: number) {
    this.socket.emit(SocketEvent.Answer, roomCode, playerId, answerId);
  }
}
