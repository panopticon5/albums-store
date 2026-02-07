import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { form, debounce, FormField } from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectCounts, selectListeningAlbums, selectRatedAlbums, selectLatestAlbums, selectAlbumsError } from '../../store/albums.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectAlbumsLoading } from '../../store/albums.selectors';
import { deleteAlbum, loadAlbums, rateAlbum } from '../../store/albums.actions';
import { Album } from '../../models/album';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../rate-dialog/rate-dialog.component';
import { RangePipe } from '../../../utils/range.pipe';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatLabel, MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'albums-list',
  imports: [
    DatePipe,
    MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, MatTooltipModule,
    RangePipe,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormField
],
  templateUrl: './albums-list.component.html',
  styleUrl: './albums-list.component.scss'
})
export class AlbumsListComponent implements OnInit {
  private _store = inject(Store);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  public searchModel = signal('');

  public searchForm = form(this.searchModel, (path) => {
    debounce(path, 250);
  });

  public loading = toSignal(this._store.select(selectAlbumsLoading));
  public counts = toSignal(this._store.select(selectCounts));
  public listeningAlbums = toSignal(this._store.select(selectListeningAlbums));
  public ratedAlbums = toSignal(this._store.select(selectRatedAlbums));
  public latestAlbums = toSignal(this._store.select(selectLatestAlbums));
  public error = toSignal(this._store.select(selectAlbumsError));

  private _search = computed(() =>
    (this.searchForm().value() ?? '').toString().trim().toLowerCase()
  );

  public filteredListening = computed(() => {
    const listening = this.listeningAlbums();
    const q = this._search();
    return q ? listening?.filter(a => (a.title + ' ' + a.artist).toLowerCase().includes(q)) : listening;
  }
  );

  public filteredRated = computed(() => {
    const rated = this.ratedAlbums();
    const q = this._search();
    return q ? rated?.filter(a => (a.title + ' ' + a.artist).toLowerCase().includes(q)) : rated;
  }
  );

  public filteredCounts = computed(() => {
    const listening = this.filteredListening();
    const rated = this.filteredRated();
    const total = (listening?.length ?? 0) + (rated?.length ?? 0);
    const ratedCount = rated?.length ?? 0;
    return { total, rated: ratedCount, unrated: total - ratedCount };
  });

  public ngOnInit(): void {
    this._store.dispatch(loadAlbums());
  }

  public openRateDialog(album: Album): void {
    const dialogRef = this._dialog.open(RateDialogComponent, {
      data: { album },
    });

    dialogRef.afterClosed().subscribe((rating: number) => {
      console.log('Rating received from dialog:', rating);
      if (rating) {
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
      if (confirm) {
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