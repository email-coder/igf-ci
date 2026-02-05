import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, Send, Shield, UserX, User, FileText, MapPin, Calendar, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Plaintes = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    objet: "",
    description: "",
    lieu: "",
    date: "",
    type: "",
    mode: "anonyme" as "anonyme" | "identifie",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Plainte enregistrée",
      description: "Votre plainte a été transmise à la Brigade de Lutte contre la Corruption. Un numéro de suivi vous sera communiqué.",
    });
    setFormData({ nom: "", email: "", telephone: "", objet: "", description: "", lieu: "", date: "", type: "", mode: "anonyme" });
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
            <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
              <h3 className="font-heading text-lg mb-2">Important</h3>
              <p className="text-sm text-muted-foreground">
                Donner de l'argent pour obtenir un service public est un acte de corruption. 
                N'hésitez pas à le signaler.
              </p>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg mb-2">Protection des lanceurs d'alerte</h3>
              <p className="text-sm text-muted-foreground">
                Votre identité sera protégée. Vous pouvez également déposer une plainte anonyme.
              </p>
            </div>

            <div className="bg-section-light p-6 rounded-lg border border-border">
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

            <div className="bg-muted p-6 rounded-lg border border-border">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading text-lg mb-2">Suivi de plainte</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Vous avez déjà déposé une plainte ? Suivez son évolution.
              </p>
              <Input placeholder="Numéro de suivi" className="bg-background" />
              <Button variant="outline" className="w-full mt-3">
                Vérifier le statut
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-border">
              <h2 className="font-heading text-2xl mb-2">Déposer une plainte</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Remplissez le formulaire ci-dessous pour signaler un acte de corruption ou de mauvaise gestion.
              </p>

              {/* Mode Selection */}
              <div className="mb-8 p-6 bg-muted rounded-lg">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Mode de dépôt
                </h3>
                <RadioGroup
                  value={formData.mode}
                  onValueChange={(value: "anonyme" | "identifie") => setFormData({ ...formData, mode: value })}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.mode === "anonyme" ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`}>
                    <RadioGroupItem value="anonyme" id="anonyme" className="mt-1" />
                    <Label htmlFor="anonyme" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <UserX className="h-4 w-4 text-primary" />
                        <span className="font-medium">Anonyme</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Votre identité restera confidentielle
                      </p>
                    </Label>
                  </div>
                  <div className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.mode === "identifie" ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`}>
                    <RadioGroupItem value="identifie" id="identifie" className="mt-1" />
                    <Label htmlFor="identifie" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-medium">Identifié</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un suivi personnalisé
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info - Only if identified */}
                {formData.mode === "identifie" && (
                  <div className="space-y-6 p-6 bg-section-light rounded-lg border border-border">
                    <h3 className="font-medium flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Vos coordonnées
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Nom complet *</Label>
                        <Input
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          required={formData.mode === "identifie"}
                          placeholder="Votre nom et prénom"
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Téléphone *</Label>
                        <Input
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          required={formData.mode === "identifie"}
                          placeholder="+225 XX XX XX XX XX"
                          className="bg-background"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium mb-2 block">Email *</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required={formData.mode === "identifie"}
                          placeholder="votre.email@exemple.com"
                          className="bg-background"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Complaint Details */}
                <div className="space-y-6">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Détails de la plainte
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Type d'infraction *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corruption">Corruption</SelectItem>
                          <SelectItem value="detournement">Détournement de fonds</SelectItem>
                          <SelectItem value="abus">Abus de pouvoir</SelectItem>
                          <SelectItem value="fraude">Fraude fiscale/douanière</SelectItem>
                          <SelectItem value="mauvaise-gestion">Mauvaise gestion</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Date des faits</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="bg-background pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Lieu des faits</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={formData.lieu}
                        onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                        placeholder="Ville, administration, service..."
                        className="bg-background pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Objet de la plainte *</Label>
                    <Input
                      value={formData.objet}
                      onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                      required
                      placeholder="Résumé bref de la plainte"
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Description détaillée *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      required
                      placeholder="Décrivez les faits avec le maximum de détails : circonstances, personnes impliquées, montants, preuves disponibles..."
                      className="bg-background"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Pièces jointes</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Glissez vos fichiers ici ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, images, documents (max 10 Mo)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-border">
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre la plainte
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    En soumettant ce formulaire, vous certifiez que les informations fournies sont exactes à votre connaissance.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plaintes;
