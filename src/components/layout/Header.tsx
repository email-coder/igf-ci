import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import logoIGF from "@/assets/logo-igf-couleur.png";
import motifIGF from "@/assets/motif-igf.png";
import SearchModal from "./SearchModal";

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
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top bar - style Cour des Comptes */}
        <div className="bg-section-dark text-hero-foreground relative overflow-hidden">
          {/* Motif background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${motifIGF})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          />
          
          <div className="container relative z-10 flex items-center justify-between py-4">
            {/* Logo + Title */}
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logoIGF}
                alt="Inspection Générale des Finances"
                className="h-20 md:h-24 lg:h-28 w-auto"
              />
              <div className="hidden md:block border-l border-white/30 pl-4">
                <span className="block text-white/80 text-sm">République de Côte d'Ivoire</span>
                <span className="block text-white font-heading text-lg lg:text-xl">
                  Ministère des Finances et du Budget
                </span>
              </div>
            </Link>

            {/* Right side links */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <Link to="/actualites" className="text-white/80 hover:text-white transition-colors">
                  Actualités
                </Link>
                <span className="text-white/40">|</span>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Nous contacter
                </Link>
              </div>
              
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5 text-white" />
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 hover:bg-white/10 rounded"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Slogan banner */}
        <div className="bg-primary text-primary-foreground py-2 text-center">
          <p className="font-heading text-sm md:text-base italic">
            "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière"
          </p>
        </div>

        {/* Main navigation */}
        <nav className="bg-section-dark hidden lg:block border-t border-white/10">
          <div className="container flex items-center justify-center">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`nav-link flex items-center gap-1 ${
                    location.pathname === item.href ? "active" : ""
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-64 bg-background border border-border shadow-xl animate-fade-in z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-3 text-sm hover:bg-accent hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[180px] bg-background z-50 overflow-y-auto animate-fade-in">
            <nav className="container py-6">
              {navigationItems.map((item) => (
                <div key={item.label} className="border-b border-border">
                  <Link
                    to={item.href}
                    className="block py-4 text-lg font-medium hover:text-primary transition-colors"
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
                          className="block py-2 text-muted-foreground hover:text-primary transition-colors"
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

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
