export type AlbumStatus = 'listening' | 'done';

export interface Album {
  id: string;
  artist: string;
  title: string;
  releaseDate: string;
  status: AlbumStatus;
  rating: number | null;
}
