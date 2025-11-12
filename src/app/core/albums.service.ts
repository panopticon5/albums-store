import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, map } from 'rxjs';
import { Album, AlbumStatus } from '../albums/models/album';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private _data: Album[] = [];
  private _mockedAlbums = [{ artist: 'Deftones', title: 'Koi No Yokan'}, { artist: 'Chat Pile', title: 'Cool World' }, { artist: 'Vega Trails', title: 'Tremors in the Static' }];

  public getAlbums(): Observable<Album[]> {
    if (this._data.length === 0) {
      this._data = this._mockedAlbums.map(mockedAlbum => this._generateAlbum(mockedAlbum.artist, mockedAlbum.title));
    }
    console.log('data from api', this._data);
    return of(this._data).pipe(delay(400));
  }

  public add(payload: {artist: string; title: string; releaseDate?: string}): Observable<Album> {
    if (!payload.artist.trim()) return throwError(() => new Error('Artist is required'));
    if (!payload.title.trim()) return throwError(() => new Error('Title is required'));
    const album = this._generateAlbum(payload.artist, payload.title, payload.releaseDate);
    this._data = [...this._data, album];
    console.log('data from api after add', this._data);
    return of(album).pipe(delay(250));
  }

  public updateStatus(payload: {id: string; status: AlbumStatus}): Observable<{ id: string; changes: Partial<Album> }> {
    const selectedAlbum = this._data.find(a => a.id === payload.id);
    if (!selectedAlbum) return throwError(() => new Error('Album not found'));
    const changes: Partial<Album> = { status: payload.status };
    this._data = this._data.map((a) => (a.id === selectedAlbum.id ? { ...a, ...changes } : a));
    return of({ id: payload.id, changes }).pipe(delay(200));
  }

  public rate(payload: {id: string; rating: number}): Observable<{ id: string; changes: Partial<Album> }> {
    const selectedAlbum = this._data.find(a => a.id === payload.id);
    if (!selectedAlbum) return throwError(() => new Error('Album not found'));
    const changes: Partial<Album> = { rating: payload.rating, status: 'done' };
    this._data = this._data.map((a) => (a.id === selectedAlbum.id ? { ...a, ...changes } : a));
    return of({ id: payload.id, changes }).pipe(delay(200));
  }

  public delete(payload: {id: string}): Observable<{ id: string }> {
    const selectedAlbum = this._data.find(a => a.id === payload.id);
    if (!selectedAlbum) return throwError(() => new Error('Album not found'));
    this._data = this._data.filter((a) => (a.id !== selectedAlbum.id));
    return of({ id: payload.id }).pipe(delay(200));
  }

  private _generateAlbum(artist: string, title: string, releaseDate?: string): Album {
    return {
      id: this._generateNumericUUID(),
      artist: artist.trim(),
      title: title.trim(),
      rating: null,
      status: 'listening',
      releaseDate: releaseDate ? new Date(releaseDate).toISOString() : new Date().toISOString(),
    };
  }

  private _generateNumericUUID(): string {
    const timestamp = Date.now();
    const randomDigits = Math.floor(Math.random() * 10000);
    return `${timestamp}${randomDigits.toString().padStart(4, '0')}`;
  }
}