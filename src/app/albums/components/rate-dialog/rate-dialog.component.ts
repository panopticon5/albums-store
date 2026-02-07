import { Component, inject, signal } from '@angular/core';
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
import { form, FormField, max, min } from '@angular/forms/signals';

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
    MatDialogClose,
    FormField
],
})
export class RateDialogComponent {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // public readonly rate = model(this.data.album.rating || 0);

  public rateModel = signal<number>(this.data.album.rating || 0);
  public rateForm = form(this.rateModel, (f) => {
    min(f, 1,  {message: 'Minimum rating is 1'});
    max(f, 5, {message: 'Maximum rating is 5'});
  });
  private _dialogRef = inject(MatDialogRef<RateDialogComponent>);

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public onRateClick(): void {
    this._dialogRef.close(this.rateForm().value());
  }
}

interface DialogData {
    album: Album;
}