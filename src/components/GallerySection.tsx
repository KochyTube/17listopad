import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Client from "@/client";
import RandomBg from "./ui/RandomBg"; // Assuming RandomBg is available
import Navbar from "@/components/Navbar";

interface Gallery {
  sys: { id: string };
  fields: {
    name?: string;
    photos?: { fields: { file: { url: string }; title?: string } }[];
  };
}

function GallerySection() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await Client.getEntries({ content_type: "gallery" });
        setGalleries(response.items as Gallery[]);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center text-musician-dark">
        Načítání...
      </div>
    );
  }

  return (
    <section
      id="gallery"
      className="section-spacing bg-musician-blue relative w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <RandomBg avoidRefs={[]} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight text-musician-light">
            Galerie
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {galleries.map((gallery) => (
              <Link
                key={gallery.sys.id}
                to={`/gallery/${gallery.sys.id}`}
                className="group rounded-2xl overflow-hidden bg-musician-light text-musician-dark"
              >
                <div className="relative w-full h-64">
                  {gallery.fields.photos?.[0]?.fields?.file?.url && (
                    <img
                      src={`https:${gallery.fields.photos[0].fields.file.url}`}
                      alt={gallery.fields.name || "Galerie"}
                      className="object-cover w-full h-full group-hover:opacity-80 transition-opacity"
                    />
                  )}
                  <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
                    {gallery.fields.name || "Bez názvu"}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;