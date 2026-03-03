import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Download, Filter, Eye, Calendar } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const categories = ["Tous", "Programmes", "Rapports", "Textes officiels", "Guides"];

interface Publication {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
  description: string;
  cover: string;
  pages: number;
  downloadUrl: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Programme d'activités 2025",
    type: "Programmes",
    date: "Janvier 2025",
    fileSize: "4.2 MB",
    description: "Orientations stratégiques et programme annuel de l'IGF pour l'année 2025.",
    cover: "/covers/cover-2025.jpg",
    pages: 40,
    downloadUrl: "/documents/programme-activites-2025.pdf",
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programmes",
    date: "Janvier 2024",
    fileSize: "3.8 MB",
    description: "Plan stratégique et orientations pour les missions de l'IGF durant l'année 2024.",
    cover: "/covers/cover-2024.jpg",
    pages: 38,
    downloadUrl: "/documents/programme-activites-2024.pdf",
  },
  {
    id: 3,
    title: "Programme d'activités 2023",
    type: "Programmes",
    date: "Janvier 2023",
    fileSize: "3.5 MB",
    description: "Programme annuel détaillant les activités de contrôle et d'audit pour 2023.",
    cover: "/covers/cover-2023.jpg",
    pages: 35,
    downloadUrl: "/documents/programme-activites-2023.pdf",
  },
  {
    id: 4,
    title: "Programme d'activités 2022",
    type: "Programmes",
    date: "Janvier 2022",
    fileSize: "2.4 MB",
    description: "Bilan et programme des activités de l'IGF au titre de la gestion 2022.",
    cover: "/covers/cover-2022.jpg",
    pages: 32,
    downloadUrl: "/documents/programme-activites-2022.pdf",
  },
  {
    id: 5,
    title: "Décret n°99-599 du 13 octobre 1999",
    type: "Textes officiels",
    date: "Octobre 1999",
    fileSize: "450 KB",
    description: "Attributions, organisation et fonctionnement de l'IGF.",
    cover: "",
    pages: 12,
    downloadUrl: "",
  },
  {
    id: 6,
    title: "Guide de la lutte contre la corruption",
    type: "Guides",
    date: "Décembre 2023",
    fileSize: "3.1 MB",
    description: "Manuel pratique pour la prévention et la détection de la corruption.",
    cover: "",
    pages: 120,
    downloadUrl: "",
  },
];

const Publications = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const filteredPublications = selectedCategory === "Tous"
    ? publications
    : publications.filter(pub => pub.type === selectedCategory);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Publications</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">Publications</h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Consultez et téléchargez nos rapports, programmes et textes officiels
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-card border border-border p-6 rounded-lg shadow-sm">
              <h3 className="font-heading text-lg mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Catégories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 text-sm transition-all rounded ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:translate-x-1"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Publications grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredPublications.length} publication(s) trouvée(s)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPublications.map((pub, index) => (
                <div
                  key={pub.id}
                  className="group bg-background border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => setSelectedPublication(pub)}
                >
                  {/* Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    {pub.cover ? (
                      <img
                        src={pub.cover}
                        alt={pub.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-6">
                        <FileText className="h-16 w-16 text-primary/30 mb-3" />
                        <p className="text-sm text-center text-muted-foreground font-heading">{pub.title}</p>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                      <button className="p-3 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                        <Eye className="h-5 w-5" />
                      </button>
                      {pub.downloadUrl && (
                        <a
                          href={pub.downloadUrl}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors shadow-lg"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider rounded">
                      {pub.type}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-heading text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3" />
                      {pub.date} • {pub.fileSize}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Publication Preview Modal */}
      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPublication && (
            <>
              <DialogHeader>
                <span className="text-xs font-medium uppercase tracking-wider text-primary mb-1">{selectedPublication.type}</span>
                <DialogTitle className="font-heading text-2xl">{selectedPublication.title}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-[3/4] overflow-hidden bg-muted rounded-lg border border-border">
                  {selectedPublication.cover ? (
                    <img src={selectedPublication.cover} alt={selectedPublication.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <FileText className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">{selectedPublication.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm border-b border-border pb-2">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedPublication.date}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-border pb-2">
                      <span className="text-muted-foreground">Taille</span>
                      <span className="font-medium">{selectedPublication.fileSize}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-border pb-2">
                      <span className="text-muted-foreground">Pages</span>
                      <span className="font-medium">{selectedPublication.pages} pages</span>
                    </div>
                  </div>
                  {selectedPublication.downloadUrl ? (
                    <a href={selectedPublication.downloadUrl} download>
                      <Button className="w-full gap-2" size="lg">
                        <Download className="h-5 w-5" />
                        Télécharger
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full gap-2" size="lg" disabled>
                      <Download className="h-5 w-5" />
                      Bientôt disponible
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Publications;
