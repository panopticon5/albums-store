import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AlbumsListComponent } from '../albums-list/albums-list.component';
import { NewAlbumComponent } from '../new-album/new-album.component';

@Component({
  selector: 'albums-page',
  imports: [AlbumsListComponent, NewAlbumComponent, MatToolbarModule, MatCardModule],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss'
})
export class AlbumsPageComponent {}
