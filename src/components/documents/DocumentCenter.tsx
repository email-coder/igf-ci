import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Download,
  Calendar,
  Folder,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  X,
  Eye,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import motifIGF from "@/assets/motif-igf.png";

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  date: string;
  size: string;
  downloadUrl?: string;
  coverColor: string;
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Rapport d'activités 2024",
    description: "Bilan complet des missions de contrôle et d'audit réalisées durant l'année 2024",
    category: "Rapports d'activités",
    type: "PDF",
    date: "2024-12-31",
    size: "2.4 MB",
    coverColor: "bg-primary",
  },
  {
    id: "2",
    title: "Rapport d'activités 2023",
    description: "Synthèse des activités de l'IGF pour l'exercice 2023",
    category: "Rapports d'activités",
    type: "PDF",
    date: "2023-12-31",
    size: "2.1 MB",
    coverColor: "bg-primary",
  },
  {
    id: "3",
    title: "Programme de travail 2025",
    description: "Orientations stratégiques et programme annuel de l'IGF pour 2025",
    category: "Programmes",
    type: "PDF",
    date: "2025-01-01",
    size: "1.2 MB",
    coverColor: "bg-blue-600",
  },
  {
    id: "4",
    title: "Décret portant organisation de l'IGF",
    description: "Texte officiel définissant les attributions et l'organisation de l'IGF",
    category: "Textes officiels",
    type: "PDF",
    date: "2020-06-15",
    size: "450 KB",
    coverColor: "bg-amber-600",
  },
  {
    id: "5",
    title: "Code de déontologie de l'inspecteur",
    description: "Règles et principes éthiques régissant la fonction d'inspecteur des finances",
    category: "Textes officiels",
    type: "PDF",
    date: "2019-03-20",
    size: "320 KB",
    coverColor: "bg-amber-600",
  },
  {
    id: "6",
    title: "Guide méthodologique de l'audit",
    description: "Manuel de procédures pour la conduite des missions d'audit",
    category: "Guides & Manuels",
    type: "PDF",
    date: "2022-09-10",
    size: "1.8 MB",
    coverColor: "bg-purple-600",
  },
  {
    id: "7",
    title: "Loi de finances 2025",
    description: "Texte de la loi de finances pour l'année budgétaire 2025",
    category: "Textes officiels",
    type: "PDF",
    date: "2024-12-20",
    size: "5.2 MB",
    coverColor: "bg-red-600",
  },
  {
    id: "8",
    title: "Formulaire de plainte",
    description: "Modèle de formulaire pour le dépôt de plainte auprès de la BLC",
    category: "Formulaires",
    type: "DOCX",
    date: "2024-01-15",
    size: "85 KB",
    coverColor: "bg-teal-600",
  },
];

const categories = [
  "Tous les documents",
  "Rapports d'activités",
  "Programmes",
  "Textes officiels",
  "Guides & Manuels",
  "Formulaires",
];

type SortField = "title" | "date" | "size";
type SortOrder = "asc" | "desc";

const DocumentCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous les documents");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = useMemo(() => {
    let docs = [...sampleDocuments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "Tous les documents") {
      docs = docs.filter((doc) => doc.category === selectedCategory);
    }

    docs.sort((a, b) => {
      let comparison = 0;
      if (sortField === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === "size") {
        const parseSize = (size: string) => {
          const num = parseFloat(size);
          if (size.includes("MB")) return num * 1024;
          return num;
        };
        comparison = parseSize(a.size) - parseSize(b.size);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return docs;
  }, [searchQuery, selectedCategory, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 relative">
      {/* Motif background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="py-12 relative z-10">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Ressources
            </span>
            <h1 className="font-heading text-3xl md:text-4xl mt-2 text-foreground">
              Centre de Documentation
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Accédez à l'ensemble des documents officiels, rapports et publications de l'IGF
            </p>
          </div>

          {/* Search and filters */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un document..."
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* View mode */}
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm">
              <span className="text-muted-foreground">Trier par :</span>
              {[
                { field: "date" as SortField, label: "Date" },
                { field: "title" as SortField, label: "Titre" },
                { field: "size" as SortField, label: "Taille" },
              ].map(({ field, label }) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
                    sortField === field
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {label}
                  {sortField === field &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredDocuments.length} document(s) trouvé(s)
          </div>

          {/* Documents Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedDocument(doc)}
                >
                  {/* Cover */}
                  <div className={`${doc.coverColor} h-36 relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-14 w-14 text-white/30" />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-medium rounded">
                        {doc.type}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg mb-2 group-hover:text-primary transition-colors text-foreground line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(doc.date)}
                      </span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => setSelectedDocument(doc)}
                >
                  <div className={`${doc.coverColor} flex-shrink-0 p-4 rounded-lg`}>
                    <FileText className="h-8 w-8 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                        {doc.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {doc.type} • {doc.size}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {doc.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(doc.date)}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Aperçu
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <Folder className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-lg font-medium text-foreground">
                Aucun document trouvé
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Aperçu du document</DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6">
              {/* Cover Preview */}
              <div className={`${selectedDocument.coverColor} h-48 rounded-xl relative overflow-hidden`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <FileText className="h-14 w-14 mb-4 opacity-50" />
                  <h3 className="font-heading text-lg leading-tight">{selectedDocument.title}</h3>
                  <span className="mt-2 text-sm opacity-80">{selectedDocument.type} • {selectedDocument.size}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {selectedDocument.category}
                  </span>
                  <h3 className="font-heading text-xl mt-1 text-foreground">{selectedDocument.title}</h3>
                </div>

                <p className="text-muted-foreground">{selectedDocument.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedDocument.date)}
                  </span>
                  <span>{selectedDocument.size}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button className="flex-1 gap-2" size="lg">
                  <Download className="h-5 w-5" />
                  Télécharger
                </Button>
                <Button variant="outline" size="lg" onClick={() => setSelectedDocument(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentCenter;
