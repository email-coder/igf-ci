import { Link } from "react-router-dom";
import { 
  Search, 
  FileText, 
  Shield, 
  Phone, 
  Mail, 
  Scale,
  TrendingUp,
  Users,
  ClipboardCheck,
  Send
} from "lucide-react";
import motifIGF from "@/assets/motif-igf-bande.png";

const quickAccessItems = [
  {
    icon: Search,
    title: "Contrôle",
    description: "Contrôle du bon fonctionnement des services",
    link: "/missions/controle",
  },
  {
    icon: ClipboardCheck,
    title: "Audit",
    description: "Audit et évaluation des procédures",
    link: "/missions/audit",
  },
  {
    icon: TrendingUp,
    title: "Conseil",
    description: "Missions de conseil et d'appui",
    link: "/missions/conseil",
  },
  {
    icon: Shield,
    title: "Lutte anti-corruption",
    description: "Brigade de Lutte contre la Corruption",
    link: "/missions/lutte-corruption",
  },
  {
    icon: Send,
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
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Motif left side */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 opacity-30"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-y",
        }}
      />
      {/* Motif right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 opacity-30"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-y",
        }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl mt-2 text-foreground">
            Nos Missions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            L'IGF est chargée de missions de contrôle, d'audit, de conseil et de lutte contre la corruption 
            pour garantir la bonne gouvernance des finances publiques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group flex flex-col items-center gap-4 p-8 text-center bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
