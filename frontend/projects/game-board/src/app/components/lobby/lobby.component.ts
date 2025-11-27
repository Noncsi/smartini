import { Component, inject, Signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Player } from '@models/player';
import { Store } from '@ngrx/store';
import { selectPlayers, selectRoomCode } from '../../state/gameboard.selector';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  store = inject(Store);
  players: Signal<Player[]> = this.store.selectSignal(selectPlayers);
  roomCode: Signal<string> = this.store.selectSignal(selectRoomCode);
}
