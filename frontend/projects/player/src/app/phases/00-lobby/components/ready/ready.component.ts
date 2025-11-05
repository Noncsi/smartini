import { Component, inject } from '@angular/core';
import { LobbyService } from '../../lobby.service';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-ready',
  standalone: true,
  templateUrl: './ready.component.html',
  styleUrl: './ready.component.scss',
  imports: [MatSlideToggleModule, MatButtonModule],
})
export class ReadyComponent {
  lobbyService = inject(LobbyService);
  isReady = this.lobbyService.isReady;
  me = this.lobbyService.me;

  setReady(event: MatSlideToggleChange) {
    this.lobbyService.setReady(event.checked);
  }
}
