import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Contact</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Nous Contacter
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Une question ? N'hésitez pas à nous contacter, nous vous répondrons dans les meilleurs délais.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl mb-6">Informations de contact</h2>
              <div className="section-divider mb-8" />
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Adresse</h3>
                <p className="text-muted-foreground text-sm">
                  Immeuble SCIAM, 6ème étage<br />
                  Plateau, Abidjan<br />
                  Côte d'Ivoire
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Téléphone</h3>
                <a href="tel:+22527222222" className="text-muted-foreground text-sm hover:text-primary">
                  +225 27 22 22 22
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a href="mailto:contact@igf.finances.gouv.ci" className="text-muted-foreground text-sm hover:text-primary">
                  contact@igf.finances.gouv.ci
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Horaires d'ouverture</h3>
                <p className="text-muted-foreground text-sm">
                  Lundi - Vendredi : 8h00 - 17h00<br />
                  Samedi - Dimanche : Fermé
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-section-light p-8">
              <h2 className="font-heading text-2xl mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet *</label>
                    <Input
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet *</label>
                  <Input
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <div className="aspect-[21/9] bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Carte interactive - Plateau, Abidjan</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
