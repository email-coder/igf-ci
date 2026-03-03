import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import actuAudit from "@/assets/actu-audit-ptua.png";
import actuCoop from "@/assets/actu-cooperation-benin.png";
import actuFormation from "@/assets/actu-formation-evaluation.png";
import actuMaroc from "@/assets/actu-voyage-maroc.png";
import heroAbidjan from "@/assets/hero-abidjan.jpg";
import heroAbidjan2 from "@/assets/hero-abidjan-2.webp";
import heroAbidjan3 from "@/assets/hero-abidjan-3.jpg";
import inspectrice from "@/assets/inspectrice-generale.png";

interface Photo {
  id: number;
  src: string;
  title: string;
  date: string;
  year: number;
  category: string;
}

const photos: Photo[] = [
  { id: 1, src: actuCoop, title: "Coopération avec le Bénin", date: "23 Janvier 2026", year: 2026, category: "Coopération" },
  { id: 2, src: actuAudit, title: "Audit du PTUA", date: "15 Janvier 2026", year: 2026, category: "Missions" },
  { id: 3, src: actuMaroc, title: "Voyage d'études au Maroc", date: "08 Janvier 2026", year: 2026, category: "Formation" },
  { id: 4, src: actuFormation, title: "Formation en évaluation", date: "02 Janvier 2026", year: 2026, category: "Formation" },
  { id: 5, src: inspectrice, title: "Inspectrice Générale des Finances", date: "Décembre 2025", year: 2025, category: "Direction" },
  { id: 6, src: heroAbidjan, title: "Quartier des affaires - Abidjan", date: "Novembre 2025", year: 2025, category: "Institutions" },
  { id: 7, src: heroAbidjan2, title: "Vue panoramique d'Abidjan", date: "Octobre 2025", year: 2025, category: "Institutions" },
  { id: 8, src: heroAbidjan3, title: "Plateau - Centre des affaires", date: "Septembre 2025", year: 2025, category: "Institutions" },
];

const years = [...new Set(photos.map(p => p.year))].sort((a, b) => b - a);
const categories = ["Tous", ...new Set(photos.map(p => p.category))];

const Galerie = () => {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [animDirection, setAnimDirection] = useState<"left" | "right" | null>(null);

  const filteredPhotos = photos.filter(photo => {
    const matchYear = selectedYear === "all" || photo.year === selectedYear;
    const matchCategory = selectedCategory === "Tous" || photo.category === selectedCategory;
    return matchYear && matchCategory;
  });

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;

  const navigatePhoto = useCallback((direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const idx = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const newIndex = direction === "prev"
      ? (idx - 1 + filteredPhotos.length) % filteredPhotos.length
      : (idx + 1) % filteredPhotos.length;
    setAnimDirection(direction === "prev" ? "right" : "left");
    setTimeout(() => {
      setSelectedPhoto(filteredPhotos[newIndex]);
      setAnimDirection(null);
    }, 150);
  }, [selectedPhoto, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigatePhoto("prev");
      if (e.key === "ArrowRight") navigatePhoto("next");
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedPhoto, navigatePhoto]);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Galerie photos</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">Galerie Photos</h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Retrouvez les moments forts de l'IGF en images
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container py-8">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Année :</span>
            <div className="flex gap-1">
              <button onClick={() => setSelectedYear("all")} className={`px-4 py-2 text-sm rounded transition-all ${selectedYear === "all" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>Toutes</button>
              {years.map(year => (
                <button key={year} onClick={() => setSelectedYear(year)} className={`px-4 py-2 text-sm rounded transition-all ${selectedYear === year ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>{year}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Catégorie :</span>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 text-sm rounded border border-border bg-background focus:border-primary outline-none">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={photo.src} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">{photo.category}</span>
                <h3 className="font-heading text-lg mt-1 group-hover:text-primary transition-colors line-clamp-1">{photo.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Aucune photo trouvée pour ces critères.
          </div>
        )}
      </div>

      {/* Lightbox Carousel */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20 hover:rotate-90 duration-300"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigatePhoto("prev"); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10 group"
          >
            <ArrowLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Navigation next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigatePhoto("next"); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10 group"
          >
            <ArrowRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Image with animation */}
          <div
            className={`max-w-5xl max-h-[85vh] px-4 transition-all duration-300 ${
              animDirection === "left" ? "opacity-0 -translate-x-8" :
              animDirection === "right" ? "opacity-0 translate-x-8" :
              "opacity-100 translate-x-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
            <div className="text-center mt-6 text-white">
              <h3 className="font-heading text-2xl">{selectedPhoto.title}</h3>
              <p className="text-white/60 mt-2">{selectedPhoto.date} • {selectedPhoto.category}</p>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 max-w-[90vw] overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {filteredPhotos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  photo.id === selectedPhoto.id
                    ? "border-primary scale-110 shadow-lg shadow-primary/30"
                    : "border-white/20 opacity-50 hover:opacity-80 hover:border-white/40"
                }`}
              >
                <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Galerie;
