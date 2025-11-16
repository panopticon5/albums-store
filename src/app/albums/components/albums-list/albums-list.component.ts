import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectCounts, selectListeningAlbums, selectRatedAlbums, selectLatestAlbums, selectAlbumsError } from '../../store/albums.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectAlbumsLoading } from '../../store/albums.selectors';
import { deleteAlbum, loadAlbums, rateAlbum } from '../../store/albums.actions';
import { Album } from '../../models/album';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../rate-dialog/rate-dialog.component';
import { RangePipe } from '../../../utils/range.pipe';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatLabel, MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'albums-list',
  imports: [
    AsyncPipe, DatePipe,
    MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, MatTooltipModule,
    RangePipe,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './albums-list.component.html',
  styleUrl: './albums-list.component.scss'
})
export class AlbumsListComponent implements OnInit {
  private _store = inject(Store);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  public searchCtrl = new FormControl<string>('');

  public loading$ = this._store.select(selectAlbumsLoading);
  public counts$ = this._store.select(selectCounts);
  public listeningAlbums$ = this._store.select(selectListeningAlbums);
  public ratedAlbums$ = this._store.select(selectRatedAlbums);
  public latestAlbums$ = this._store.select(selectLatestAlbums);
  public error$ = this._store.select(selectAlbumsError);

  private _search$ = this.searchCtrl.valueChanges.pipe(
    startWith(''),
    map((v) => (v ?? '').toString().trim().toLowerCase()),
    debounceTime(250),
    distinctUntilChanged()
  );

  public filteredListening$ = combineLatest([this.listeningAlbums$, this._search$]).pipe(
    map(([albums, q]) =>
      q ? albums.filter(a => (a.title + ' ' + a.artist).toLowerCase().includes(q)) : albums
    )
  );

  public filteredRated$ = combineLatest([this.ratedAlbums$, this._search$]).pipe(
    map(([albums, q]) =>
      q ? albums.filter(a => (a.title + ' ' + a.artist).toLowerCase().includes(q)) : albums
    )
  );

  public filteredCounts$ = combineLatest([this.filteredListening$, this.filteredRated$]).pipe(
    map(([listening, rated]) => {
      const total = listening.length + rated.length;
      const ratedCount = rated.length;
      return { total, rated: ratedCount, unrated: total - ratedCount };
    })
  );

  public ngOnInit(): void {
    this._store.dispatch(loadAlbums());
  }

  public openRateDialog(album: Album): void {
    const dialogRef = this._dialog.open(RateDialogComponent, {
      data: { album },
    });

    dialogRef.afterClosed().subscribe((rating: number) => {
      console.log('Rating received from dialog:', rating);
      if(rating) {
        this._rate(album.id, rating);
        this._snackBar.open('Album successfully rated', 'Close', { duration: 2000 });
      }
    });
  }

  public openRemoveDialog(album: Album): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { album },
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      console.log('Response received from dialog:', confirm);
      if(confirm) {
        this._remove(album.id);
        this._snackBar.open('Album successfully removed from your list', 'Close', { duration: 2000 });
      }
    });
  }

  private _rate(id: string, rating: number): void {
    this._store.dispatch(rateAlbum({ id, rating }));
  }

  private _remove(id: string): void {
    this._store.dispatch(deleteAlbum({ id }));
  }
}