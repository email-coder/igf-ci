import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import actuCooperationBenin from "@/assets/actu-cooperation-benin.png";
import actuFormationEvaluation from "@/assets/actu-formation-evaluation.png";
import actuVoyageMaroc from "@/assets/actu-voyage-maroc.png";
import actuAuditPtua from "@/assets/actu-audit-ptua.png";
import motifIGF from "@/assets/motif-igf.png";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Coopération avec l'Inspecteur Général des Finances du Bénin",
    excerpt: "Madame l'Inspecteur Général des Finances a eu une séance de travail avec son homologue du Bénin pour renforcer la coopération entre les deux institutions.",
    date: "8 octobre 2024",
    image: actuCooperationBenin,
    category: "Coopération",
    slug: "cooperation-benin",
  },
  {
    id: 2,
    title: "Formation des agents à l'évaluation des politiques publiques",
    excerpt: "Vingt-six cadres de l'IGF ont été formés sur l'évaluation des politiques publiques du 28 octobre au 8 novembre 2024.",
    date: "13 novembre 2024",
    image: actuFormationEvaluation,
    category: "Formation",
    slug: "formation-evaluation-politiques",
  },
  {
    id: 3,
    title: "Voyage d'études au Maroc des responsables des organes de contrôle",
    excerpt: "Une délégation s'est rendue à Rabat du 14 au 18 octobre 2024 dans le cadre du Schéma Directeur de la Réforme des Finances Publiques.",
    date: "25 octobre 2024",
    image: actuVoyageMaroc,
    category: "Coopération",
    slug: "voyage-etudes-maroc",
  },
  {
    id: 4,
    title: "Projet PTUA : Audit des échangeurs du boulevard Mitterrand",
    excerpt: "Mission d'audit des activités de construction des échangeurs du boulevard Mitterrand dans le cadre du Projet de Transport Urbain d'Abidjan.",
    date: "2 octobre 2024",
    image: actuAuditPtua,
    category: "Mission",
    slug: "audit-ptua",
  },
];

const NewsSection = () => {
  const featuredNews = newsItems[0];
  const otherNews = newsItems.slice(1);

  return (
    <section className="py-16 md:py-20 bg-muted relative overflow-hidden">
      {/* Motif background subtil */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Actualités
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mt-2 text-foreground">À la une</h2>
          </div>
          <Link
            to="/actualites"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured news */}
          <Link to={`/actualites/${featuredNews.slug}`} className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider mb-3 rounded">
                {featuredNews.category}
              </span>
              <h3 className="font-heading text-2xl mb-3 group-hover:text-primary transition-colors text-foreground">
                {featuredNews.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {featuredNews.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {featuredNews.date}
              </div>
            </div>
          </Link>

          {/* Other news */}
          <div className="space-y-4">
            {otherNews.map((news) => (
              <Link
                key={news.id}
                to={`/actualites/${news.slug}`}
                className="flex gap-4 group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-3"
              >
                <div className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 py-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {news.category}
                  </span>
                  <h4 className="font-heading text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {news.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
