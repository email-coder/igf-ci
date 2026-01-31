import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

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
    title: "Départ à la retraite 2024 : l'IGF honore quatre de ses Agents",
    excerpt: "Admis à faire valoir leurs droits à la retraite en cette fin d'année 2024, quatre agents de l'IGF ont été honorés lors d'une cérémonie officielle.",
    date: "24 décembre 2024",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop",
    category: "Événement",
    slug: "depart-retraite-2024",
  },
  {
    id: 2,
    title: "Formation des agents à l'évaluation des politiques publiques",
    excerpt: "Vingt-six cadres de l'IGF ont été formés sur l'évaluation des politiques publiques du 28 octobre au 8 novembre 2024.",
    date: "13 novembre 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Formation",
    slug: "formation-evaluation-politiques",
  },
  {
    id: 3,
    title: "Voyage d'études au Maroc des responsables des organes de contrôle",
    excerpt: "Une délégation s'est rendue à Rabat du 14 au 18 octobre 2024 dans le cadre du Schéma Directeur de la Réforme des Finances Publiques.",
    date: "25 octobre 2024",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    category: "Coopération",
    slug: "voyage-etudes-maroc",
  },
  {
    id: 4,
    title: "Échange avec le programme GAVI sur la vaccination",
    excerpt: "Une délégation du programme GAVI a échangé avec l'IGF sur la mise en œuvre des activités de vaccination financées.",
    date: "29 octobre 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    category: "Partenariat",
    slug: "echange-programme-gavi",
  },
];

const NewsSection = () => {
  const featuredNews = newsItems[0];
  const otherNews = newsItems.slice(1);

  return (
    <section className="py-16 md:py-20 bg-section-light">
      <div className="container">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Actualités
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mt-2">À la une</h2>
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
          <Link to={`/actualites/${featuredNews.slug}`} className="news-card group">
            <div className="news-card-image aspect-[4/3]">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider mb-3">
                {featuredNews.category}
              </span>
              <h3 className="font-heading text-2xl mb-3 group-hover:text-primary transition-colors">
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
          <div className="space-y-6">
            {otherNews.map((news) => (
              <Link
                key={news.id}
                to={`/actualites/${news.slug}`}
                className="news-card flex gap-4 group"
              >
                <div className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0 overflow-hidden">
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
                  <h4 className="font-heading text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
