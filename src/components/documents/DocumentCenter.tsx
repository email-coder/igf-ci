import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Download,
  Calendar,
  Folder,
  ChevronRight,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  date: string;
  size: string;
  downloadUrl?: string;
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
  },
  {
    id: "2",
    title: "Rapport d'activités 2023",
    description: "Synthèse des activités de l'IGF pour l'exercice 2023",
    category: "Rapports d'activités",
    type: "PDF",
    date: "2023-12-31",
    size: "2.1 MB",
  },
  {
    id: "3",
    title: "Programme de travail 2025",
    description: "Orientations stratégiques et programme annuel de l'IGF pour 2025",
    category: "Programmes",
    type: "PDF",
    date: "2025-01-01",
    size: "1.2 MB",
  },
  {
    id: "4",
    title: "Décret portant organisation de l'IGF",
    description: "Texte officiel définissant les attributions et l'organisation de l'IGF",
    category: "Textes officiels",
    type: "PDF",
    date: "2020-06-15",
    size: "450 KB",
  },
  {
    id: "5",
    title: "Code de déontologie de l'inspecteur",
    description: "Règles et principes éthiques régissant la fonction d'inspecteur des finances",
    category: "Textes officiels",
    type: "PDF",
    date: "2019-03-20",
    size: "320 KB",
  },
  {
    id: "6",
    title: "Guide méthodologique de l'audit",
    description: "Manuel de procédures pour la conduite des missions d'audit",
    category: "Guides & Manuels",
    type: "PDF",
    date: "2022-09-10",
    size: "1.8 MB",
  },
  {
    id: "7",
    title: "Loi de finances 2025",
    description: "Texte de la loi de finances pour l'année budgétaire 2025",
    category: "Textes officiels",
    type: "PDF",
    date: "2024-12-20",
    size: "5.2 MB",
  },
  {
    id: "8",
    title: "Formulaire de plainte",
    description: "Modèle de formulaire pour le dépôt de plainte auprès de la BLC",
    category: "Formulaires",
    type: "DOCX",
    date: "2024-01-15",
    size: "85 KB",
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filteredDocuments = useMemo(() => {
    let docs = [...sampleDocuments];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "Tous les documents") {
      docs = docs.filter((doc) => doc.category === selectedCategory);
    }

    // Sort
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
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl mb-4">
            Centre de Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Accédez à l'ensemble des documents officiels, rapports et publications de l'IGF
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8">
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
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                <Grid className="h-5 w-5" />
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

        {/* Documents list/grid */}
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded">
                      {doc.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
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
                  <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                    <Download className="h-5 w-5 text-primary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                    <Download className="h-5 w-5 text-primary" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded">
                    {doc.category}
                  </span>
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {doc.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(doc.date)}</span>
                  <span>{doc.type} • {doc.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <Folder className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              Aucun document trouvé
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCenter;
