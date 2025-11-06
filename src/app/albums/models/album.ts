export type AlbumStatus = 'listening' | 'done';

export interface Album {
  id: string;          // e.g., uuid
  title: string;
  releaseDate: string;
  status: AlbumStatus;
  rating: number | null;      // 0–5
}
