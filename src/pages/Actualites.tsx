import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Calendar, ArrowRight, ArrowLeft, Search, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import actuCooperationBenin from "@/assets/actu-cooperation-benin.png";
import actuFormationEvaluation from "@/assets/actu-formation-evaluation.png";
import actuVoyageMaroc from "@/assets/actu-voyage-maroc.png";
import actuAuditPtua from "@/assets/actu-audit-ptua.png";

const categories = ["Toutes", "Événement", "Formation", "Coopération", "Partenariat", "Mission"];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const allNews: Article[] = [
  {
    id: 1,
    title: "Coopération avec l'Inspecteur Général des Finances du Bénin",
    excerpt: "Madame l'Inspecteur Général des Finances a eu une séance de travail avec son homologue du Bénin pour renforcer la coopération entre les deux institutions.",
    content: `
      <p>Madame l'Inspecteur Général des Finances, Marie Hélène SARASSORO épse FADIGA, a eu une séance de travail avec son homologue du Bénin, Monsieur ADIMI Bio Tchané, dans le cadre du renforcement de la coopération bilatérale entre les deux institutions.</p>
      
      <h2>Objectifs de la rencontre</h2>
      <p>Cette rencontre avait pour objectifs principaux :</p>
      <ul>
        <li>Renforcer les liens institutionnels entre les deux IGF</li>
        <li>Partager les expériences et bonnes pratiques en matière de contrôle des finances publiques</li>
        <li>Explorer les possibilités de formation conjointe des inspecteurs</li>
        <li>Établir un cadre de coopération technique durable</li>
      </ul>
      
      <h2>Résultats de la coopération</h2>
      <p>À l'issue de cette séance de travail, les deux parties ont convenu de mettre en place un mécanisme d'échange régulier d'informations et d'expertise. Un protocole d'accord de coopération sera prochainement signé pour formaliser ce partenariat stratégique.</p>
      
      <p>Cette initiative s'inscrit dans la volonté du Gouvernement ivoirien de renforcer les capacités des institutions de contrôle à travers la coopération sous-régionale.</p>
    `,
    date: "8 octobre 2024",
    image: actuCooperationBenin,
    category: "Coopération",
    slug: "cooperation-benin",
  },
  {
    id: 2,
    title: "Préparation des agents à l'évaluation des politiques publiques",
    excerpt: "Vingt-six cadres de l'IGF ont été formés sur l'évaluation des politiques publiques du 28 octobre au 8 novembre 2024.",
    content: `
      <p>Vingt-six cadres de l'Inspection Générale des Finances ont été formés, du 28 octobre au 8 novembre 2024, sur l'évaluation des politiques publiques à IVOTEL Plateau.</p>
      
      <h2>Contexte de la formation</h2>
      <p>Cette formation s'inscrit dans le cadre du renforcement des capacités des inspecteurs de l'IGF, conformément aux orientations stratégiques de l'institution pour l'année 2024.</p>
      
      <h2>Contenu pédagogique</h2>
      <p>La formation a couvert les aspects suivants :</p>
      <ul>
        <li>Les fondamentaux de l'évaluation des politiques publiques</li>
        <li>Les méthodologies d'évaluation d'impact</li>
        <li>Les outils de collecte et d'analyse de données</li>
        <li>La rédaction de rapports d'évaluation</li>
        <li>Les recommandations et le suivi des politiques évaluées</li>
      </ul>
      
      <h2>Intervenants</h2>
      <p>La formation a été dispensée par des experts nationaux et internationaux reconnus dans le domaine de l'évaluation des politiques publiques, notamment des représentants de la Banque Mondiale et du PNUD.</p>
    `,
    date: "13 novembre 2024",
    image: actuFormationEvaluation,
    category: "Formation",
    slug: "formation-evaluation-politiques",
  },
  {
    id: 3,
    title: "Voyage d'études au Maroc des responsables des organes de contrôle",
    excerpt: "Une délégation s'est rendue à Rabat du 14 au 18 octobre 2024 dans le cadre du SDRFP.",
    content: `
      <p>Le Gouvernement ivoirien a adopté en juin 2022, le Schéma Directeur de la Réforme des Finances Publiques (SDRFP) 2022-2024. Dans ce cadre, une délégation des responsables des organes de contrôle s'est rendue à Rabat du 14 au 18 octobre 2024.</p>
      
      <h2>Objectifs du voyage</h2>
      <p>Ce voyage d'études avait pour objectifs :</p>
      <ul>
        <li>S'inspirer de l'expérience marocaine en matière de modernisation du contrôle des finances publiques</li>
        <li>Découvrir les systèmes d'information utilisés par l'IGF du Maroc</li>
        <li>Échanger sur les bonnes pratiques en matière d'audit de performance</li>
        <li>Explorer les possibilités de partenariat technique</li>
      </ul>
      
      <h2>Programme de la visite</h2>
      <p>La délégation a visité plusieurs institutions marocaines et a participé à des sessions de travail avec les homologues marocains sur les thèmes de l'audit, du contrôle et de la gouvernance financière.</p>
      
      <h2>Recommandations</h2>
      <p>À l'issue de cette visite, un rapport de mission a été élaboré, incluant des recommandations concrètes pour la modernisation des pratiques de contrôle en Côte d'Ivoire.</p>
    `,
    date: "25 octobre 2024",
    image: actuVoyageMaroc,
    category: "Coopération",
    slug: "voyage-etudes-maroc",
  },
  {
    id: 4,
    title: "Projet PTUA : Audit des échangeurs du boulevard Mitterrand",
    excerpt: "Mission d'audit des activités de construction des échangeurs du boulevard Mitterrand financés par la BAD.",
    content: `
      <p>La Côte d'Ivoire a signé, le 29 décembre 2016, des Accords de Financement avec la Banque Africaine de Développement (BAD) pour le Projet de Transport Urbain d'Abidjan (PTUA).</p>
      
      <h2>Contexte du projet</h2>
      <p>Le PTUA comprend notamment la construction d'échangeurs sur le boulevard Mitterrand, un axe stratégique de la ville d'Abidjan. L'IGF a été mandatée pour réaliser un audit des dépenses effectuées dans le cadre de ce projet d'envergure.</p>
      
      <h2>Portée de l'audit</h2>
      <p>La mission d'audit couvre :</p>
      <ul>
        <li>L'examen des procédures de passation des marchés</li>
        <li>La vérification de l'effectivité des travaux réalisés</li>
        <li>Le contrôle de la conformité des dépenses aux accords de financement</li>
        <li>L'évaluation de la qualité des ouvrages construits</li>
      </ul>
      
      <h2>Méthodologie</h2>
      <p>L'équipe d'audit procède par des vérifications sur pièces et sur place, incluant des visites de chantiers et des entretiens avec les différents acteurs impliqués dans la mise en œuvre du projet.</p>
    `,
    date: "2 octobre 2024",
    image: actuAuditPtua,
    category: "Mission",
    slug: "audit-ptua",
  },
];

// Article Detail Component
const ArticleDetailView = ({ article, prevArticle, nextArticle }: { 
  article: Article; 
  prevArticle: Article | null; 
  nextArticle: Article | null 
}) => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/actualites" className="hover:text-primary">Actualités</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                <Tag className="h-3.5 w-3.5" />
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {article.date}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          </header>

          {/* Featured image */}
          <div className="aspect-video mb-8 overflow-hidden rounded-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12 prose-headings:font-heading prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-border mb-12">
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Partager
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Partager sur Facebook"
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Partager sur Twitter"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Partager sur LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                to={`/actualites/${prevArticle.slug}`}
                className="group flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
              >
                <ArrowLeft className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Article précédent
                  </span>
                  <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                to={`/actualites/${nextArticle.slug}`}
                className="group flex items-center justify-end gap-4 p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
              >
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Article suivant
                  </span>
                  <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  );
};

const Actualites = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  // If viewing a specific article
  if (slug) {
    const currentIndex = allNews.findIndex(article => article.slug === slug);
    const article = allNews[currentIndex];
    
    if (!article) {
      return (
        <Layout>
          <div className="container py-20 text-center">
            <h1 className="font-heading text-3xl mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-8">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link
              to="/actualites"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux actualités
            </Link>
          </div>
        </Layout>
      );
    }

    const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;
    const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;

    return (
      <Layout>
        <ArticleDetailView 
          article={article} 
          prevArticle={prevArticle} 
          nextArticle={nextArticle} 
        />
      </Layout>
    );
  }

  // Filter articles
  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Toutes" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <div className="border-b border-border bg-background">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une actualité..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-foreground hover:bg-accent/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container py-16">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Aucune actualité trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, index) => (
              <Link
                key={news.id}
                to={`/actualites/${news.slug}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      <Tag className="h-3 w-3" />
                      {news.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Lire la suite
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Actualites;
