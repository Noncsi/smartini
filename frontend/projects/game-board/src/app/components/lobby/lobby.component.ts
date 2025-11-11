import { Component, inject, Signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import { Player } from '@models/player';
import { Store } from '@ngrx/store';
import { selectPlayers, selectRoomCode } from '../../state/gameboard.selector';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatListModule, MatBadgeModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  store = inject(Store);
  players: Signal<Player[]> = this.store.selectSignal(selectPlayers);
  roomCode: Signal<string> = this.store.selectSignal(selectRoomCode);
}
