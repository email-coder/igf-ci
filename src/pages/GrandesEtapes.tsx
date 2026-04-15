import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, FileText, Award, Building2, Scale, Shield } from "lucide-react";
import ScrollSection from "@/components/ui/scroll-section";

const milestones = [
  {
    year: 1961,
    title: "Création de l'Inspection Générale des Services Financiers (IGSF)",
    description: "Décret n°61-199 du 05 juin 1961 portant création de l'Inspection Générale des Services Financiers, premier organe de contrôle des finances publiques en Côte d'Ivoire.",
    icon: Building2,
  },
  {
    year: 1964,
    title: "Contrôle Économique et Financier",
    description: "Décret n°64-77 du 14 février 1964. Renforcement du cadre du contrôle économique et financier de l'État.",
    icon: Scale,
  },
  {
    year: 1966,
    title: "Direction du Contrôle Économique et Financier",
    description: "Décret n°66-46 du 08 février 1966 portant création de la Direction du Contrôle Économique et Financier.",
    icon: Building2,
  },
  {
    year: 1990,
    title: "Première restructuration majeure",
    description: "Décret n°90-1164 du 12 octobre 1990. Réorganisation profonde de l'inspection pour l'adapter aux nouvelles exigences de gouvernance.",
    icon: Building2,
  },
  {
    year: 1991,
    title: "Renforcement institutionnel",
    description: "Décret n°91-752 du 21 novembre 1991 portant réorganisation de l'Inspection Générale des Finances avec élargissement de ses compétences.",
    icon: Scale,
  },
  {
    year: 1992,
    title: "Nouvelle organisation",
    description: "Décret n°92-07 du 08 janvier 1992. Mise en place d'une nouvelle organisation avec des brigades spécialisées.",
    icon: Building2,
  },
  {
    year: 1996,
    title: "Naissance de l'appellation « IGF »",
    description: "Décret n°96-179 du 1er mars 1996 portant organisation du Ministère de l'Économie et des Finances. L'Inspection prend officiellement le nom d'Inspection Générale des Finances (IGF).",
    icon: Award,
  },
  {
    year: 1999,
    title: "Renforcement des pouvoirs de contrôle",
    description: "Décret n°99-438 du 07 juillet 1999. Élargissement du champ d'intervention de l'IGF à toutes les structures gérant des fonds publics.",
    icon: Shield,
  },
  {
    year: 2012,
    title: "Création de la BLC & Démarche Qualité",
    description: "Création de la Brigade de Lutte contre la Corruption (BLC) et lancement de la démarche qualité en vue de la certification ISO 9001.",
    icon: Shield,
  },
  {
    year: 2014,
    title: "Rattachement au Premier Ministre",
    description: "Décret n°2014-416 du 09 juillet 2014. L'IGF est rattachée au Cabinet du Premier Ministre, renforçant son indépendance et son autorité.",
    icon: Building2,
  },
  {
    year: 2015,
    title: "Audit des projets financés par les PTFs",
    description: "Extension du périmètre d'intervention aux audits des projets financés par les Partenaires Techniques et Financiers (PTFs).",
    icon: FileText,
  },
  {
    year: 2017,
    title: "Migration vers ISO 9001:2015",
    description: "Engagement dans le processus de migration du système de management de la qualité vers la norme ISO 9001 version 2015.",
    icon: Award,
  },
  {
    year: 2018,
    title: "Certification ISO 9001:2015",
    description: "Obtention de la certification ISO 9001:2015, faisant de l'IGF l'une des premières structures publiques certifiées en Côte d'Ivoire.",
    icon: Award,
  },
  {
    year: 2019,
    title: "Prix National d'Excellence",
    description: "L'IGF reçoit le Prix National d'Excellence pour la qualité de ses services et sa contribution à la bonne gouvernance.",
    icon: Award,
  },
  {
    year: 2020,
    title: "Renouvellement ISO & Contrôle fonds COVID-19",
    description: "Renouvellement de la certification ISO 9001:2015 et mobilisation pour le contrôle de l'utilisation des fonds COVID-19.",
    icon: Shield,
  },
];

const GrandesEtapes = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/presentation" className="hover:text-primary">Présentation</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Grandes Étapes</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <ScrollSection animation="fade-up">
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              Grandes Étapes de l'IGF
            </h1>
            <p className="text-xl text-hero-foreground/80 max-w-3xl">
              Plus de 60 ans d'histoire au service du contrôle des finances publiques 
              et de la bonne gouvernance en Côte d'Ivoire
            </p>
          </ScrollSection>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Central line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <ScrollSection
                      key={index}
                      animation={isLeft ? "fade-right" : "fade-left"}
                      delay={100}
                    >
                      <div className={`relative flex items-start gap-6 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}>
                        {/* Year badge on the line */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-xs font-bold shadow-lg">
                            {milestone.year}
                          </div>
                        </div>

                        {/* Card */}
                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isLeft ? "md:pr-8" : "md:pl-8"
                        }`}>
                          <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-primary mb-1">
                                  {milestone.year}
                                </div>
                                <h3 className="font-heading text-lg mb-2 text-foreground">
                                  {milestone.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollSection>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <ScrollSection animation="fade-left" delay={200}>
              <div className="bg-section-light p-6 rounded-lg">
                <h3 className="font-heading text-xl mb-4">Présentation</h3>
                <ul className="space-y-3">
                  {[
                    { label: "L'IGF", href: "/presentation" },
                    { label: "Mot de l'Inspecteur Général", href: "/mot-inspecteur" },
                    { label: "Organisation", href: "/organisation" },
                    { label: "Grandes Étapes", href: "/grandes-etapes", active: true },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between text-sm transition-colors ${
                          link.active
                            ? "text-primary font-medium"
                            : "hover:text-primary text-muted-foreground"
                        }`}
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollSection>

            <ScrollSection animation="fade-left" delay={300}>
              <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <h3 className="font-heading text-xl mb-4">Certification ISO</h3>
                <p className="text-sm opacity-90 mb-4">
                  L'IGF est certifiée ISO 9001:2015, gage de qualité et d'excellence 
                  dans ses missions de contrôle.
                </p>
                <Link to="/politique-qualite" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollSection>

            <ScrollSection animation="fade-left" delay={400}>
              <div className="border border-border p-6 rounded-lg">
                <h3 className="font-heading text-lg mb-3">Chiffres clés</h3>
                <div className="space-y-4">
                  {[
                    { value: "1961", label: "Année de création" },
                    { value: "60+", label: "Années d'existence" },
                    { value: "15", label: "Réformes majeures" },
                    { value: "2018", label: "Certification ISO" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-3">
                      <span className="text-2xl font-heading font-bold text-primary">
                        {stat.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollSection>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default GrandesEtapes;
