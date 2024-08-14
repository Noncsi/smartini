import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostClientComponent } from './core/host-client/components/host-client/host-client.component';
import { PlayerClientComponent } from './core/player-client/components/player-client/player-client.component';

const routes: Routes = [
  { path: 'host', component: HostClientComponent },
  { path: 'player', component: PlayerClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
