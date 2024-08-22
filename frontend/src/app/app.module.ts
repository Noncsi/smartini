import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GameBoardComponent } from './core/game-board-client/components/game-board/game-board.component';
import { PlayerPadComponent } from './core/player-pad-client/components/player-pad/player-pad.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';
import { ReadyComponent } from './core/player-pad-client/components/ready/ready.component';
import { JoinComponent } from './core/player-pad-client/components/join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PlayerPadComponent,
    WelcomePageComponent,
    ReadyComponent,
    JoinComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
