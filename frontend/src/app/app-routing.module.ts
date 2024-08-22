import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent } from './core/game-board-client/components/game-board/game-board.component';
import { GamePadComponent } from './core/game-pad-client/components/game-pad/game-pad.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'host', component: GameBoardComponent },
  { path: 'player', component: GamePadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
