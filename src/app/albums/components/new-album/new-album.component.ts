import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { addAlbum } from "../../store/albums.actions";
import { MatDialog } from "@angular/material/dialog";
import { NewAlbumDialogComponent } from "../new-album-dialog/new-album-dialog.component";

@Component({
  selector: 'new-album',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.scss'
})
export class NewAlbumComponent {
  private _store = inject(Store);
  private _dialog = inject(MatDialog);
  public titleCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  public submitting = signal(false);


  public openNewAlbumDialog(): void {
    const dialogRef = this._dialog.open(NewAlbumDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('New album received from dialog:', result);
      if(result) {
        console.log('Album added');
      }
    });
  }

  // public submit() {
  //   const title = this.titleCtrl.value.trim();
  //   if (!title) return;
  //   this.submitting.set(true);
  //   this._store.dispatch(addAlbum({ title }));
  //   this.titleCtrl.reset('');
  //   this.submitting.set(false);
  // }
}