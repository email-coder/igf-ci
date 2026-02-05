 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { ArrowRight, FileText, Download, Eye, X } from "lucide-react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import ScrollSection from "@/components/ui/scroll-section";

interface Publication {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
   cover?: string;
   description?: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Rapport d'activités 2023",
    type: "Rapport annuel",
    date: "Mars 2024",
    fileSize: "2.4 MB",
     cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop",
     description: "Bilan complet des activités de l'IGF pour l'année 2023, incluant les missions de contrôle réalisées, les recommandations émises et les résultats obtenus.",
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programme",
    date: "Janvier 2024",
    fileSize: "1.8 MB",
     cover: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=500&fit=crop",
     description: "Plan stratégique et orientations pour les missions de l'IGF durant l'année 2024.",
  },
  {
    id: 3,
    title: "Guide de la lutte contre la corruption",
    type: "Guide",
    date: "Décembre 2023",
    fileSize: "3.1 MB",
     cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=500&fit=crop",
     description: "Manuel pratique à destination des agents publics pour prévenir et détecter les actes de corruption.",
  },
  {
    id: 4,
    title: "Charte qualité de l'IGF",
    type: "Document officiel",
    date: "Novembre 2023",
    fileSize: "890 KB",
     cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
     description: "Engagement qualité de l'IGF définissant les standards d'excellence dans l'exercice des missions de contrôle.",
  },
];

const PublicationsSection = () => {
   const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
 
  return (
     <section className="py-16 md:py-20 bg-section-light">
      <div className="container">
         <ScrollSection>
           <div className="flex items-end justify-between mb-10">
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

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publications.map((pub) => (
             <ScrollSection
              key={pub.id}
               delay={pub.id * 100}
               className="group"
            >
               <div className="bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
                 {/* Cover image */}
                 <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                   {pub.cover ? (
                     <img
                       src={pub.cover}
                       alt={pub.title}
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-primary/10">
                       <FileText className="h-16 w-16 text-primary/30" />
                     </div>
                   )}
                   {/* Overlay on hover */}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                     <button
                       onClick={() => setSelectedPub(pub)}
                       className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
                       title="Aperçu"
                     >
                       <Eye className="h-5 w-5" />
                     </button>
                     <button
                       className="p-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                       title="Télécharger"
                     >
                       <Download className="h-5 w-5" />
                     </button>
                   </div>
                   {/* Type badge */}
                   <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider">
                     {pub.type}
                   </span>
                 </div>
                 {/* Content */}
                 <div className="p-4">
                   <h4 className="font-heading text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                     {pub.title}
                   </h4>
                   <p className="text-sm text-muted-foreground">
                     {pub.date} • {pub.fileSize}
                   </p>
                 </div>
              </div>
             </ScrollSection>
          ))}
        </div>

         <ScrollSection className="mt-8 text-center md:hidden">
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
                 {/* Cover */}
                 <div className="aspect-[3/4] overflow-hidden bg-muted rounded-lg">
                   {selectedPub.cover ? (
                     <img
                       src={selectedPub.cover}
                       alt={selectedPub.title}
                       className="w-full h-full object-cover"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-primary/10">
                       <FileText className="h-20 w-20 text-primary/30" />
                     </div>
                   )}
                 </div>
                 {/* Details */}
                 <div className="flex flex-col">
                   <p className="text-muted-foreground mb-4 flex-1">
                     {selectedPub.description || "Aucune description disponible pour ce document."}
                   </p>
                   <div className="space-y-3 mb-6">
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Date de publication</span>
                       <span className="font-medium">{selectedPub.date}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Taille du fichier</span>
                       <span className="font-medium">{selectedPub.fileSize}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Format</span>
                       <span className="font-medium">PDF</span>
                     </div>
                   </div>
                   <Button className="w-full">
                     <Download className="h-4 w-4 mr-2" />
                     Télécharger le document
                   </Button>
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
