// src/app/albums/albums-page.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { selectAll } from '../store/albums.reducer';
import { selectAlbumsAll } from '../store/albums.selectors';
// import { selectFilteredSortedAlbums } from '../state/selectors';
// import { UiActions } from '../state/ui/ui.actions';
// import { AlbumsActions } from '../state/albums/albums.actions';
// import { v4 as uuid } from 'uuid';

@Component({
  selector: 'albums-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="toolbar">
    <input placeholder="Search…" [value]="query()" (input)="onQuery(($event.target as HTMLInputElement).value)" />
    <select [value]="status()" (change)="onStatus(($event.target as HTMLSelectElement).value)">
      <option value="all">All</option>
      <option value="queued">Queued</option>
      <option value="listening">Listening</option>
      <option value="done">Done</option>
    </select>

    <select [value]="sortBy()" (change)="onSort(($event.target as HTMLSelectElement).value as any)">
      <option value="title">Title</option>
      <option value="rating">Rating</option>
      <option value="status">Status</option>
    </select>
    <button (click)="toggleDir()">{{ direction() === 'asc' ? '⬆︎' : '⬇︎' }}</button>

    <button (click)="addSample()">Add sample</button>
  </section>

  <ul>
    <li *ngFor="let a of albums()">
      <div class="row">
        <strong>{{ a.title }}</strong>
        <span>— {{ a.status }} — ★{{ a.rating }}</span>
      </div>
      <div class="row">
        <button (click)="setStatus(a.id, 'queued')">Queue</button>
        <button (click)="setStatus(a.id, 'listening')">Listen</button>
        <button (click)="setStatus(a.id, 'done')">Done</button>
        <button (click)="rate(a.id, (a.rating+1) % 6)">Rate+ ({{ (a.rating+1)%6 }})</button>
        <button (click)="remove(a.id)">Remove</button>
      </div>
    </li>
  </ul>
  `,
  styles: [`.toolbar{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap} .row{display:flex;gap:.5rem;align-items:center}`]
})
export class AlbumsPageComponent {
    albums$: Observable<Album[]>;
  constructor(private store: Store<AppState>) {
    this.albums$ = this.store.select(selectAlbumsAll)
  }

//   albums = this.store.selectSignal(selectFilteredSortedAlbums);

//   // local UI signals mirror current filters; could also read from store.selectSignal(uiFeature.*)
//   query = signal(''); status = signal<'all'|'queued'|'listening'|'done'>('all');
//   sortBy = signal<'title'|'rating'|'status'>('title');
//   direction = signal<'asc'|'desc'>('asc');

//   onQuery(q: string) { this.query.set(q); this.store.dispatch(UiActions.setQuery({ query: q })); }
//   onStatus(s: 'all'|'queued'|'listening'|'done') { this.status.set(s); this.store.dispatch(UiActions.setStatusFilter({ status: s })); }
//   onSort(s: 'title'|'rating'|'status') { this.sortBy.set(s); this.store.dispatch(UiActions.setSort({ sortBy: s, direction: this.direction() })); }
//   toggleDir() {
//     const d = this.direction() === 'asc' ? 'desc' : 'asc';
//     this.direction.set(d);
//     this.store.dispatch(UiActions.setSort({ sortBy: this.sortBy(), direction: d }));
//   }

//   addSample() {
//     this.store.dispatch(AlbumsActions.loadSample({
//       albums: [
//         { id: uuid(), title: 'Kind of Blue', status: 'queued', rating: 0 },
//         { id: uuid(), title: 'In Rainbows', status: 'listening', rating: 4 },
//         { id: uuid(), title: 'Discovery', status: 'done', rating: 5 },
//       ]
//     }));
//   }

//   setStatus(id: string, status: any) { this.store.dispatch(AlbumsActions.updateStatus({ id, status })); }
//   rate(id: string, rating: number) { this.store.dispatch(AlbumsActions.rate({ id, rating })); }
//   remove(id: string) { this.store.dispatch(AlbumsActions.remove({ id })); }
}
