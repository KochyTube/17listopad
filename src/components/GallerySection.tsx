import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Album, AssetLink, Asset } from '../types';
import Client from '@/client';
import RandomBg from './ui/RandomBg';

const GallerySection: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        console.log('Fetching albums from Contentful...');
        const response = await Client.getEntries({ content_type: 'gallery', include: 2 });
        console.log('Contentful response:', response);

        // Resolve asset links to actual assets
        const resolvedAlbums: Album[] = response.items.map((item: any) => {
          const photos = (item.fields.photos || []).map((photoLink: AssetLink) => {
            const asset = response.includes?.Asset?.find(
              (a: Asset) => a.sys.id === photoLink.sys.id
            ) || {
              sys: photoLink.sys,
              fields: { file: { url: 'https://via.placeholder.com/150' } },
            };
            return asset;
          });
          return {
            sys: item.sys,
            fields: {
              name: item.fields.name || 'Unnamed Album',
              photos,
            },
          };
        });

        setAlbums(resolvedAlbums);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching albums:', error.message, error);
        setError('Nepodařilo se načíst alba. Zkuste to prosím znovu.');
        setLoading(false);
      }
    }

    fetchAlbums();
  }, []);

  if (loading) {
    return <p className="text-center text-musician-dark">Načítám...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (albums.length === 0) {
    return <p className="text-center text-musician-dark">Žádná alba nenalezena.</p>;
  }

  return (
    <section
      id="gallery"
      className="section-spacing bg-musician-light relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <RandomBg avoidRefs={[]} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-musician-blue mb-6 text-center tracking-tight">
            Fotoalba
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link
                key={album.sys.id}
                to={`/album/${album.sys.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-2 gap-2 p-4">
                  {album.fields.photos.slice(0, 4).map((photo: Asset) => (
                    <img
                      key={photo.sys.id}
                      src={photo.fields.file?.url || 'https://via.placeholder.com/150'}
                      alt=""
                      className="w-full h-24 object-cover rounded"
                      onError={(e) => {
                        console.error('Image failed to load:', photo.fields.file?.url);
                        e.currentTarget.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  ))}
                </div>
                <h3 className="p-4 text-lg font-semibold text-musician-dark">
                  {album.fields.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;