import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { playerReducer } from './core/state/player/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LobbyEffects } from './phases/00-lobby/state/lobby.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { gameReducer } from './core/state/game/game.reducer';
import { GameEffects } from './phases/01-game/state/game.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ game: gameReducer, player: playerReducer }),
      EffectsModule.forRoot([LobbyEffects, GameEffects])
    ),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
