import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GameBoardComponent } from './core/game-board-client/components/game-board/game-board.component';
import { GamePadComponent } from './core/game-pad-client/components/game-pad/game-pad.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';
import { ReadyComponent } from './core/game-pad-client/components/ready/ready.component';
import { JoinComponent } from './core/game-pad-client/components/join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GamePadComponent,
    WelcomePageComponent,
    ReadyComponent,
    JoinComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
