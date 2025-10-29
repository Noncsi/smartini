import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { gameReducer, playerReducer } from './core/state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LobbyEffects } from './phases/00-lobby/state/lobby.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ game: gameReducer, player: playerReducer }),
      EffectsModule.forRoot([LobbyEffects])
    ),
  ],
};
