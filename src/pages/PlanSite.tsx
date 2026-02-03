import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Info, Briefcase, Newspaper, FileText, FolderOpen, Image, Phone, HelpCircle, AlertTriangle } from "lucide-react";
import motifIGF from "@/assets/motif-igf-bande.png";

const siteStructure = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
    description: "Page d'accueil du site de l'IGF",
  },
  {
    title: "Présentation",
    href: "/presentation",
    icon: Info,
    children: [
      { title: "L'IGF", href: "/presentation" },
      { title: "Mot de l'Inspecteur Général", href: "/mot-inspecteur" },
      { title: "Organisation", href: "/organisation" },
      { title: "Historique", href: "/historique" },
    ],
  },
  {
    title: "Missions",
    href: "/missions",
    icon: Briefcase,
    children: [
      { title: "Contrôle", href: "/missions/controle" },
      { title: "Audit", href: "/missions/audit" },
      { title: "Conseil", href: "/missions/conseil" },
      { title: "Lutte contre la corruption", href: "/missions/lutte-corruption" },
    ],
  },
  {
    title: "Actualités",
    href: "/actualites",
    icon: Newspaper,
    description: "Toutes les actualités de l'IGF",
  },
  {
    title: "Publications",
    href: "/publications",
    icon: FileText,
    children: [
      { title: "Rapports d'activités", href: "/publications/rapports" },
      { title: "Programmes", href: "/publications/programmes" },
      { title: "Textes officiels", href: "/publications/textes" },
    ],
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FolderOpen,
    description: "Centre de documentation de l'IGF",
  },
  {
    title: "Galerie",
    href: "/galerie",
    icon: Image,
    description: "Photos et images de l'IGF",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Phone,
    description: "Nous contacter",
  },
  {
    title: "Plaintes",
    href: "/plaintes",
    icon: AlertTriangle,
    description: "Déposer une plainte ou dénonciation",
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: HelpCircle,
    description: "Questions fréquemment posées",
  },
];

const PlanSite = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Plan du site</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
          style={{
            backgroundImage: `url(${motifIGF})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        />
        <div className="container relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            Plan du Site
          </h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Navigation complète du site de l'IGF
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, index) => (
            <div
              key={section.title}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/30 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <Link 
                  to={section.href} 
                  className="font-heading text-xl hover:text-primary transition-colors"
                >
                  {section.title}
                </Link>
              </div>
              
              {section.description && (
                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              )}

              {section.children && (
                <ul className="space-y-2 ml-4 border-l-2 border-primary/20 pl-4">
                  {section.children.map((child) => (
                    <li key={child.title}>
                      <Link
                        to={child.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="h-3 w-3" />
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Pages légales */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="font-heading text-2xl mb-6">Pages légales</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/mentions-legales" 
              className="px-6 py-3 bg-muted hover:bg-accent rounded-lg transition-all hover:scale-105"
            >
              Mentions légales
            </Link>
            <Link 
              to="/politique-confidentialite" 
              className="px-6 py-3 bg-muted hover:bg-accent rounded-lg transition-all hover:scale-105"
            >
              Politique de confidentialité
            </Link>
            <Link 
              to="/faq" 
              className="px-6 py-3 bg-muted hover:bg-accent rounded-lg transition-all hover:scale-105"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanSite;