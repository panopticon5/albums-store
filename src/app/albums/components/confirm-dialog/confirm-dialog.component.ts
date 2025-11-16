import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Album } from '../../models/album';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
],
})
export class ConfirmDialogComponent {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public onConfirmClick(): void {
    this._dialogRef.close(true);
  }
}

interface DialogData {
    album: Album;
}