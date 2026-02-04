import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink, Facebook, Twitter, Linkedin, Youtube, ChevronRight, Clock } from "lucide-react";
import logoIGF from "@/assets/logo-igf.png";
import certificationISO from "@/assets/certification-iso.png";

const Footer = () => {
  return (
    <footer className="bg-[#F4F4F4] text-foreground relative overflow-hidden">
      {/* Green accent bar top */}
      <div className="h-1 bg-primary" />

      {/* Main footer */}
      <div className="container relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <img
              src={logoIGF}
              alt="IGF"
              className="h-20 md:h-24 w-auto mb-6 bg-white p-2 rounded"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              L'Inspection Générale des Finances est une structure de gouvernance 
              de proximité au service du Ministère des Finances et du Budget.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Certification ISO */}
            <div className="mt-6">
              <img
                src={certificationISO}
                alt="Certification ISO 9001 - Bureau Veritas"
                className="h-14 w-auto"
              />
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-foreground">Liens Rapides</h3>
            <ul className="space-y-3">
              {[
                { label: "Présentation de l'IGF", href: "/presentation" },
                { label: "Nos missions", href: "/missions" },
                { label: "Actualités", href: "/actualites" },
                { label: "Publications", href: "/publications" },
                { label: "Documents", href: "/documents" },
                { label: "Galerie photos", href: "/galerie" },
                { label: "Plaintes et dénonciations", href: "/plaintes" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all hover:translate-x-1 text-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Textes officiels */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-foreground">Textes Officiels</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Décret n°99-599
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Décret N°2014-863
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Décret n°2015-475
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Arrêté n°038 MEF/IGF
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl mb-6 text-foreground">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Immeuble SCIAM, 6ème étage<br />
                  Plateau, Abidjan<br />
                  Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+22527222222" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +225 27 22 22 22
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@igf.finances.gouv.ci" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  contact@igf.finances.gouv.ci
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Lun - Ven: 7h30 - 16h30
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border relative z-10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Inspection Générale des Finances - République de Côte d'Ivoire. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/plan-site" className="hover:text-primary transition-colors">
                Plan du site
              </Link>
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Green accent bar */}
      <div className="h-1 bg-primary relative z-10" />
    </footer>
  );
};

export default Footer;