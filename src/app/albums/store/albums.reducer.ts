import { createReducer, on } from '@ngrx/store';
import {
    addAlbum,
  addAlbumSuccess,
  deleteAlbum,
  deleteAlbumSuccess,
  loadAlbums,
  loadAlbumsFailure,
  loadAlbumsSuccess,
  rateAlbum,
  updateStatus,
} from './albums.actions';
import {
  createEntityAdapter,
  EntityState
} from '@ngrx/entity';
import { Album } from '../models/album';

export const ALBUMS_FEATURE_KEY = 'albums';

export interface AlbumsState extends EntityState<Album> {
  loading: boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<Album>({
  selectId: (a) => a.id,
  sortComparer: (a, b) => b.releaseDate.localeCompare(a.releaseDate), // newest first
});

export const initialState: AlbumsState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const albumsReducer = createReducer(
  initialState,

  // Load
  on(loadAlbums, (state) => ({ ...state, loading: true, error: null })),
  on(loadAlbumsSuccess, (state, { albums }) =>
    adapter.setAll(albums, { ...state, loading: false })
  ),
  on(loadAlbumsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(addAlbum, (state, { title }) => adapter.addOne({ id: '', title, releaseDate: '', rating: null, status: 'listening'  }, state)),

  // Update status
  on(updateStatus, (state, { id, status }) => adapter.updateOne({ id, changes: { status } }, state)),

  // Rate
  on(rateAlbum, (state, { id, rating }) => adapter.updateOne({ id, changes: { rating } }, state)),

  // Remove
  on(deleteAlbum, (state, { id }) => adapter.removeOne(id, state))
);

// Expose adapter selectors (we’ll wire these in selectors file)
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();