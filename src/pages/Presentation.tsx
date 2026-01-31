import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

const Presentation = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Présentation</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Présentation de l'IGF
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            L'Inspection Générale des Finances : un instrument d'appui à la promotion 
            de la bonne gouvernance économique et financière
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-heading text-3xl mb-6">L'Inspection Générale des Finances</h2>
              <div className="section-divider mb-6" />
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  L'Inspection Générale des Finances (IGF) est une structure de gouvernance de 
                  proximité au service du Ministère de l'Économie, des Finances et du Budget. 
                  Elle a des attributions transversales et d'appui couvrant les Ministères en 
                  charge de l'Économie et des Finances, et du Budget, ainsi que toute structure 
                  gérant des fonds publics.
                </p>
                <p>
                  Créée pour renforcer le contrôle et la transparence dans la gestion des finances 
                  publiques, l'IGF joue un rôle crucial dans la promotion de la bonne gouvernance 
                  économique et financière en Côte d'Ivoire.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-6">Notre Vision</h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                L'IGF aspire à être une institution de référence en matière de contrôle des 
                finances publiques en Afrique de l'Ouest, reconnue pour son expertise, son 
                intégrité et son engagement envers l'excellence.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-6">Nos Valeurs</h2>
              <div className="section-divider mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Intégrité", desc: "Agir avec honnêteté et transparence" },
                  { title: "Excellence", desc: "Viser la qualité dans chaque mission" },
                  { title: "Professionnalisme", desc: "Expertise et compétence au service de l'État" },
                  { title: "Responsabilité", desc: "Assumer nos engagements envers les citoyens" },
                ].map((value, i) => (
                  <div key={i} className="p-6 bg-section-light border-l-4 border-primary">
                    <h3 className="font-heading text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-section-light p-6">
              <h3 className="font-heading text-xl mb-4">Liens Rapides</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/mot-inspecteur" className="flex items-center justify-between text-sm hover:text-primary transition-colors">
                    Mot de l'Inspecteur Général
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link to="/organisation" className="flex items-center justify-between text-sm hover:text-primary transition-colors">
                    Organisation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link to="/missions" className="flex items-center justify-between text-sm hover:text-primary transition-colors">
                    Nos Missions
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link to="/historique" className="flex items-center justify-between text-sm hover:text-primary transition-colors">
                    Historique
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-primary-foreground p-6">
              <h3 className="font-heading text-xl mb-4">Politique Qualité</h3>
              <p className="text-sm opacity-90 mb-4">
                L'IGF s'est fixée comme ambition de fournir une prestation de qualité 
                à ses clients et partenaires.
              </p>
              <Link to="/politique-qualite" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Presentation;
