export interface AssetLink {
  sys: {
    type: 'Link';
    linkType: 'Asset';
    id: string;
  };
}

export interface Asset {
  sys: {
    id: string;
    type: 'Asset';
  };
  fields: {
    file?: {
      url: string;
      details?: {
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

// Alias for Photo to maintain compatibility
export type Photo = Asset;

export interface Album {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    photos: Asset[];
  };
}