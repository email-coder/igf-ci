import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, HelpCircle, Search, MessageCircle, FileText, Users, Shield, Phone } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import motifIGF from "@/assets/motif-igf-bande.png";

const faqCategories = [
  {
    id: "general",
    title: "Questions générales",
    icon: HelpCircle,
    questions: [
      {
        question: "Qu'est-ce que l'Inspection Générale des Finances (IGF) ?",
        answer: "L'Inspection Générale des Finances est un organe de contrôle des finances publiques rattaché au Ministère des Finances et du Budget de Côte d'Ivoire. Elle a pour mission de veiller à la bonne gestion des deniers publics et de lutter contre la corruption."
      },
      {
        question: "Quelles sont les heures d'ouverture de l'IGF ?",
        answer: "L'IGF est ouverte du lundi au vendredi, de 7h30 à 16h30. Nos bureaux sont situés à l'Immeuble SCIAM, 6ème étage, au Plateau à Abidjan."
      },
      {
        question: "Comment contacter l'IGF ?",
        answer: "Vous pouvez nous contacter par téléphone au +225 27 22 22 22, par email à contact@igf.finances.gouv.ci, ou en vous rendant directement à nos bureaux au Plateau."
      }
    ]
  },
  {
    id: "missions",
    title: "Nos missions",
    icon: FileText,
    questions: [
      {
        question: "Quelles sont les principales missions de l'IGF ?",
        answer: "L'IGF exerce quatre missions principales : le contrôle des finances publiques, l'audit des organismes et établissements publics, le conseil aux administrations, et la lutte contre la corruption à travers la Brigade de Lutte contre la Corruption (BLC)."
      },
      {
        question: "Comment se déroule une mission d'audit de l'IGF ?",
        answer: "Une mission d'audit comprend plusieurs phases : la préparation (collecte de documents), l'intervention sur site, l'analyse des données, la rédaction du rapport, et la présentation des conclusions aux parties concernées."
      },
      {
        question: "L'IGF peut-elle intervenir dans le secteur privé ?",
        answer: "L'IGF intervient principalement dans le secteur public. Cependant, elle peut contrôler les entreprises privées bénéficiant de subventions publiques ou gérant des fonds publics."
      }
    ]
  },
  {
    id: "plaintes",
    title: "Plaintes et dénonciations",
    icon: Shield,
    questions: [
      {
        question: "Comment déposer une plainte ?",
        answer: "Vous pouvez déposer une plainte en ligne via notre formulaire dédié sur la page 'Plaintes et dénonciations', par courrier à notre adresse postale, ou en vous présentant directement à nos bureaux."
      },
      {
        question: "Mon identité sera-t-elle protégée si je dépose une plainte ?",
        answer: "Oui, l'IGF garantit la confidentialité des informations et l'anonymat des dénonciateurs. Toutes les plaintes sont traitées dans le respect du secret professionnel."
      },
      {
        question: "Quel est le délai de traitement d'une plainte ?",
        answer: "Le délai de traitement varie selon la complexité du dossier. Un accusé de réception est envoyé dans les 48 heures suivant le dépôt de la plainte, et une réponse préliminaire est généralement fournie dans un délai d'un mois."
      }
    ]
  },
  {
    id: "documents",
    title: "Documents et publications",
    icon: Users,
    questions: [
      {
        question: "Où puis-je trouver les rapports d'activités de l'IGF ?",
        answer: "Tous nos rapports d'activités sont disponibles en téléchargement gratuit dans la section 'Publications' de notre site. Vous y trouverez également nos programmes d'activités et les textes officiels."
      },
      {
        question: "Les documents sont-ils téléchargeables gratuitement ?",
        answer: "Oui, tous les documents publiés sur notre site sont téléchargeables gratuitement au format PDF."
      },
      {
        question: "Comment puis-je obtenir un document non disponible en ligne ?",
        answer: "Pour les documents non disponibles en ligne, vous pouvez adresser une demande écrite à l'IGF ou nous contacter par email à contact@igf.finances.gouv.ci."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
          style={{
            backgroundImage: `url(${motifIGF})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        />
        <div className="container relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl mb-4 animate-fade-in">
            Foire Aux Questions
          </h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
          />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div 
              key={category.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl">{category.title}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${category.id}-${index}`}
                    className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/30 transition-all"
                  >
                    <AccordionTrigger className="text-left font-medium hover:text-primary py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune question trouvée pour "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary/10 to-accent p-8 rounded-lg border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-primary rounded-full">
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-2xl mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="text-muted-foreground">Notre équipe est disponible pour répondre à toutes vos questions.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;