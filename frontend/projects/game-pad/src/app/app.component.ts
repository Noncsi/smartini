import { CommonModule } from '@angular/common';
import { IoService } from '../../io.service';
import { JoinComponent } from './join/join.component';
import { ReadyComponent } from './ready/ready.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ChooseAnswerComponent } from './choose-answer/choose-answer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    JoinComponent,
    ReadyComponent,
    ChooseAnswerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'game-pad';
  isJoined$: Observable<boolean>;
  isStarted$: Observable<boolean>;

  constructor(private ioService: IoService) {
    this.isJoined$ = this.ioService.roomCode$.pipe(
      map((roomCode: string) => roomCode !== '')
    );
    this.isStarted$ = this.ioService.isGameStarted$.pipe(
      map((isStarted: boolean) => isStarted)
    );
  }
}
