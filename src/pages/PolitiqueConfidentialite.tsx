import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Database, Cookie, Eye, Lock, UserCheck } from "lucide-react";
import motifIGF from "@/assets/motif-igf-bande.png";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Politique de confidentialité</span>
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
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-white/80 max-w-3xl animate-slide-up">
            Protection et traitement de vos données personnelles
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Notre engagement</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">
                L'Inspection Générale des Finances (IGF) s'engage à protéger la vie privée des utilisateurs de son site internet. 
                Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles.
              </p>
            </div>
          </section>

          {/* Collecte */}
          <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Données collectées</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Les données personnelles susceptibles d'être collectées sont :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Données de navigation (pages visitées, temps passé)</li>
                <li>Informations techniques (adresse IP, navigateur utilisé)</li>
              </ul>
            </div>
          </section>

          {/* Utilisation */}
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Utilisation des données</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Répondre à vos demandes de contact</li>
                <li>Traiter les plaintes et dénonciations</li>
                <li>Améliorer nos services et notre site internet</li>
                <li>Établir des statistiques de fréquentation</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Cookies</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Notre site utilise des cookies pour améliorer votre expérience de navigation.</p>
              <p className="text-muted-foreground">
                Les cookies sont de petits fichiers texte stockés sur votre appareil. Ils nous permettent de mémoriser vos préférences 
                et d'analyser le trafic sur notre site. Vous pouvez configurer votre navigateur pour refuser les cookies.
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Sécurité des données</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance continue de nos systèmes</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </div>
          </section>

          {/* Droits */}
          <section className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl">Vos droits</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p>Conformément à la réglementation, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@igf.finances.gouv.ci" className="text-primary hover:underline">contact@igf.finances.gouv.ci</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PolitiqueConfidentialite;