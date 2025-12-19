import { Component, inject, Signal } from '@angular/core';
import { Player } from '@models/player';
import { Store } from '@ngrx/store';
import {
  selectHostPlayerId,
  selectPlayers,
  selectRoomCode,
} from '../../state/gameboard.selector';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ICON_MAP } from '../../../../../../libs/constants/icon-map';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './lobby.component.html',
})
export class LobbyComponent {
  store = inject(Store);
  players: Signal<Player[]> = this.store.selectSignal(selectPlayers);
  roomCode: Signal<string> = this.store.selectSignal(selectRoomCode);
  hostPlayerId: Signal<string> = this.store.selectSignal(selectHostPlayerId);
  iconMap = ICON_MAP;
}
