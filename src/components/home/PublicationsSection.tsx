import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download } from "lucide-react";

interface Publication {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Rapport d'activités 2023",
    type: "Rapport annuel",
    date: "Mars 2024",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Programme d'activités 2024",
    type: "Programme",
    date: "Janvier 2024",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    title: "Guide de la lutte contre la corruption",
    type: "Guide",
    date: "Décembre 2023",
    fileSize: "3.1 MB",
  },
  {
    id: 4,
    title: "Charte qualité de l'IGF",
    type: "Document officiel",
    date: "Novembre 2023",
    fileSize: "890 KB",
  },
];

const PublicationsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-section-light">
      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="flex items-start gap-4 p-6 bg-background border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {pub.type}
                </span>
                <h4 className="font-heading text-lg mt-1 mb-1 truncate group-hover:text-primary transition-colors">
                  {pub.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {pub.date} • {pub.fileSize}
                </p>
              </div>
              <button className="flex-shrink-0 p-2 bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/publications"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Toutes les publications
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
