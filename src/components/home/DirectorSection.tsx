import { Quote } from "lucide-react";
import inspectrice from "@/assets/inspectrice-generale.png";

const DirectorSection = () => {
  return (
    <section className="py-16 md:py-20 bg-primary/5 relative overflow-hidden">

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="relative max-w-sm mx-auto lg:mx-0 group">
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-lg transition-all group-hover:border-primary/50 group-hover:-inset-5" />
              <div className="absolute -inset-2 bg-primary/10 rounded-lg transition-all group-hover:bg-primary/15" />
              <img
                src={inspectrice}
                alt="Inspecteur Général des Finances"
                className="relative w-full rounded-lg shadow-xl transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 animate-slide-up">
            <Quote className="h-12 w-12 text-primary mb-6 opacity-50 animate-float" />
            <blockquote className="font-heading text-2xl md:text-3xl italic leading-relaxed mb-8 text-foreground">
              "L'Inspection Générale des Finances s'est fixée comme ambition de fournir 
              à ses clients et partenaires une prestation de qualité en vue de satisfaire 
              de façon continue leurs besoins et attentes les plus pertinents."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-primary rounded" />
              <div>
                <p className="font-heading text-xl text-foreground">
                  Mme Marie Hélène SARASSORO Épse FADIGA
                </p>
                <p className="text-muted-foreground">Inspecteur Général des Finances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
