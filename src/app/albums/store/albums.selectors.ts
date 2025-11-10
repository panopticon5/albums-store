import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlbumsState, selectAll, selectEntities, ALBUMS_FEATURE_KEY } from './albums.reducer';

export const selectAlbumsState = createFeatureSelector<AlbumsState>(ALBUMS_FEATURE_KEY);

export const selectAlbumsAll = createSelector(selectAlbumsState, (state) => selectAll(state));
export const selectAlbumsEntities = createSelector(selectAlbumsState, (state) => selectEntities(state));
export const selectAlbumsLoading = createSelector(selectAlbumsState, (state) => state.loading);
export const selectAlbumsError = createSelector(selectAlbumsState, (state) => state.error);

export const selectRatedAlbums = createSelector(
  selectAlbumsAll,
  (albums) => albums.filter((album) => album.rating)
);

export const selectListeningAlbums = createSelector(
  selectAlbumsAll,
  (albums) => albums.filter((album) => album.status === 'listening')
);

export const selectLatestAlbums = createSelector(
  selectAlbumsAll,
  (albums) => albums.filter((album) => album.releaseDate)
);

export const selectCounts = createSelector(
  selectAlbumsAll,
  (albums) => {
    const total = albums.length;
    const rated = albums.filter((album) => album.status === 'done').length;
    return { total, rated, unrated: total - rated };
  }
);