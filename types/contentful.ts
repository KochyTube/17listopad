import { Asset, Entry } from 'contentful';

export interface GalleryFields {
  name?: string;
  photos?: Asset[];
}

export type GalleryEntry = Entry<GalleryFields>;