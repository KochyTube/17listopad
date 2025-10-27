import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Client from "@/client";
import Navbar from "@/components/Navbar2";
import Footer from "@/components/Footer";

interface Gallery {
  sys: { id: string };
  fields: {
    name?: string;
    photos?: {
      fields: {
        file: { url: string };
      };
    }[];
  };
}

function Gallery() {
  const { id } = useParams<{ id: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await Client.getEntry(id!);
        setGallery(response as Gallery);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-musician-blue text-musician-light">
        Načítání...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-musician-blue text-red-500">
        Galerie nenalezena
      </div>
    );
  }

  const photos = gallery.fields.photos?.map((photo) => ({
    src: `https:${photo.fields.file.url}`,
  })) || [];

  return (
    // Hlavní layout: flex, min-h-screen
    <div className="flex flex-col min-h-screen bg-musician-light">
      <Navbar />

      {/* Hlavní obsah – roste podle potřeby */}
      <main className="mt-10 flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-block mb-6 bg-musician-blue text-musician-light py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            Zpět
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight text-musician-blue">
            {gallery.fields.name || "Galerie"}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-musician-light shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <img
                  src={photo.src}
                  alt={`Fotka ${index + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer přilepený dole */}
      // Footer přilepený dole
      <div className="mt-auto">
        <Footer />
      </div>


      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={photos}
          index={photoIndex}
          controller={{ closeOnBackdropClick: true }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
        />
      )}
    </div>
  );
}

export default Gallery;