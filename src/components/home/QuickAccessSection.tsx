import { Link } from "react-router-dom";
import { Search, FileText, AlertTriangle, Shield, Phone, Mail } from "lucide-react";

const quickAccessItems = [
  {
    icon: Search,
    title: "Contrôle",
    description: "Contrôle du bon fonctionnement des services",
    link: "/missions/controle",
  },
  {
    icon: FileText,
    title: "Audit",
    description: "Audit et évaluation des procédures",
    link: "/missions/audit",
  },
  {
    icon: Shield,
    title: "Conseil",
    description: "Missions de conseil et d'appui",
    link: "/missions/conseil",
  },
  {
    icon: AlertTriangle,
    title: "Lutte anti-corruption",
    description: "Brigade de Lutte contre la Corruption",
    link: "/missions/lutte-corruption",
  },
  {
    icon: Mail,
    title: "Plaintes",
    description: "Déposer une plainte ou dénonciation",
    link: "/plaintes",
  },
  {
    icon: Phone,
    title: "Contact",
    description: "Nous contacter directement",
    link: "/contact",
  },
];

const QuickAccessSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl mt-2">
            Nos Missions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            L'IGF est chargée de missions de contrôle, d'audit, de conseil et de lutte contre la corruption 
            pour garantir la bonne gouvernance des finances publiques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-border">
          {quickAccessItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="quick-access-card bg-background group"
            >
              <div className="quick-access-icon group-hover:bg-igf-green-dark transition-colors">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
