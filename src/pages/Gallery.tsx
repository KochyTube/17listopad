import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Client from "@/client";
import Navbar from "@/components/Navbar";
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
      <div className="container mx-auto py-12 text-center text-musician-dark">
        Načítání...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="container mx-auto py-12 text-center text-red-500">
        Galerie nenalezena
      </div>
    );
  }

  const photos = gallery.fields.photos?.map((photo) => ({
    src: `https:${photo.fields.file.url}`,
  })) || [];

  return (
    <section
      id="gallery-detail"
      className="section-spacing bg-musician-blue relative w-full overflow-hidden"
    >
        <Navbar />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="absolute top-4 left-4 bg-musician-light text-musician-dark py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            Zpět
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight text-musician-light">
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

          {isOpen && (
            <Lightbox
              open={isOpen}
              close={() => setIsOpen(false)}
              slides={photos}
              index={photoIndex}
              controller={{
                closeOnBackdropClick: true,
              }}
              styles={{
                container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                slide: { padding: "20px" },
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Gallery;