import { Component, inject } from '@angular/core';
import { JoinService } from '../service/join.service';

@Component({
  selector: 'app-join',
  standalone: true,
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
  imports: [],
})
export class JoinComponent {
  joinService = inject(JoinService);

  join(roomCode: string, playerName: string) {
    this.joinService.join(roomCode, playerName);
  }
}
