import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlbumsState, selectAll, selectEntities, ALBUMS_FEATURE_KEY } from './albums.reducer';
import { Album } from '../models/album';

export const selectAlbumsState = createFeatureSelector<AlbumsState>(ALBUMS_FEATURE_KEY);

export const selectAlbumsAll = createSelector(selectAlbumsState, (state: AlbumsState) => selectAll(state));
export const selectAlbumsEntities = createSelector(selectAlbumsState, (state: AlbumsState) => selectEntities(state));
export const selectAlbumsLoading = createSelector(selectAlbumsState, (state: AlbumsState) => state.loading);
export const selectAlbumsError = createSelector(selectAlbumsState, (state: AlbumsState) => state.error);

export const selectRatedAlbums = createSelector(
  selectAlbumsAll,
  (albums: Album[]) => albums.filter((album) => album.rating)
);

export const selectListeningAlbums = createSelector(
  selectAlbumsAll,
  (albums: Album[]) => albums.filter((album) => album.status === 'listening')
);

export const selectLatestAlbums = createSelector(
  selectAlbumsAll,
  (albums: Album[]) => albums.filter((album) => album.releaseDate)
);

export const selectCounts = createSelector(
  selectAlbumsAll,
  (albums: Album[]) => {
    const total = albums.length;
    const rated = albums.filter((album) => album.status === 'done').length;
    return { total, rated, unrated: total - rated };
  }
);

export const selectFilteredAlbums = createSelector(
  selectAlbumsAll,
  (albums: Album[]) => albums.filter((album) => album.artist.includes('') || album.title.includes(''))
);