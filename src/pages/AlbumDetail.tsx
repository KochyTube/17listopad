import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Album, AssetLink, Asset } from '../types';
import { Entry, Asset as ContentfulAsset, EntrySkeletonType } from 'contentful';
import Client from '@/client';
import RandomBg from '../components/ui/RandomBg';

interface GalleryFields {
  name: string;
  photos: AssetLink[];
}

interface GalleryEntry extends EntrySkeletonType {
  contentTypeId: 'gallery';
  fields: GalleryFields;
}

interface EntryResponse extends Entry<GalleryEntry> {
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

const AlbumDetail: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Asset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (albumId) {
      async function fetchAlbum() {
        try {
          console.log('Fetching album from Contentful:', albumId);
          const response = await Client.getEntry<GalleryEntry>(albumId, { include: 2 }) as EntryResponse;
          console.log('Contentful album response:', response);
          console.log('response.fields.name:', response.fields.name);

          // Resolve asset links to actual assets
          const photos = (response.fields.photos || []).map((photoLink: AssetLink) => {
            const asset = response.includes?.Asset?.find(
              (a: ContentfulAsset) => a.sys.id === photoLink.sys.id
            ) || {
              sys: photoLink.sys,
              fields: { file: { url: 'https://via.placeholder.com/150' } },
            };
            return asset as Asset;
          });

          // Ensure name is a string
          const name = typeof response.fields.name === 'string' ? response.fields.name : 'Není název';

          const resolvedAlbum: Album = {
            sys: response.sys,
            fields: {
              name,
              photos,
            },
          };

          setAlbum(resolvedAlbum);
          setLoading(false);
        } catch (error: any) {
          console.error('Error fetching album:', error.message, error);
          setError('Nepodařilo se načíst album. Zkuste to prosím znovu.');
          setLoading(false);
        }
      }

      fetchAlbum();
    }
  }, [albumId]);

  if (loading) {
    return (
      <section className="section-spacing bg-musician-light flex items-center justify-center min-h-screen">
        <p className="text-center text-musician-dark">Načítám...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing bg-musician-light flex items-center justify-center min-h-screen">
        <p className="text-center text-red-600">{error}</p>
      </section>
    );
  }

  if (!album) {
    return (
      <section className="section-spacing bg-musician-light flex items-center justify-center min-h-screen">
        <p className="text-center text-musician-dark">Žádné album nenalezeno.</p>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-musician-light relative w-full overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0">
        <RandomBg avoidRefs={[]} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-musician-blue tracking-tight">
                {album.fields.name}
              </h1>
              <Link to="/" className="text-musician-blue hover:underline">
                &larr; Zpět na alba
              </Link>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.fields.photos.map((photo: Asset) => (
              <img
                key={photo.sys.id}
                src={photo.fields.file?.url || 'https://via.placeholder.com/150'}
                alt=""
                className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-80"
                onError={(e) => {
                  console.error('Image failed to load:', photo.fields.file?.url);
                  e.currentTarget.src = 'https://via.placeholder.com/150';
                }}
                onClick={() => setLightboxPhoto(photo)}
              />
            ))}
          </div>
        </div>
      </div>
      {lightboxPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxPhoto(null)}
        >
          <img
            src={lightboxPhoto.fields.file?.url || 'https://via.placeholder.com/150'}
            alt=""
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              console.error('Lightbox image failed to load:', lightboxPhoto.fields.file?.url);
              e.currentTarget.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
      )}
    </section>
  );
};

export default AlbumDetail;