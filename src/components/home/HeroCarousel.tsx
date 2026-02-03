import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/hero-abidjan.jpg";
import heroImage2 from "@/assets/hero-abidjan-2.webp";
import heroImage3 from "@/assets/hero-abidjan-3.jpg";
import motifIGF from "@/assets/motif-igf-bande.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkText: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Inspection Générale des Finances",
    subtitle: "Bienvenue sur le site officiel",
    description: "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière",
    link: "/presentation",
    linkText: "Découvrir l'IGF",
    image: heroImage1,
  },
  {
    id: 2,
    title: "Contrôle des Finances Publiques",
    subtitle: "Notre mission",
    description: "Assurer la transparence et la probité dans la gestion des finances publiques au service de l'intérêt général",
    link: "/missions",
    linkText: "Nos missions",
    image: heroImage2,
  },
  {
    id: 3,
    title: "Lutte contre la Corruption",
    subtitle: "Engagement citoyen",
    description: "La Brigade de Lutte contre la Corruption œuvre pour une administration publique intègre et transparente",
    link: "/missions/lutte-corruption",
    linkText: "En savoir plus",
    image: heroImage3,
  },
  {
    id: 4,
    title: "Excellence et Professionnalisme",
    subtitle: "Nos valeurs",
    description: "L'IGF s'engage à maintenir les plus hauts standards de qualité dans l'exercice de ses missions de contrôle et d'audit",
    link: "/presentation",
    linkText: "Nos valeurs",
    image: heroImage1,
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const handleSlideChange = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (index: number) => handleSlideChange(index);
  const prevSlide = () => handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  const nextSlide = () => handleSlideChange((currentSlide + 1) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Background image */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}
      
      {/* Motif pattern overlay */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-3xl text-white">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ease-out ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 absolute pointer-events-none"
              }`}
            >
              {index === currentSlide && (
                <>
                  {/* Subtitle badge */}
                  <span 
                    className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider mb-6 animate-slide-up"
                    style={{ animationDelay: "100ms" }}
                  >
                    {slide.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h1 
                    className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight animate-slide-up"
                    style={{ animationDelay: "200ms" }}
                  >
                    {slide.title}
                  </h1>
                  
                  {/* Description */}
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 mb-8 max-w-2xl leading-relaxed animate-slide-up"
                    style={{ animationDelay: "300ms" }}
                  >
                    {slide.description}
                  </p>
                  
                  {/* CTA Button */}
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 font-medium uppercase tracking-wider transition-all duration-300 group animate-slide-up hover:scale-105"
                    style={{ animationDelay: "400ms" }}
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

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0">
        <div className="container flex items-center justify-between">
          {/* Navigation buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={prevSlide}
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
              aria-label="Slide précédente"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Lecture"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={nextSlide}
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110"
              aria-label="Slide suivante"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Slide dots */}
            <div className="hidden md:flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2">
              <span className="text-white font-heading text-xl md:text-2xl">
                {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <div className="w-12 md:w-16 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
              <span className="text-white/50 text-xs md:text-sm">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </section>
  );
};

export default HeroCarousel;