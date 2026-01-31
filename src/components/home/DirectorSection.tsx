import { User, Quote } from "lucide-react";

const DirectorSection = () => {
  return (
    <section className="py-16 md:py-20 bg-section-dark text-hero-foreground">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4" />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                  alt="Inspecteur Général des Finances"
                  className="relative w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Quote className="h-12 w-12 text-primary mb-6 opacity-50" />
            <blockquote className="font-heading text-2xl md:text-3xl italic leading-relaxed mb-8">
              "L'Inspection Générale des Finances s'est fixée comme ambition de fournir 
              à ses clients et partenaires une prestation de qualité en vue de satisfaire 
              de façon continue leurs besoins et attentes les plus pertinents."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-16 h-0.5 bg-primary" />
              <div>
                <p className="font-heading text-xl">
                  Mme Marie Hélène SARASSORO Épse FADIGA
                </p>
                <p className="text-white/70">Inspecteur Général des Finances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
