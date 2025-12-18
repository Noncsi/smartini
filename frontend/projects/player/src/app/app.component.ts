import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { GamePhase } from '@models/game';
import { selectIsJoined } from './core/state/player/player.selector';
import { JoinComponent } from './phases/00-lobby/components/join/join.component';
import { ReadyComponent } from './phases/00-lobby/components/ready/ready.component';
import { selectGamePhase } from './core/state/game/game.selector';
import { ChooseAnswerComponent } from "./phases/01-game/components/choose-answer/choose-answer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JoinComponent, ReadyComponent, ChooseAnswerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  store = inject(Store);

  gamePhase = GamePhase;
  currentPhase: Signal<GamePhase> = this.store.selectSignal(selectGamePhase);
  isJoined: Signal<boolean> = this.store.selectSignal(selectIsJoined);
}
