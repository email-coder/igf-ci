import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import actuCooperationBenin from "@/assets/actu-cooperation-benin.png";
import actuFormationEvaluation from "@/assets/actu-formation-evaluation.png";
import actuVoyageMaroc from "@/assets/actu-voyage-maroc.png";
import actuAuditPtua from "@/assets/actu-audit-ptua.png";

const categories = ["Toutes", "Événement", "Formation", "Coopération", "Partenariat", "Mission"];

const allNews = [
  {
    id: 1,
    title: "Coopération avec l'Inspecteur Général des Finances du Bénin",
    excerpt: "Madame l'Inspecteur Général des Finances a eu une séance de travail avec son homologue du Bénin pour renforcer la coopération.",
    content: "Madame l'Inspecteur Général des Finances, Marie Hélène SARASSORO épse FADIGA, a eu une séance de travail avec son homologue du Bénin...",
    date: "8 octobre 2024",
    image: actuCooperationBenin,
    category: "Coopération",
    slug: "cooperation-benin",
  },
  {
    id: 2,
    title: "Préparation des agents à l'évaluation des politiques publiques",
    excerpt: "Vingt-six cadres de l'IGF ont été formés sur l'évaluation des politiques publiques du 28 octobre au 8 novembre 2024.",
    content: "Vingt-six cadres de l'Inspection Générale des Finances ont été formés, du 28 octobre au 8 novembre 2024, sur l'évaluation des politiques publiques à IVOTEL Plateau.",
    date: "13 novembre 2024",
    image: actuFormationEvaluation,
    category: "Formation",
    slug: "formation-evaluation-politiques",
  },
  {
    id: 3,
    title: "Voyage d'études au Maroc des responsables des organes de contrôle",
    excerpt: "Une délégation s'est rendue à Rabat du 14 au 18 octobre 2024 dans le cadre du SDRFP.",
    content: "Le Gouvernement ivoirien a adopté en juin 2022, le Schéma Directeur de la Réforme des Finances Publiques (SDRFP) 2022-2024.",
    date: "25 octobre 2024",
    image: actuVoyageMaroc,
    category: "Coopération",
    slug: "voyage-etudes-maroc",
  },
  {
    id: 4,
    title: "Projet PTUA : Audit des échangeurs du boulevard Mitterrand",
    excerpt: "Mission d'audit des activités de construction des échangeurs du boulevard Mitterrand.",
    content: "La Côte d'Ivoire a signé, le 29 décembre 2016 des Accords de Financement avec la BAD...",
    date: "2 octobre 2024",
    image: actuAuditPtua,
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
