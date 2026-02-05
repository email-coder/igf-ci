import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown, ChevronRight, Info } from "lucide-react";
import logoIGF from "@/assets/logo-igf.png";
import SearchModal from "./SearchModal";

// News ticker component
const NewsTicker = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="container">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 px-3 py-1 rounded">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Info</span>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm md:text-base font-medium italic whitespace-nowrap animate-marquee">
              "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière" — Atelier de formation sur « La Détection des soupçons d'actes de fraude et d'infractions financières lors de la conduite des travaux d'audits » offerte par la GIZ, du 02 au 04 février et le 06 février 2026, à l'hôtel Tiama Abidjan-Plateau.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top bar - fond blanc */}
        <div className="bg-white border-b border-border">
          
          <div className="container relative z-10 flex items-center justify-between py-4 md:py-6">
            {/* Logo + Title */}
            <Link to="/" className="flex items-center gap-4 md:gap-6 group">
              <img
                src={logoIGF}
                alt="Inspection Générale des Finances"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto transition-transform group-hover:scale-105"
              />
              <div className="hidden md:block border-l-2 border-primary/30 pl-4 lg:pl-6">
                <span className="block text-muted-foreground text-xs lg:text-sm">République de Côte d'Ivoire</span>
                <span className="block text-foreground font-heading text-lg lg:text-xl xl:text-2xl">
                  Ministère des Finances et du Budget
                </span>
              </div>
            </Link>

            {/* Right side links */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <Link to="/actualites" className="text-muted-foreground hover:text-primary transition-colors">
                  Actualités
                </Link>
                <span className="text-border">|</span>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Nous contacter
                </Link>
              </div>
              
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 md:p-3 hover:bg-accent rounded-full transition-all border border-border hover:border-primary hover:scale-105"
                aria-label="Rechercher"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 hover:bg-accent rounded border border-border"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Green accent bar */}
        <div className="h-1 bg-primary" />

        {/* Main navigation - fond léger */}
        <nav className="bg-muted hidden lg:block border-b border-border shadow-sm">
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
                  className={`flex items-center gap-1 px-4 xl:px-5 py-4 text-sm font-medium uppercase tracking-wider transition-all hover:text-primary hover:bg-accent/50 ${
                    location.pathname === item.href ? "text-primary bg-accent/30" : "text-foreground"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4 transition-transform" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-64 bg-card border border-border shadow-xl animate-fade-in z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-primary transition-all border-l-2 border-transparent hover:border-primary"
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

        {/* News Ticker */}
        <NewsTicker />

        {/* Mobile Navigation - Menu accordéon */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[140px] bg-background z-50 overflow-y-auto animate-fade-in">
            <nav className="container py-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="border-b border-border">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="w-full flex items-center justify-between py-4 text-lg font-medium hover:text-primary transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          className={`h-5 w-5 transition-transform duration-200 ${
                            openMobileDropdown === item.label ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {openMobileDropdown === item.label && (
                        <div className="pb-4 pl-4 space-y-1 animate-fade-in">
                          <Link
                            to={item.href}
                            className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Voir tout
                          </Link>
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
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-4 text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
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