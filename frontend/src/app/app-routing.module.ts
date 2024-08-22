import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostClientComponent } from './core/host/components/host-client/host-client.component';
import { PlayerClientComponent } from './core/player/components/player-client/player-client.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'host', component: HostClientComponent },
  { path: 'player', component: PlayerClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
