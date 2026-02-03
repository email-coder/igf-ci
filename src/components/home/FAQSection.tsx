import { Link } from "react-router-dom";
import { HelpCircle, ChevronRight, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Qu'est-ce que l'Inspection Générale des Finances (IGF) ?",
    answer: "L'IGF est un organe de contrôle des finances publiques rattaché au Ministère des Finances et du Budget de Côte d'Ivoire. Elle veille à la bonne gestion des deniers publics."
  },
  {
    question: "Comment déposer une plainte ou une dénonciation ?",
    answer: "Vous pouvez déposer une plainte via notre formulaire en ligne sur la page 'Plaintes et dénonciations', par courrier postal, ou en vous présentant à nos bureaux. Votre anonymat est garanti."
  },
  {
    question: "Où puis-je trouver les rapports d'activités de l'IGF ?",
    answer: "Tous nos rapports sont disponibles gratuitement en téléchargement dans la section 'Publications' de notre site internet."
  },
  {
    question: "Comment contacter l'IGF ?",
    answer: "Par téléphone au +225 27 22 22 22, par email à contact@igf.finances.gouv.ci, ou à nos bureaux situés à l'Immeuble SCIAM, 6ème étage, Plateau, Abidjan."
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-section-light to-background">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left content */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">FAQ</span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              Questions Fréquentes
            </h2>
            
            <p className="text-muted-foreground mb-8">
              Retrouvez les réponses aux questions les plus posées sur l'IGF, ses missions et ses services.
            </p>

            <div className="space-y-4">
              <Link 
                to="/faq"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium group"
              >
                Voir toutes les questions
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Besoin d'aide ? Utilisez notre assistant IA en bas à droite de l'écran !
                </p>
              </div>
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="text-left font-medium hover:text-primary py-5 text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;