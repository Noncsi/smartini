import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { GameEffects } from './state/effects/game.effects';
import { LobbyEffects } from './state/effects/lobby.effects';
import { gameReducer } from './state/reducers/game.reducer';
import { playerReducer } from './state/reducers/player.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { BulbyTheme } from '@styles/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ game: gameReducer, player: playerReducer }),
      EffectsModule.forRoot([LobbyEffects, GameEffects])
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BulbyTheme,
        options: {
            darkModeSelector: false || 'none'
        }
      },
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
