import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { gameReducer, playerReducer } from './state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './state/player.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ game: gameReducer, player: playerReducer }),
      EffectsModule.forRoot([PlayerEffects])
    ),
  ],
};
