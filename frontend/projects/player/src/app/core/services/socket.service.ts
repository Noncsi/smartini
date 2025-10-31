import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, map, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { PORT } from '../../../../../../../shared/constants';
import SocketEvent from '../../../../../../../shared/socket-event';
import { startGame } from '../state/player.actions';
import {
  joinSuccess,
  joinError,
  setReadyStatusSuccess,
  setReadyStatusError,
} from '../../phases/00-lobby/state/lobby.actions';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private store = inject(Store);
  private eventSubscriptions: any[] = [];
  public socket: Socket | null | undefined;

  connect(): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.disconnect();
    this.socket = io(`ws://192.168.0.103:${PORT}`);
    this.setupEventListeners();

    return this.socket;
  }

  disconnect() {
    this.clearEventSubscriptions();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.clearEventSubscriptions();

    this.eventSubscriptions.push(
      fromEvent(this.socket, SocketEvent.JoinRoomSuccess)
        .pipe(
          map((id: string) =>
            this.store.dispatch(joinSuccess({ id }))
          )
        )
        .subscribe(),
      fromEvent(this.socket, SocketEvent.JoinRoomError)
        .pipe(map(() => this.store.dispatch(joinError())))
        .subscribe(),
      fromEvent(this.socket, SocketEvent.SetReadyStatusSuccess)
        .pipe(map(() => this.store.dispatch(setReadyStatusSuccess())))
        .subscribe(),
      fromEvent(this.socket, SocketEvent.SetReadyStatusError)
        .pipe(map(() => this.store.dispatch(setReadyStatusError())))
        .subscribe(),
      fromEvent(this.socket, 'startGame')
        .pipe(tap(() => this.store.dispatch(startGame())))
        .subscribe(),
      fromEvent(this.socket, 'answerResult')
        .pipe(tap((isCorrect) => console.log('isCorrect', isCorrect)))
        .subscribe()
    );
  }

  private clearEventSubscriptions() {
    this.eventSubscriptions.forEach((sub) => sub.unsubscribe());
    this.eventSubscriptions = [];
  }
}
