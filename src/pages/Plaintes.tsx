import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, Send, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Plaintes = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    objet: "",
    description: "",
    anonyme: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Plainte enregistrée",
      description: "Votre plainte a été transmise à la Brigade de Lutte contre la Corruption.",
    });
    setFormData({ nom: "", email: "", telephone: "", objet: "", description: "", anonyme: false });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Plaintes et dénonciations</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="h-12 w-12 text-primary" />
            <h1 className="font-heading text-4xl md:text-5xl">
              Plaintes et Dénonciations
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl">
            La Brigade de Lutte contre la Corruption (BLC) reçoit vos plaintes concernant 
            des actes de corruption ou de mauvaise gestion des fonds publics.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info sidebar */}
          <div className="space-y-8">
            <div className="bg-destructive/10 border border-destructive/20 p-6">
              <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
              <h3 className="font-heading text-lg mb-2">Important</h3>
              <p className="text-sm text-muted-foreground">
                Donner de l'argent pour obtenir un service public est un acte de corruption. 
                N'hésitez pas à le signaler.
              </p>
            </div>

            <div className="bg-primary/10 p-6">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg mb-2">Protection des lanceurs d'alerte</h3>
              <p className="text-sm text-muted-foreground">
                Votre identité sera protégée. Vous pouvez également déposer une plainte anonyme.
              </p>
            </div>

            <div className="bg-section-light p-6">
              <h3 className="font-heading text-lg mb-4">Types de plaintes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Corruption active ou passive
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Détournement de fonds publics
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Abus de pouvoir
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Fraude fiscale ou douanière
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Mauvaise gestion des fonds
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-section-light p-8">
              <h2 className="font-heading text-2xl mb-6">Déposer une plainte</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="anonyme"
                    checked={formData.anonyme}
                    onChange={(e) => setFormData({ ...formData, anonyme: e.target.checked })}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <label htmlFor="anonyme" className="text-sm font-medium">
                    Je souhaite rester anonyme
                  </label>
                </div>

                {!formData.anonyme && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet</label>
                      <Input
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone</label>
                      <Input
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Objet de la plainte *</label>
                  <Input
                    value={formData.objet}
                    onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                    required
                    placeholder="Ex: Demande de pot-de-vin, détournement..."
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description détaillée *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={8}
                    required
                    placeholder="Décrivez les faits avec le maximum de détails : lieu, date, personnes impliquées, montants, preuves..."
                    className="bg-background"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Soumettre la plainte
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plaintes;
