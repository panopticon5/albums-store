import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ALBUMS_FEATURE_KEY, albumsReducer } from './albums/store/albums.reducer';
import { AlbumsEffects } from './albums/store/albums.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(ALBUMS_FEATURE_KEY, albumsReducer),
    provideEffects([AlbumsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      trace: false,
      connectInZone: true,
      autoPause: true,
    }),
  ]
};
