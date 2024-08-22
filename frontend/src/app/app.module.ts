import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HostClientComponent } from './core/host/components/host-client/host-client.component';
import { PlayerClientComponent } from './core/player/components/player-client/player-client.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';
import { ReadyComponent } from './core/player/components/ready/ready.component';
import { JoinComponent } from './core/player/components/join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    HostClientComponent,
    PlayerClientComponent,
    WelcomePageComponent,
    ReadyComponent,
    JoinComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
