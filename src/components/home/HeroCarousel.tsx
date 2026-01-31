import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-igf.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Inspection Générale des Finances",
    subtitle: "Bienvenue sur le site officiel",
    description: "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière",
    link: "/presentation",
    linkText: "Découvrir l'IGF",
  },
  {
    id: 2,
    title: "Contrôle des Finances Publiques",
    subtitle: "Notre mission",
    description: "Assurer la transparence et la probité dans la gestion des finances publiques au service de l'intérêt général",
    link: "/missions",
    linkText: "Nos missions",
  },
  {
    id: 3,
    title: "Lutte contre la Corruption",
    subtitle: "Engagement citoyen",
    description: "La Brigade de Lutte contre la Corruption œuvre pour une administration publique intègre et transparente",
    link: "/missions/lutte-corruption",
    linkText: "En savoir plus",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="IGF Côte d'Ivoire"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-2xl text-hero-foreground">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 absolute"
              }`}
            >
              {index === currentSlide && (
                <>
                  <span className="inline-block px-4 py-1 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider mb-4">
                    {slide.subtitle}
                  </span>
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-igf-green-dark text-primary-foreground px-8 py-4 font-medium uppercase tracking-wider transition-all duration-300 group"
                  >
                    {slide.linkText}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container flex items-center justify-between">
          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="carousel-control"
              aria-label="Slide précédente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="carousel-control"
              aria-label={isPlaying ? "Pause" : "Lecture"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={nextSlide}
              className="carousel-control"
              aria-label="Slide suivante"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center gap-2">
            <span className="text-hero-foreground font-heading text-2xl">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <div className="w-24 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-white/50 text-sm">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
