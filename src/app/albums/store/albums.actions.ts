import { createAction, props } from '@ngrx/store';
import { Album, AlbumStatus } from '../models/album';

// Load
export const loadAlbums = createAction('[Albums] Load Albums');
export const loadAlbumsSuccess = createAction(
  '[Albums] Load Albums Success',
  props<{ albums: Album[] }>()
);
export const loadAlbumsFailure = createAction(
  '[Albums] Load Albums Failure',
  props<{ error: string }>()
);

// Add
export const addAlbum = createAction(
  '[Albums] Add Album',
  props<{ artist: string; title: string; releaseDate?: string }>()
);
export const addAlbumSuccess = createAction(
  '[Albums] Add Album Success',
  props<{ album: Album }>()
);
export const addAlbumFailure = createAction(
  '[Albums] Add Album Failure',
  props<{ error: string }>()
);

// Rate
export const rateAlbum = createAction(
  '[Albums] Rate Album',
  props<{ id: string; rating: number }>()
);
export const rateAlbumSuccess = createAction(
  '[Albums] Rate Album Success',
  props<{ id: string, rating: number }>()
);
export const rateAlbumFailure = createAction(
  '[Albums] Rate Album Failure',
  props<{ error: string }>()
);

// Delete
export const deleteAlbum = createAction(
  '[Albums] Delete Album',
  props<{ id: string }>()
);
export const deleteAlbumSuccess = createAction(
  '[Albums] Delete Album Success',
  props<{ id: string }>()
);
export const deleteAlbumFailure = createAction(
  '[Albums] Delete Album Failure',
  props<{ error: string }>()
);