import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
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
  selector: 'rate-dialog',
  templateUrl: 'rate-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
],
})
export class RateDialog {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  public readonly rate = model(this.data.album.rating || 0);
  private _dialogRef = inject(MatDialogRef<RateDialog>);

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public onRateClick(): void {
    this._dialogRef.close(this.rate());
    // Here you can handle the rating logic, e.g., send the rating back to the parent component
  }
}

interface DialogData {
    album: Album;
}