import { CommonModule } from '@angular/common';
import { WebSocketService } from './services/websocket.service';
import { ReadyComponent } from './components/ready/ready.component';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RejoinComponent } from './components/rejoin/rejoin.component';
import { ChooseAnswerComponent } from './components/choose-answer/choose-answer.component';
import { Store } from '@ngrx/store';
import { Game, GamePhase } from '@models/game';
import { selectGamePhase, selectRoomCode } from './state/player.selector';
import { JoinComponent } from './modules/join/component/join.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JoinComponent,
    RejoinComponent,
    ReadyComponent,
    ChooseAnswerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'player';
  currentPhase$: Observable<GamePhase> = this.store.select(selectGamePhase);
  gamePhase = GamePhase;
  isJoined$: Observable<boolean>;
  isStarted$: Observable<boolean>;
  isAlreadyInGame: boolean = false;
  constructor(
    private webSocketService: WebSocketService,
    private store: Store<{ game: Game }>
  ) {
    // check if room in ls is live
    // if yes, show reconnect page
    // if not, show connect page, delete room in ls
    this.isJoined$ = this.store
      .select(selectRoomCode)
      .pipe(map((roomCode: string) => roomCode !== ''));

    this.isStarted$ = this.store
      .select(selectGamePhase)
      .pipe(map((phase: GamePhase) => phase === GamePhase.gamePlay));
  }
}
