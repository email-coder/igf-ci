import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import logoIGF from "@/assets/logo-igf-couleur.png";

const navigationItems = [
  { label: "Accueil", href: "/" },
  {
    label: "Présentation",
    href: "/presentation",
    children: [
      { label: "L'IGF", href: "/presentation" },
      { label: "Mot de l'Inspecteur Général", href: "/mot-inspecteur" },
      { label: "Organisation", href: "/organisation" },
      { label: "Historique", href: "/historique" },
    ],
  },
  {
    label: "Missions",
    href: "/missions",
    children: [
      { label: "Contrôle", href: "/missions/controle" },
      { label: "Audit", href: "/missions/audit" },
      { label: "Conseil", href: "/missions/conseil" },
      { label: "Lutte contre la corruption", href: "/missions/lutte-corruption" },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "Rapports d'activités", href: "/publications/rapports" },
      { label: "Programmes", href: "/publications/programmes" },
      { label: "Textes officiels", href: "/publications/textes" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-section-dark text-hero-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <span className="hidden md:block">
            Ministère des Finances et du Budget - République de Côte d'Ivoire
          </span>
          <div className="flex items-center gap-4">
            <a href="tel:+22527222222" className="hover:text-primary transition-colors">
              +225 27 22 22 22
            </a>
            <span className="hidden md:inline">|</span>
            <a href="mailto:contact@igf.finances.gouv.ci" className="hidden md:block hover:text-primary transition-colors">
              contact@igf.finances.gouv.ci
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logoIGF}
              alt="Inspection Générale des Finances"
              className="h-20 md:h-28 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                    location.pathname === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-64 bg-background border border-border shadow-lg animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button className="ml-4 p-2 hover:bg-accent rounded transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Slogan banner */}
      <div className="slogan-banner hidden md:block">
        <p className="font-heading text-base italic">
          "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière"
        </p>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-background z-50 overflow-y-auto animate-fade-in">
          <nav className="container py-6">
            {navigationItems.map((item) => (
              <div key={item.label} className="border-b border-border">
                <Link
                  to={item.href}
                  className="block py-4 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pb-4 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block py-2 text-muted-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
