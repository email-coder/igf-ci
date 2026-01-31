import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Download, Filter } from "lucide-react";
import { useState } from "react";

const categories = ["Tous", "Rapports", "Programmes", "Textes officiels", "Guides"];

const publications = [
  {
    id: 1,
    title: "Rapport d'activités 2023",
    type: "Rapports",
    date: "Mars 2024",
    fileSize: "2.4 MB",
    description: "Bilan complet des activités de l'IGF pour l'année 2023.",
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programmes",
    date: "Janvier 2024",
    fileSize: "1.8 MB",
    description: "Objectifs et plan d'action de l'IGF pour 2024.",
  },
  {
    id: 3,
    title: "Décret n°99-599 du 13 octobre 1999",
    type: "Textes officiels",
    date: "Octobre 1999",
    fileSize: "450 KB",
    description: "Attributions, organisation et fonctionnement de l'IGF.",
  },
  {
    id: 4,
    title: "Décret N°2014-863",
    type: "Textes officiels",
    date: "Décembre 2014",
    fileSize: "320 KB",
    description: "Rattachement de l'IGF au Premier Ministre.",
  },
  {
    id: 5,
    title: "Guide de la lutte contre la corruption",
    type: "Guides",
    date: "Décembre 2023",
    fileSize: "3.1 MB",
    description: "Manuel pratique pour la prévention et la détection de la corruption.",
  },
  {
    id: 6,
    title: "Charte qualité de l'IGF",
    type: "Guides",
    date: "Novembre 2023",
    fileSize: "890 KB",
    description: "Engagements qualité de l'Inspection Générale des Finances.",
  },
  {
    id: 7,
    title: "Rapport d'activités 2022",
    type: "Rapports",
    date: "Mars 2023",
    fileSize: "2.1 MB",
    description: "Bilan complet des activités de l'IGF pour l'année 2022.",
  },
  {
    id: 8,
    title: "Décret n°2015-475",
    type: "Textes officiels",
    date: "Juillet 2015",
    fileSize: "380 KB",
    description: "Procédures de gestion des projets financés par les PTFs.",
  },
];

const Publications = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredPublications = selectedCategory === "Tous"
    ? publications
    : publications.filter(pub => pub.type === selectedCategory);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Publications</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Publications
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Consultez et téléchargez nos rapports, programmes et textes officiels
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="font-heading text-lg mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Catégories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
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
              {filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="flex items-start gap-4 p-6 bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 flex items-center justify-center">
                    <FileText className="h-7 w-7 text-primary" />
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
                      {pub.date} • {pub.fileSize}
                    </p>
                  </div>
                  <button className="flex-shrink-0 p-3 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Publications;
