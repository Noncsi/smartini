import { Component } from '@angular/core';
import { IoService } from '../../../../io.service';

@Component({
  selector: 'app-player-client',
  templateUrl: './player-client.component.html',
  styleUrl: './player-client.component.scss',
})
export class PlayerClientComponent {
  error = '';
  constructor(private ioService: IoService) {}

  join(room: string, name: string) {
    this.ioService.joinPlayer(room, name);
  }
}
