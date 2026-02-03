import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Scale, Shield, Building, Users, Info } from "lucide-react";
import motifIGF from "@/assets/motif-igf-bande.png";

const MentionsLegales = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Mentions légales</span>
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
            Mentions Légales
          </h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Informations légales concernant le site de l'IGF
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Éditeur */}
          <section className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Éditeur du site</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p><strong>Dénomination :</strong> Inspection Générale des Finances (IGF)</p>
              <p><strong>Adresse :</strong> Immeuble SCIAM, 6ème étage, Plateau, Abidjan, Côte d'Ivoire</p>
              <p><strong>Téléphone :</strong> +225 27 22 22 22</p>
              <p><strong>Email :</strong> contact@igf.finances.gouv.ci</p>
              <p><strong>Directeur de la publication :</strong> Inspecteur Général des Finances</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Hébergement</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p>Ce site est hébergé par des services d'hébergement web professionnels conformes aux normes de sécurité en vigueur.</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Propriété intellectuelle</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>L'ensemble de ce site relève de la législation ivoirienne et internationale sur le droit d'auteur et la propriété intellectuelle.</p>
              <p>Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
              <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse de l'IGF.</p>
            </div>
          </section>

          {/* Responsabilité */}
          <section className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Limitation de responsabilité</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour.</p>
              <p>L'IGF ne saurait être tenue pour responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site.</p>
            </div>
          </section>

          {/* Liens */}
          <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Liens hypertextes</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ont fait l'objet d'une autorisation préalable.</p>
              <p>L'IGF se réserve le droit de supprimer tout lien ne correspondant pas à la politique éditoriale du site.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default MentionsLegales;