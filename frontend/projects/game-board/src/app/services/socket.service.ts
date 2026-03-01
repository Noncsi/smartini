import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Store } from '@ngrx/store';
import {
  receivePlayers,
  createRoomSuccess,
  setPlayerReadyStatus,
  askQuestion,
  countdown,
  answerRevealCountdown,
  showCorrectAnswer,
  receiveHostPlayerId,
  startGameSuccess,
  end,
} from '../state/gameboard.actions';
import { Player } from '@models/player';
import { fromEvent, take, tap } from 'rxjs';
import SocketEvent from '../../../../../../shared/socket-event';
import { PORT } from '../../../../../../shared/constants';
import { QuestionPrompt } from '@models/question';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private store = inject(Store);
  socket: Socket = io(`ws://192.168.0.103:${PORT}`);

  constructor() {
    fromEvent(
      this.socket.on(SocketEvent.Connect, () => {}),
      SocketEvent.Connect,
    )
      .pipe(
        tap(() => this.socket?.emit(SocketEvent.CreateRoomAttempt)),
        // take(1)
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.CreateRoomSuccess)
      .pipe(
        tap((roomCode: string) => this.store.dispatch(createRoomSuccess({ roomCode }))),
        take(1),
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.Players)
      .pipe(
        tap((players: Player[]) => {
          this.store.dispatch(receivePlayers({ players }));
        }),
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.HostPlayerId)
      .pipe(
        tap((hostPlayerId: string) => {
          this.store.dispatch(receiveHostPlayerId({ hostPlayerId }));
        }),
      )
      .subscribe();

    fromEvent(this.socket, SocketEvent.PlayerSetReady)
      .pipe(
        tap(result => {
          this.store.dispatch(
            setPlayerReadyStatus({
              playerId: result.playerId,
              isReady: result.isReady,
            }),
          );
        }),
      )
      .subscribe();

    this.socket.on(SocketEvent.StartGameSuccess, () => {
      this.store.dispatch(startGameSuccess());
    });

    this.socket.on(SocketEvent.Countdown, (number: number) => {
      this.store.dispatch(countdown({ number }));
    });

    this.socket.on(SocketEvent.AnswerRevealCountdown, (number: number) => {
      this.store.dispatch(answerRevealCountdown({ number }));
    });

    this.socket.on(SocketEvent.GetQuestionSuccess, (question: QuestionPrompt) => {
      this.store.dispatch(askQuestion({ question }));
    });

    this.socket.on(SocketEvent.ShowCorrectAnswer, (id: number) => {
      this.store.dispatch(showCorrectAnswer({ id }));
    });

    this.socket.on(SocketEvent.End, (winnerPlayerId: string) => {
      console.log('Received End event with winnerPlayerId:', winnerPlayerId);
      this.store.dispatch(end({ winnerPlayerId }));
    });

    // this.socket.on('roomDisconnected', () => {
    //   this.store.dispatch(pause());
    // });
    // this.socket.on('playerDisconnected', () => {
    //   this.store.dispatch(pause());
    // });
  }
}
