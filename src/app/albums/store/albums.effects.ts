import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AlbumsService } from '../../core/albums.service';
import { addAlbum, addAlbumFailure, addAlbumSuccess, deleteAlbum, deleteAlbumFailure, deleteAlbumSuccess, loadAlbums, loadAlbumsFailure, loadAlbumsSuccess, rateAlbum, rateAlbumFailure, rateAlbumSuccess } from './albums.actions';

@Injectable({ providedIn: 'root' })
export class AlbumsEffects {
  private _actions$ = inject(Actions);
  private _api = inject(AlbumsService);

  public load$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadAlbums),
      switchMap(() =>
        this._api.getAlbums().pipe(
          map((albums) => loadAlbumsSuccess({ albums })),
          catchError((err) => of(loadAlbumsFailure({ error: err.message ?? 'Load failed' })))
        )
      )
    )
  );

  public add$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addAlbum),
      switchMap(({ artist, title, releaseDate }) =>
        this._api.add({ artist, title, releaseDate }).pipe(
          map((album) => addAlbumSuccess({ album })),
          catchError((err) => of(addAlbumFailure({ error: err.message ?? 'Add failed' })))
        )
      )
    )
  );

  public rateAlbum$ = createEffect(() =>
    this._actions$.pipe(
      ofType(rateAlbum),
      switchMap(({ id, rating }) =>
        this._api.rate({ id, rating }).pipe(
          map(({ id }) => rateAlbumSuccess({ id, rating })),
          catchError((err) => of(rateAlbumFailure({ error: err.message ?? 'Rate failed' })))
        )
      )
    )
  );

  public delete$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteAlbum),
      switchMap(({ id }) =>
        this._api.delete({id}).pipe(
          map(({ id }) => deleteAlbumSuccess({ id })),
          catchError((err) => of(deleteAlbumFailure({ error: err.message ?? 'Delete failed' })))
        )
      )
    )
  );
}