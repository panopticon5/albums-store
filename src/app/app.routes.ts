import { Routes } from '@angular/router';
import { AlbumsPageComponent } from './albums/components/albums-page/albums-page.component';

export const routes: Routes = [
  { path: '', component: AlbumsPageComponent, title: 'Albums' },
];
