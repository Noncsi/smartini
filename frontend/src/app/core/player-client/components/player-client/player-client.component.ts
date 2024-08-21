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

  join(name: string) {
    this.ioService.joinPlayer(name);
    this.error = name + ' join megvolt';
  }
}
