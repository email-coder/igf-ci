import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Download, Filter, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import motifIGF from "@/assets/motif-igf-bande.png";

const categories = ["Tous", "Rapports", "Programmes", "Textes officiels", "Guides"];

const publications = [
  {
    id: 1,
    title: "Rapport d'activités 2023",
    type: "Rapports",
    date: "Mars 2024",
    fileSize: "2.4 MB",
    description: "Bilan complet des activités de l'IGF pour l'année 2023.",
    cover: "📊",
    pages: 85,
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programmes",
    date: "Janvier 2024",
    fileSize: "1.8 MB",
    description: "Objectifs et plan d'action de l'IGF pour 2024.",
    cover: "📋",
    pages: 45,
  },
  {
    id: 3,
    title: "Décret n°99-599 du 13 octobre 1999",
    type: "Textes officiels",
    date: "Octobre 1999",
    fileSize: "450 KB",
    description: "Attributions, organisation et fonctionnement de l'IGF.",
    cover: "📜",
    pages: 12,
  },
  {
    id: 4,
    title: "Décret N°2014-863",
    type: "Textes officiels",
    date: "Décembre 2014",
    fileSize: "320 KB",
    description: "Rattachement de l'IGF au Premier Ministre.",
    cover: "📜",
    pages: 8,
  },
  {
    id: 5,
    title: "Guide de la lutte contre la corruption",
    type: "Guides",
    date: "Décembre 2023",
    fileSize: "3.1 MB",
    description: "Manuel pratique pour la prévention et la détection de la corruption.",
    cover: "📕",
    pages: 120,
  },
  {
    id: 6,
    title: "Charte qualité de l'IGF",
    type: "Guides",
    date: "Novembre 2023",
    fileSize: "890 KB",
    description: "Engagements qualité de l'Inspection Générale des Finances.",
    cover: "📗",
    pages: 32,
  },
  {
    id: 7,
    title: "Rapport d'activités 2022",
    type: "Rapports",
    date: "Mars 2023",
    fileSize: "2.1 MB",
    description: "Bilan complet des activités de l'IGF pour l'année 2022.",
    cover: "📊",
    pages: 78,
  },
  {
    id: 8,
    title: "Décret n°2015-475",
    type: "Textes officiels",
    date: "Juillet 2015",
    fileSize: "380 KB",
    description: "Procédures de gestion des projets financés par les PTFs.",
    cover: "📜",
    pages: 15,
  },
];

interface Publication {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
  description: string;
  cover: string;
  pages: number;
}

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

      {/* Header avec motif */}
      <div className="bg-section-dark text-hero-foreground py-16 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
          style={{
            backgroundImage: `url(${motifIGF})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        />
        <div className="container relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            Publications
          </h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Consultez et téléchargez nos rapports, programmes et textes officiels
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar filters */}
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

          {/* Publications list */}
          <div className="lg:col-span-3">
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredPublications.length} publication(s) trouvée(s)
            </div>
            <div className="space-y-4">
              {filteredPublications.map((pub, index) => (
                <div
                  key={pub.id}
                  className="flex items-start gap-4 p-6 bg-background border border-border hover:border-primary/30 transition-all group rounded-lg hover:shadow-lg animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedPublication(pub)}
                >
                  <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl rounded border border-border">
                    {pub.cover}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      {pub.type}
                    </span>
                    <h4 className="font-heading text-lg mt-1 mb-1 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {pub.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pub.date} • {pub.fileSize} • {pub.pages} pages
                    </p>
                  </div>
                  <button 
                    className="flex-shrink-0 p-3 bg-muted hover:bg-primary hover:text-primary-foreground transition-all rounded group-hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPublication(pub);
                    }}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Publication Preview Modal */}
      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{selectedPublication?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {/* Document cover preview */}
            <div className="bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-8 rounded-lg mb-6 flex items-center justify-center min-h-[200px] border border-border">
              <div className="text-center">
                <span className="text-6xl block mb-4">{selectedPublication?.cover}</span>
                <p className="font-heading text-xl text-foreground">{selectedPublication?.title}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedPublication?.type} • {selectedPublication?.date}
                </p>
              </div>
            </div>

            {/* Document details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">Type de document</span>
                <span className="font-medium">{selectedPublication?.type}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">Date de publication</span>
                <span className="font-medium">{selectedPublication?.date}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">Taille du fichier</span>
                <span className="font-medium">{selectedPublication?.fileSize}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">Nombre de pages</span>
                <span className="font-medium">{selectedPublication?.pages} pages</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedPublication?.description}
              </p>
            </div>

            {/* Download button */}
            <Button className="w-full gap-2 py-6 text-lg" size="lg">
              <Download className="h-5 w-5" />
              Télécharger le document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Publications;