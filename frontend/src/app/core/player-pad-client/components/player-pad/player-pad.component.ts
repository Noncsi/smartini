import { Component } from '@angular/core';

@Component({
  selector: 'app-player-pad',
  templateUrl: './player-pad.component.html',
  styleUrl: './player-pad.component.scss',
})
export class PlayerPadComponent {
  isJoined: boolean = false;
  isReady: boolean = false;
}
