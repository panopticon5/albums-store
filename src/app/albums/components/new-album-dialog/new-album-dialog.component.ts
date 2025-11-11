import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'new-album-dialog',
  templateUrl: './new-album-dialog.component.html',
  styleUrl: './new-album-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule
],
})
export class NewAlbumDialogComponent {
  public artistCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  public titleCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  public releaseDateCtrl = new FormControl<string>('', { nonNullable: false });
  private _dialogRef = inject(MatDialogRef<NewAlbumDialogComponent>);

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public onAddClick(): void {
    this._dialogRef.close({ artist: this.artistCtrl.value, title: this.titleCtrl.value, releaseDate: this.releaseDateCtrl.value });
  }
}