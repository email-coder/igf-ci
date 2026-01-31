import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

const categories = ["Toutes", "Événement", "Formation", "Coopération", "Partenariat", "Mission"];

const allNews = [
  {
    id: 1,
    title: "Départ à la retraite 2024 : l'IGF honore quatre de ses Agents",
    excerpt: "Admis à faire valoir leurs droits à la retraite en cette fin d'année 2024, quatre agents de l'IGF ont été honorés lors d'une cérémonie officielle.",
    content: "Admis à faire valoir leurs droits à la retraite en cette fin d'année 2024, Mme BAROAN née CISSE Marie-Claude Brigitte, Chef de la Division I, Contrôle du bon Fonctionnement des...",
    date: "24 décembre 2024",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop",
    category: "Événement",
    slug: "depart-retraite-2024",
  },
  {
    id: 2,
    title: "Préparation des agents à l'évaluation des politiques publiques",
    excerpt: "Vingt-six cadres de l'IGF ont été formés sur l'évaluation des politiques publiques du 28 octobre au 8 novembre 2024.",
    content: "Vingt-six cadres de l'Inspection Générale des Finances ont été formés, du 28 octobre au 8 novembre 2024, sur l'évaluation des politiques publiques à IVOTEL Plateau.",
    date: "13 novembre 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Formation",
    slug: "formation-evaluation-politiques",
  },
  {
    id: 3,
    title: "Voyage d'études au Maroc des responsables des organes de contrôle",
    excerpt: "Une délégation s'est rendue à Rabat du 14 au 18 octobre 2024 dans le cadre du SDRFP.",
    content: "Le Gouvernement ivoirien a adopté en juin 2022, le Schéma Directeur de la Réforme des Finances Publiques (SDRFP) 2022-2024.",
    date: "25 octobre 2024",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    category: "Coopération",
    slug: "voyage-etudes-maroc",
  },
  {
    id: 4,
    title: "Échange avec le programme GAVI sur la vaccination",
    excerpt: "Une délégation du programme GAVI a échangé avec l'IGF sur les activités de vaccination.",
    content: "Dans le cadre de la mise en œuvre des activités de vaccination financées par GAVI...",
    date: "29 octobre 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    category: "Partenariat",
    slug: "echange-programme-gavi",
  },
  {
    id: 5,
    title: "Coopération avec l'Inspecteur Général des Finances du Bénin",
    excerpt: "Madame l'Inspecteur Général des Finances a eu une séance de travail avec son homologue du Bénin.",
    content: "Madame l'Inspecteur Général des Finances, Marie Hélène SARASSORO épse FADIGA, a eu une séance de travail...",
    date: "8 octobre 2024",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    category: "Coopération",
    slug: "cooperation-benin",
  },
  {
    id: 6,
    title: "Projet PTUA : Audit des échangeurs du boulevard Mitterrand",
    excerpt: "Mission d'audit des activités de construction des échangeurs du boulevard Mitterrand.",
    content: "La Côte d'Ivoire a signé, le 29 décembre 2016 des Accords de Financement avec la BAD...",
    date: "2 octobre 2024",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&h=400&fit=crop",
    category: "Mission",
    slug: "audit-ptua",
  },
];

const Actualites = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const filteredNews = selectedCategory === "Toutes" 
    ? allNews 
    : allNews.filter(news => news.category === selectedCategory);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Actualités</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Actualités
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Suivez les dernières nouvelles et activités de l'Inspection Générale des Finances
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Link
              key={news.id}
              to={`/actualites/${news.slug}`}
              className="news-card group"
            >
              <div className="news-card-image">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider mb-3">
                  {news.category}
                </span>
                <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {news.date}
                  </div>
                  <span className="flex items-center gap-1 text-primary font-medium group-hover:underline">
                    Lire <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Actualites;
