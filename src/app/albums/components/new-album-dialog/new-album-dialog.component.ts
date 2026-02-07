import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { form, minLength, required, FormField } from '@angular/forms/signals';

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
    MatDatepickerModule,
    FormField
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAlbumDialogComponent {
  public newArtistModel = signal<NewAlbumData>({ artist: '', title: '', releaseDate: '' });
  public form = form(this.newArtistModel, (f) => {
    required(f.artist, { message: 'Artist is required' });
    required(f.title, { message: 'Title is required' });
    minLength(f.artist, 3, { message: 'Artist must be at least 3 characters long' });
    minLength(f.title, 3, { message: 'Title must be at least 3 characters long' });
  });

  private _dialogRef = inject(MatDialogRef<NewAlbumDialogComponent>);

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public onAddClick(): void {
    this._dialogRef.close(this.newArtistModel());
  }
}

interface NewAlbumData {
  artist: string;
  title: string;
  releaseDate: string;
}