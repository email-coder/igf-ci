import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Eye, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScrollSection from "@/components/ui/scroll-section";

interface Publication {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
  cover: string;
  description: string;
  downloadUrl: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Programme d'activités 2025",
    type: "Programme",
    date: "Janvier 2025",
    fileSize: "4.2 MB",
    cover: "/covers/cover-2025.jpg",
    description: "Orientations stratégiques et programme annuel de l'IGF pour l'année 2025, incluant les missions d'audit, d'inspection et de lutte contre la corruption.",
    downloadUrl: "/documents/programme-activites-2025.pdf",
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programme",
    date: "Janvier 2024",
    fileSize: "3.8 MB",
    cover: "/covers/cover-2024.jpg",
    description: "Plan stratégique et orientations pour les missions de l'IGF durant l'année 2024.",
    downloadUrl: "/documents/programme-activites-2024.pdf",
  },
  {
    id: 3,
    title: "Programme d'activités 2023",
    type: "Programme",
    date: "Janvier 2023",
    fileSize: "3.5 MB",
    cover: "/covers/cover-2023.jpg",
    description: "Programme annuel détaillant les activités de contrôle, d'audit et de lutte contre la fraude financière pour 2023.",
    downloadUrl: "/documents/programme-activites-2023.pdf",
  },
  {
    id: 4,
    title: "Programme d'activités 2022",
    type: "Programme",
    date: "Janvier 2022",
    fileSize: "2.4 MB",
    cover: "/covers/cover-2022.jpg",
    description: "Bilan et programme des activités de l'Inspection Générale des Finances au titre de la gestion 2022.",
    downloadUrl: "/documents/programme-activites-2022.pdf",
  },
];

const PublicationsSection = () => {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  return (
    <section className="py-12 md:py-16 bg-section-light">
      <div className="container">
        <ScrollSection>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">
                Ressources
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-2">Publications</h2>
            </div>
            <Link
              to="/publications"
              className="hidden md:inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Toutes les publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollSection>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {publications.map((pub) => (
            <ScrollSection key={pub.id} delay={pub.id * 100} className="group">
              <div className="bg-background border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-1 rounded-lg">
                {/* Cover image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={pub.cover}
                    alt={pub.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPub(pub); }}
                      className="p-3 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg"
                      title="Aperçu"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <a
                      href={pub.downloadUrl}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors shadow-lg"
                      title="Télécharger"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  </div>
                  {/* Type badge */}
                  <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider rounded">
                    {pub.type}
                  </span>
                </div>
                {/* Content */}
                <div className="p-4">
                  <h4 className="font-heading text-sm md:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {pub.date} • {pub.fileSize}
                  </p>
                </div>
              </div>
            </ScrollSection>
          ))}
        </div>

        <ScrollSection className="mt-6 text-center md:hidden">
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Toutes les publications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollSection>
      </div>

      {/* Publication Preview Dialog */}
      <Dialog open={!!selectedPub} onOpenChange={() => setSelectedPub(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPub && (
            <>
              <DialogHeader>
                <span className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                  {selectedPub.type}
                </span>
                <DialogTitle className="font-heading text-2xl">
                  {selectedPub.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-[3/4] overflow-hidden bg-muted rounded-lg border border-border">
                  <img
                    src={selectedPub.cover}
                    alt={selectedPub.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    {selectedPub.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedPub.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taille</span>
                      <span className="font-medium">{selectedPub.fileSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Format</span>
                      <span className="font-medium">PDF</span>
                    </div>
                  </div>
                  <a href={selectedPub.downloadUrl} download>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger le document
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PublicationsSection;
