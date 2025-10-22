import { first, Observable, tap } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectQuestion, selectRoomCode } from '../../state/gameboard.selector';
import { Question } from '@models/question';
import { Game } from '@models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  question$: Observable<Question>;
  roomCode$: Observable<string>;

  constructor(private store: Store<{ game: Game }>) {
    this.question$ = this.store.select(selectQuestion);
    this.roomCode$ = this.store.select(selectRoomCode);
  }

  getQuestion() {
    // gameService.getQuestion()
  }
}
