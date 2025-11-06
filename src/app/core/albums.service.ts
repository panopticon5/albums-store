import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, map } from 'rxjs';
import { Album, AlbumStatus } from '../albums/models/album';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private _data: Album[] = [];

  public getAlbums(): Observable<Album[]> {
    if (this._data.length === 0) {
      this._data = [0,1,2].map(i => this._generateAlbum(`Album ${i + 1}`));
    }
    console.log('data from api', this._data);
    return of(this._data).pipe(delay(400));
  }

  public add(title: string): Observable<Album> {
    if (!title.trim()) return throwError(() => new Error('Title is required'));
    const album = this._generateAlbum(title);
    this._data = [...this._data, album];
    console.log('data from api after add', this._data);
    return of(album).pipe(delay(250));
  }

  public updateStatus(id: string, status: AlbumStatus): Observable<{ id: string; changes: Partial<Album> }> {
    const albumIndex = this._data.findIndex(a => a.id === id);
    if (albumIndex === -1) return throwError(() => new Error('Album not found'));
    const changes = { status };
    this._data[albumIndex] = { ...this._data[albumIndex], ...changes };
    return of({ id, changes }).pipe(delay(200));
  }

  public rate(id: string, rating: number): Observable<{ id: string; changes: Partial<Album> }> {
    const albumIndex = this._data.findIndex(a => a.id === id);
    if (albumIndex === -1) return throwError(() => new Error('Album not found'));
    const changes = { rating };
    this._data[albumIndex] = { ...this._data[albumIndex], ...changes };
    return of({ id, changes }).pipe(delay(200));
  }

  public delete(id: string): Observable<{ id: string }> {
    const albumIndex = this._data.findIndex(a => a.id === id);
    if (albumIndex === -1) return throwError(() => new Error('Album not found'));
    this._data.splice(albumIndex, 1);
    return of({ id }).pipe(delay(200));
  }

  private _generateAlbum(title: string): Album {
    return {
      id: this._generateNumericUUID(),
      title: title.trim(),
      rating: null,
      status: 'listening',
      releaseDate: new Date().toISOString(),
    };
  }

  private _generateNumericUUID(): string {
    const timestamp = Date.now();
    
    const randomDigits = Math.floor(Math.random() * 10000);
    
    return Number(`${timestamp}${randomDigits.toString().padStart(4, '0')}`).toString();
  }
}