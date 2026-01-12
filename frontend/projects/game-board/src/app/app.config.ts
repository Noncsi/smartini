import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { gameReducer } from './state/gameboard.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { GameBoardEffects } from './state/gameboard.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { BulbyTheme } from '@styles/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({ game: gameReducer }),
        provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BulbyTheme,
      },
    }),
    provideEffects(GameBoardEffects),
    // provideStoreDevtools({
    //   maxAge: 25, // Retains last 25 states
    //   autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    //   trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    //   traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    //   connectInZone: true, // If set to true, the connection is established within the Angular zone
    // }),
  ],
};
