import { Component, inject, Signal } from '@angular/core';
import { Player } from '@models/player';
import { Store } from '@ngrx/store';
import { selectPlayers, selectRoomCode } from '../../state/gameboard.selector';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  store = inject(Store);
  players: Signal<Player[]> = this.store.selectSignal(selectPlayers);
  roomCode: Signal<string> = this.store.selectSignal(selectRoomCode);
}
