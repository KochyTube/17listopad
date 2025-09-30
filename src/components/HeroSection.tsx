import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";

const carouselImages = [
  { url: "/portal.jpg", caption: "Poetický večer na Portálu" },
  { url: "/mir.jpg", caption: "Pařba na míru" },
  { url: "/debata.JPG", caption: "Tématické debaty" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalTime = 6000;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, intervalTime);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
    resetTimer();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    resetTimer();
  };

  return (
    <section id="domů" className="relative h-screen w-screen overflow-hidden">
      {/* Carousel Images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden={index !== currentSlide}
        />
      ))}

      {/* Obsah pro mobily */}
      <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-4 py-10 z-10 bg-black bg-opacity-40 backdrop-blur-md sm:hidden">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-auto max-w-[200px] mx-auto mb-8"
        />
        <h3 className="text-lg text-musician-light font-medium mb-6">
          {carouselImages[currentSlide].caption}
        </h3>
        <a
          href="#prihlaska"
          className="px-6 py-3 text-lg font-medium rounded-lg bg-musician-blue text-musician-light hover:bg-musician-blue-muted transition-all"
        >
          Program
        </a>
      </div>

      {/* Levá polovina (pouze pro větší obrazovky) */}
      <div className="hidden sm:flex absolute top-0 left-0 w-1/2 h-screen bg-black/50 bg-opacity-80 backdrop-blur-sm z-10 flex-col justify-between px-4 text-center">
        {/* Logo nahoře */}
        <div className="mt-20">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-auto max-w-[250px] sm:max-w-[500px] mx-auto"
          />
        </div>

        {/* Podnadpis + tlačítko dole */}
        <div className="mb-20">
          <h3 className="text-base sm:text-xl md:text-2xl text-musician-light font-medium mb-6">
            {carouselImages[currentSlide].caption}
          </h3>
          <a
            href="#prihlaska"
            className="px-6 sm:px-8 py-3 text-lg font-medium rounded-lg bg-musician-blue text-musician-light hover:bg-musician-blue-muted transition-all"
          >
            Program
          </a>
        </div>
      </div>

      {/* Pravá polovina (jen na větších obrazovkách) */}
      <div className="hidden sm:block absolute top-0 left-1/2 w-1/2 h-screen z-0"></div>

      {/* Slide indikátor + šipka dolů */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 space-y-4">
        {/* Slide indikátory */}
        <div className="flex justify-center space-x-2 mb-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-musician-light"
                  : "w-2 bg-musician-light bg-opacity-60"
              } hover:bg-opacity-100`}
              aria-label={`Přejít na slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>

        {/* Šipka dolů */}
        <a href="#next-section" className="animate-bounce text-musician-light">
          <ChevronsDown size={28} />
        </a>
      </div>

      {/* Šipky pro přepínání slidů */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 z-20 text-musician-light hover:text-musician-blue transition-all"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 z-20 text-musician-light hover:text-musician-blue transition-all"
      >
        <ChevronRight size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
