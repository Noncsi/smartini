import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { gameReducer, playerReducer } from './state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JoinEffects } from './modules/join/state/join.effects';
import { ReadyEffects } from './modules/ready/state/ready.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ game: gameReducer, player: playerReducer }),
      EffectsModule.forRoot([JoinEffects, ReadyEffects])
    ),
  ],
};
