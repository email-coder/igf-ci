import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import logoIGFBlanc from "@/assets/logo-igf-blanc.png";

const Footer = () => {
  return (
    <footer className="footer-institutional">
      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <img
              src={logoIGFBlanc}
              alt="IGF"
              className="h-24 w-auto mb-6"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              L'Inspection Générale des Finances est une structure de gouvernance 
              de proximité au service du Ministère des Finances et du Budget.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-white/10 hover:bg-primary transition-colors rounded">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary transition-colors rounded">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary transition-colors rounded">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary transition-colors rounded">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-heading text-xl mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/presentation" className="text-white/70 hover:text-primary transition-colors">
                  Présentation de l'IGF
                </Link>
              </li>
              <li>
                <Link to="/missions" className="text-white/70 hover:text-primary transition-colors">
                  Nos missions
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-white/70 hover:text-primary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-white/70 hover:text-primary transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/plaintes" className="text-white/70 hover:text-primary transition-colors">
                  Plaintes et dénonciations
                </Link>
              </li>
            </ul>
          </div>

          {/* Textes officiels */}
          <div>
            <h3 className="font-heading text-xl mb-6">Textes Officiels</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Décret n°99-599
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Décret N°2014-863
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Décret n°2015-475
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Arrêté n°038 MEF/IGF
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Immeuble SCIAM, 6ème étage<br />
                  Plateau, Abidjan<br />
                  Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+22527222222" className="text-white/70 hover:text-primary transition-colors">
                  +225 27 22 22 22
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@igf.finances.gouv.ci" className="text-white/70 hover:text-primary transition-colors">
                  contact@igf.finances.gouv.ci
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              © {new Date().getFullYear()} Inspection Générale des Finances - République de Côte d'Ivoire. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/plan-site" className="hover:text-primary transition-colors">
                Plan du site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
