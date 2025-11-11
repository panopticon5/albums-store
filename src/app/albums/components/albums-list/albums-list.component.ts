import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectCounts, selectListeningAlbums, selectRatedAlbums, selectLatestAlbums, selectAlbumsError, selectAlbumsState } from '../../store/albums.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, DatePipe } from '@angular/common';
import { selectAlbumsLoading } from '../../store/albums.selectors';
import { deleteAlbum, loadAlbums, rateAlbum, updateStatus } from '../../store/albums.actions';
import { Album, AlbumStatus } from '../../models/album';
import { MatDialog } from '@angular/material/dialog';
import { RateDialogComponent } from '../rate-dialog/rate-dialog.component';

@Component({
  selector: 'albums-list',
  imports: [
    AsyncPipe, DatePipe,
    MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, MatTooltipModule
  ],
  templateUrl: './albums-list.component.html',
  styleUrl: './albums-list.component.scss'
})
export class AlbumsListComponent implements OnInit {
  private _store = inject(Store);
  private _dialog = inject(MatDialog);

  public loading$ = this._store.select(selectAlbumsLoading);
  public counts$ = this._store.select(selectCounts);
  public listeningAlbums$ = this._store.select(selectListeningAlbums);
  public ratedAlbums$ = this._store.select(selectRatedAlbums);
  public latestAlbums$ = this._store.select(selectLatestAlbums);
  public error$ = this._store.select(selectAlbumsError);

  public ngOnInit(): void {
    this._store.dispatch(loadAlbums());
  }

  public openRateDialog(album: Album): void {
    const dialogRef = this._dialog.open(RateDialogComponent, {
      data: { album },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Rating received from dialog:', result);
      if(result) {
        console.log('Rate submitted');
      }
    });
  }

  public updateStatus(id: string) {
    const status = 'done' as AlbumStatus;
    this._store.dispatch(updateStatus({ id, status }));
  }

  public rate(id: string, rating: number) {
    this._store.dispatch(rateAlbum({ id, rating }));
  }

  public remove(id: string) {
    this._store.dispatch(deleteAlbum({ id }));
  }
}