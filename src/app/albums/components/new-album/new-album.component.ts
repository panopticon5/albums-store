import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { addAlbum } from "../../store/albums.actions";
import { MatDialog } from "@angular/material/dialog";
import { NewAlbumDialogComponent } from "../new-album-dialog/new-album-dialog.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: 'new-album',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAlbumComponent {
  private _store = inject(Store);
  private _dialog = inject(MatDialog);
  
  public submitting = signal(false);


  public openNewAlbumDialog(): void {
    const dialogRef = this._dialog.open(NewAlbumDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('New album received from dialog:', result);
      if(result) {
        this._submitNewAlbum(result);
        console.log('Album added');
      }
    });
  }

  private _submitNewAlbum(albumData: { artist: string; title: string; releaseDate?: string }): void {
    this.submitting.set(true);
    this._store.dispatch(addAlbum({ 
      artist: albumData.artist,
      title: albumData.title,
      releaseDate: albumData.releaseDate
    }));
    this.submitting.set(false);
  }
}