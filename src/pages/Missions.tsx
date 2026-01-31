import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Search, FileText, Shield, AlertTriangle, Briefcase } from "lucide-react";

const missions = [
  {
    icon: Search,
    title: "Contrôle du bon fonctionnement",
    description: "Mission générale et permanente de contrôle du bon fonctionnement des services publics.",
    details: [
      "Vérification de la régularité des opérations",
      "Contrôle de l'application des textes réglementaires",
      "Évaluation de l'efficacité des procédures"
    ]
  },
  {
    icon: FileText,
    title: "Contrôle financier et comptable",
    description: "Missions de contrôle financier et comptable, d'audit et d'évaluation des procédures administratives et de gestion des services.",
    details: [
      "Audit des comptes publics",
      "Contrôle de la gestion financière",
      "Évaluation des procédures de gestion"
    ]
  },
  {
    icon: Briefcase,
    title: "Conseil et vérification",
    description: "Missions de conseil, de vérification, de contrôle y compris les contrôles fiscaux et douaniers.",
    details: [
      "Accompagnement des administrations",
      "Recommandations pour l'amélioration des processus",
      "Contrôles spécialisés"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Lutte contre la fraude",
    description: "Missions d'appui à la lutte contre la fraude dans la gestion des finances publiques.",
    details: [
      "Détection des irrégularités",
      "Investigation sur les fraudes",
      "Propositions de sanctions"
    ]
  },
  {
    icon: Shield,
    title: "Lutte contre la corruption",
    description: "Brigade de Lutte contre la Corruption (BLC) pour combattre les pratiques corruptives.",
    details: [
      "Réception des plaintes et dénonciations",
      "Enquêtes sur les actes de corruption",
      "Sensibilisation et prévention"
    ]
  },
];

const Missions = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Missions</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Nos Missions
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            L'IGF assure des missions de contrôle, d'audit, de conseil et de lutte 
            contre la corruption au service de la bonne gouvernance.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="space-y-12">
          {missions.map((mission, index) => (
            <div 
              key={index}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12 border-b border-border last:border-0"
            >
              <div className="flex items-start gap-4 lg:col-span-1">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center">
                  <mission.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-heading text-2xl mb-4">{mission.title}</h2>
                <p className="text-muted-foreground mb-6">{mission.description}</p>
                <ul className="space-y-2">
                  {mission.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-section-light text-center">
          <h3 className="font-heading text-2xl mb-4">Vous avez une plainte à déposer ?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            La Brigade de Lutte contre la Corruption reçoit vos plaintes et dénonciations 
            concernant des actes de corruption ou de mauvaise gestion.
          </p>
          <Link 
            to="/plaintes" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-igf-green-dark text-primary-foreground px-8 py-4 font-medium uppercase tracking-wider transition-colors"
          >
            Déposer une plainte
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Missions;
