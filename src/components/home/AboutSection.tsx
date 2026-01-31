import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              À propos
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mt-2 mb-6">
              L'Inspection Générale des Finances
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              L'Inspection Générale des Finances (IGF) est une structure de gouvernance de 
              proximité au service du Ministère de l'Économie, des Finances et du Budget. 
              Elle a des attributions transversales et d'appui couvrant les Ministères en 
              charge de l'Économie et des Finances, et du Budget, ainsi que toute structure 
              gérant des fonds publics.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Notre mission est d'assurer le contrôle du bon fonctionnement des services, 
              le contrôle financier et comptable, l'audit et l'évaluation des procédures 
              administratives, ainsi que la lutte contre la fraude et la corruption.
            </p>
            <Link
              to="/presentation"
              className="btn-institutional text-primary border-primary"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Image with stats */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop"
              alt="Bâtiment institutionnel"
              className="w-full h-[400px] object-cover"
            />
            {/* Stats overlay */}
            <div className="absolute -bottom-8 left-8 right-8 bg-section-dark p-8 grid grid-cols-3 gap-4">
              <div className="stat-item text-hero-foreground">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary">25+</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">Années d'expertise</div>
              </div>
              <div className="stat-item text-hero-foreground">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary">3</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">Divisions</div>
              </div>
              <div className="stat-item text-hero-foreground">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary">100+</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">Agents qualifiés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
