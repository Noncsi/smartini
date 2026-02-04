import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { GamePhase } from '@models/game';
import { JoinComponent } from './components/join/join.component';
import { ChooseAnswerComponent } from './components/choose-answer/choose-answer.component';
import { ReadyComponent } from './components/ready/ready.component';
import { selectGamePhase } from './state/selectors/game.selector';
import { selectIsJoined } from './state/selectors/player.selector';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JoinComponent, ReadyComponent, ChooseAnswerComponent, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  store = inject(Store);

  gamePhase = GamePhase;
  currentPhase: Signal<GamePhase> = this.store.selectSignal(selectGamePhase);
  isJoined: Signal<boolean> = this.store.selectSignal(selectIsJoined);
}
