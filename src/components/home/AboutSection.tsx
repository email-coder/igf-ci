import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
 import ScrollSection from "@/components/ui/scroll-section";
import heroAbidjan from "@/assets/hero-abidjan-3.jpg";

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
           <ScrollSection animation="fade-right">
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
              className="btn-institutional text-primary border-primary group"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
           </ScrollSection>

          {/* Image with stats */}
           <ScrollSection animation="fade-left" delay={200} className="relative">
            <img
              src={heroAbidjan}
              alt="Quartier des affaires d'Abidjan"
              className="w-full h-[400px] object-cover shadow-xl hover:shadow-2xl transition-shadow duration-500"
            />
            {/* Stats overlay */}
            <div className="absolute -bottom-8 left-8 right-8 bg-[#F4F4F4] p-8 grid grid-cols-3 gap-4 shadow-lg border border-border">
              <div className="stat-item group cursor-default">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform">25+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Années d'expertise</div>
              </div>
              <div className="stat-item group cursor-default">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform">3</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Divisions</div>
              </div>
              <div className="stat-item group cursor-default">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform">100+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Agents qualifiés</div>
              </div>
            </div>
           </ScrollSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
