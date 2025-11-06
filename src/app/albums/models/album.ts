export type AlbumStatus = 'queued' | 'listening' | 'done';

export interface Album {
  id: number;          // e.g., uuid
  title: string;
  releaseDate: string;
  status: AlbumStatus;
  rating: number | null;      // 0–5
}
