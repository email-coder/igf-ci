import { useState, useEffect, useRef } from "react";
 import { Search, X, FileText, Newspaper, BookOpen, File, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: string;
  type: "article" | "document" | "page" | "publication";
  title: string;
  excerpt: string;
  url: string;
  date?: string;
}

// Données de recherche indexées (simulation d'un index de recherche)
const searchIndex: SearchResult[] = [
  {
    id: "1",
    type: "article",
    title: "Coopération IGF Côte d'Ivoire - Bénin",
    excerpt: "Renforcement des liens entre les inspections générales des finances des deux pays frères...",
    url: "/actualites/cooperation-benin",
    date: "15 Janvier 2025",
  },
  {
    id: "2",
    type: "article",
    title: "Audit du PTUA - Mission de vérification",
    excerpt: "L'IGF effectue une mission d'audit du Programme de Travaux d'Urgence et d'Assainissement...",
    url: "/actualites/audit-ptua",
    date: "10 Janvier 2025",
  },
  {
    id: "3",
    type: "article",
    title: "Voyage d'études au Maroc",
    excerpt: "Délégation de l'IGF en visite au Royaume du Maroc pour un échange d'expériences...",
    url: "/actualites/voyage-maroc",
    date: "5 Janvier 2025",
  },
  {
    id: "4",
    type: "document",
    title: "Rapport d'activités 2024",
    excerpt: "Bilan complet des missions de contrôle et d'audit réalisées durant l'année 2024...",
    url: "/publications/rapports",
    date: "2024",
  },
  {
    id: "5",
    type: "document",
    title: "Décret portant organisation de l'IGF",
    excerpt: "Texte officiel définissant les attributions et l'organisation de l'Inspection Générale des Finances...",
    url: "/publications/textes",
  },
  {
    id: "6",
    type: "page",
    title: "Présentation de l'IGF",
    excerpt: "Découvrez l'histoire, les missions et l'organisation de l'Inspection Générale des Finances...",
    url: "/presentation",
  },
  {
    id: "7",
    type: "page",
    title: "Missions de Contrôle",
    excerpt: "Le contrôle des finances publiques est au cœur des attributions de l'IGF...",
    url: "/missions/controle",
  },
  {
    id: "8",
    type: "page",
    title: "Lutte contre la Corruption",
    excerpt: "La Brigade de Lutte contre la Corruption œuvre pour une gestion transparente...",
    url: "/missions/lutte-corruption",
  },
  {
    id: "9",
    type: "publication",
    title: "Programme de travail 2025",
    excerpt: "Orientations stratégiques et programme annuel de l'Inspection Générale des Finances...",
    url: "/publications/programmes",
    date: "2025",
  },
  {
    id: "10",
    type: "page",
    title: "Déposer une plainte",
    excerpt: "Signaler des cas de corruption ou de mauvaise gestion des deniers publics...",
    url: "/plaintes",
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = searchIndex.filter((item) =>
      searchTerms.every(
        (term) =>
          item.title.toLowerCase().includes(term) ||
          item.excerpt.toLowerCase().includes(term)
      )
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return <Newspaper className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      case "publication":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return "Actualité";
      case "document":
        return "Document";
      case "publication":
        return "Publication";
      default:
        return "Page";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
         className="relative w-full max-w-2xl mx-4 bg-background rounded-lg shadow-2xl overflow-hidden"
        style={{
          animation: "scaleIn 0.2s ease-out forwards",
        }}
      >
         {/* Animated Bot */}
         <div className="absolute -top-12 right-4 hidden md:block">
           <div className="relative animate-bounce-subtle">
             <div className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg">
               <Bot className="h-6 w-6" />
             </div>
             <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary animate-pulse" />
           </div>
         </div>
 
        {/* Search input */}
        <div className="relative border-b border-border">
           <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <Search className="h-5 w-5 text-muted-foreground" />
           </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
             placeholder="Rechercher des documents, actualités..."
            className="w-full pl-12 pr-12 py-4 text-lg bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Aucun résultat pour "{query}"</p>
              <p className="text-sm mt-2">Essayez d'autres termes de recherche</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  to={result.url}
                  onClick={onClose}
                  className={`flex items-start gap-4 px-4 py-3 transition-colors ${
                    index === selectedIndex
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {getTypeLabel(result.type)}
                      </span>
                      {result.date && (
                        <span className="text-xs text-muted-foreground">
                          • {result.date}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground truncate">
                      {result.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {result.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.length < 2 && (
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Suggestions de recherche
              </p>
              <div className="flex flex-wrap gap-2">
                {["Rapport", "Audit", "Contrôle", "Corruption", "Mission"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-sm bg-accent hover:bg-accent/80 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
           <div className="flex items-center gap-4 flex-wrap">
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑↓</kbd> Navigation
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↵</kbd> Ouvrir
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Esc</kbd> Fermer
            </span>
          </div>
           <div className="flex items-center gap-2">
             <Bot className="h-3 w-3 text-primary" />
             <span>{results.length} résultat(s)</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
