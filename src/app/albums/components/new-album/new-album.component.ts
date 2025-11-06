import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { addAlbum } from "../../store/albums.actions";

@Component({
  selector: 'new-album',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.scss'
})
export class NewAlbumComponent {
  private _store = inject(Store);
  public titleCtrl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  public submitting = signal(false);

  public submit() {
    const title = this.titleCtrl.value.trim();
    if (!title) return;
    this.submitting.set(true);
    this._store.dispatch(addAlbum({ title }));
    this.titleCtrl.reset('');
    this.submitting.set(false);
  }
}