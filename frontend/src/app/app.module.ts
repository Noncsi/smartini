import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HostClientComponent } from './core/host-client/components/host-client/host-client.component';
import { PlayerClientComponent } from './core/player-client/components/player-client/player-client.component';
import { WelcomePageComponent } from './core/welcome-page/components/welcome-page/welcome-page.component';

@NgModule({
  declarations: [AppComponent, HostClientComponent, PlayerClientComponent, WelcomePageComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
