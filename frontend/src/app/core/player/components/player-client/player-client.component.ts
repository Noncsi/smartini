import { Component } from '@angular/core';

@Component({
  selector: 'app-player-client',
  templateUrl: './player-client.component.html',
  styleUrl: './player-client.component.scss',
})
export class PlayerClientComponent {
  isJoined: boolean = false;
  isReady: boolean = false;
}
