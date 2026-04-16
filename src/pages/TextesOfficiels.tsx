import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, FileText, ExternalLink, Scale, Building2, Shield, FolderOpen } from "lucide-react";
import { useState } from "react";

type Document = {
  titre: string;
  date: string;
  annee: string;
  lienPdf: string;
};

type Section = {
  titre: string;
  documents: Document[];
};

type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  sections: Section[];
};

const categories: Category[] = [
  {
    id: "igf",
    label: "Inspection Générale des Finances",
    icon: Scale,
    description: "Textes régissant l'organisation et le fonctionnement de l'IGF",
    sections: [
      {
        titre: "Textes de Référence — Décrets",
        documents: [
          { titre: "Décret n° 2024-972 du 31 octobre 2024, portant attributions, organisation et fonctionnement de l'Inspection Générale des Finances", date: "31/10/2024", annee: "2024", lienPdf: "#" },
          { titre: "Décret n° 2014-863 du 23 décembre 2014 portant rattachement de l'IGF au Premier Ministre", date: "23/12/2014", annee: "2014", lienPdf: "#" },
          { titre: "Décret n° 2010-08 du 06 décembre 2010 portant nomination de l'Inspecteur Général des Finances", date: "06/12/2010", annee: "2010", lienPdf: "#" },
          { titre: "Décret n°99-599 du 13 octobre 1999 déterminant les attributions, l'organisation et le fonctionnement de l'IGF", date: "13/10/1999", annee: "1999", lienPdf: "#" },
        ],
      },
      {
        titre: "Textes de Référence — Arrêtés",
        documents: [
          { titre: "Arrêté n°038 MEF/IGF du 17 février 2012 portant création, organisation, attributions et fonctionnement de la Brigade de Lutte contre la Corruption", date: "17/02/2012", annee: "2012", lienPdf: "#" },
        ],
      },
      {
        titre: "Projets et Programmes — Décrets",
        documents: [
          { titre: "Décret n°2019-299 du 3 avril 2019 modifiant le décret n°2015-475 portant procédures et modalités de gestion des projets et programmes financés par les PTFs", date: "03/04/2019", annee: "2019", lienPdf: "#" },
          { titre: "Décret n°2015-475 du 1er juillet 2015 portant procédures et modalités de gestion des projets et programmes financés par les PTFs", date: "01/07/2015", annee: "2015", lienPdf: "#" },
        ],
      },
      {
        titre: "Projets et Programmes — Arrêtés",
        documents: [
          { titre: "Arrêté interministériel N°106/MEF/SEPMBPE du 20 février 2018 portant procédures et modalités d'intervention de l'IGF auprès des projets financés par la Banque Mondiale", date: "20/02/2018", annee: "2018", lienPdf: "#" },
          { titre: "Arrêté interministériel n° 0002/2016/MPMBPE/MPMEF du 04 avril 2016 précisant les PTFs auxquels s'applique le décret n° 2015-475", date: "04/04/2016", annee: "2016", lienPdf: "#" },
        ],
      },
      {
        titre: "Passifs de l'État",
        documents: [
          { titre: "Instruction n° 001/MEF/SEPMBPE/CAB du 13 mai 2019 portant modalités d'exécution des dépenses relatives aux passifs de l'État audités et validés", date: "13/05/2019", annee: "2019", lienPdf: "#" },
        ],
      },
      {
        titre: "Comités — Décrets",
        documents: [
          { titre: "Décret N°2013-763 du 08 novembre 2013 portant création, organisation et fonctionnement du comité d'identification des recettes non fiscales", date: "08/11/2013", annee: "2013", lienPdf: "#" },
        ],
      },
      {
        titre: "Comités — Arrêtés",
        documents: [
          { titre: "Arrêté n° 542/MEF/IGF du 30 novembre 2011 portant désignation des membres du Comité de Suivi des Remboursements de Crédits de TVA", date: "30/11/2011", annee: "2011", lienPdf: "#" },
          { titre: "Arrêté n° 252/MEF/IGF du 07 septembre 2011 portant création du Comité de suivi des remboursements de crédits de TVA", date: "07/09/2011", annee: "2011", lienPdf: "#" },
        ],
      },
    ],
  },
  {
    id: "reformes",
    label: "Réformes des Finances Publiques",
    icon: FileText,
    description: "Directives UEMOA et transpositions en droit national",
    sections: [
      {
        titre: "Directives UEMOA",
        documents: [
          { titre: "Directive n° 03/2012/CM/UEMOA portant comptabilité des matières", date: "29/06/2012", annee: "2012", lienPdf: "#" },
          { titre: "Directive n° 01/2011/CM/UEMOA portant régime financier des collectivités territoriales", date: "24/06/2011", annee: "2011", lienPdf: "#" },
          { titre: "Directive n°10/2009/CN/UEMOA portant Tableau Des Opérations Financières de l'État (TOFE)", date: "26/06/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°09/2009/CN/UEMOA portant plan comptable de l'État (PCE)", date: "26/06/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°08/2009/CN/UEMOA portant nomenclature budgétaire de l'État", date: "26/06/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°07/2009/CN/UEMOA portant règlement général sur la comptabilité publique", date: "26/06/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°06/2009/CM/UEMOA portant lois de finances", date: "26/06/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°02/2009/CM/UEMOA modification TVA", date: "27/03/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°04/2009/CM/UEMOA instituant un guichet unique de dépôt des états financiers", date: "27/03/2009", annee: "2009", lienPdf: "#" },
          { titre: "Directive n°01/2009/CM/UEMOA portant code de transparence dans la gestion des finances publiques", date: "27/03/2009", annee: "2009", lienPdf: "#" },
        ],
      },
      {
        titre: "Transpositions — Lois",
        documents: [
          { titre: "Loi n° 2020-885 portant régime financier des collectivités territoriales et des districts autonomes", date: "21/10/2020", annee: "2020", lienPdf: "#" },
          { titre: "Loi organique 2018-979 déterminant les attributions de la Cour des comptes", date: "27/12/2018", annee: "2018", lienPdf: "#" },
          { titre: "Loi organique n°2014-336 relative aux lois de finances", date: "05/06/2014", annee: "2014", lienPdf: "#" },
          { titre: "Loi organique n°2014-337 portant code de transparence de la gestion des finances publiques", date: "05/06/2014", annee: "2014", lienPdf: "#" },
        ],
      },
      {
        titre: "Transpositions — Décrets",
        documents: [
          { titre: "Décret n° 2018-928 portant comptabilité des matières", date: "12/12/2018", annee: "2018", lienPdf: "#" },
          { titre: "Décret n°2014-419 portant tableau des opérations financières de l'État", date: "09/07/2014", annee: "2014", lienPdf: "#" },
          { titre: "Décret n°2014-418 portant plan comptable de l'État", date: "09/07/2014", annee: "2014", lienPdf: "#" },
          { titre: "Décret n°2014-417 portant nomenclature budgétaire de l'État", date: "09/07/2014", annee: "2014", lienPdf: "#" },
          { titre: "Décret n°2014-416 portant règlement général sur la comptabilité publique", date: "09/07/2014", annee: "2014", lienPdf: "#" },
        ],
      },
    ],
  },
  {
    id: "mef",
    label: "MEF & MBPE",
    icon: Building2,
    description: "Textes organisant les Ministères de l'Économie et du Budget",
    sections: [
      {
        titre: "Ministère des Finances et du Budget",
        documents: [
          { titre: "Décret n° 2023-960 du 06 décembre 2023 portant organisation du Ministère des Finances et du Budget", date: "06/12/2023", annee: "2023", lienPdf: "#" },
          { titre: "Décret n° 2021-454 du 08 septembre 2021 portant organisation du ministère de l'Économie et des Finances", date: "27/10/2022", annee: "2022", lienPdf: "#" },
          { titre: "Décret n° 2020-52 du 15 janvier 2020 modifiant le décret portant organisation du ministère chargé de l'Économie et des Finances", date: "15/01/2020", annee: "2020", lienPdf: "#" },
          { titre: "Décret n° 2016-600 du 3 août 2016 portant organisation du ministère chargé de l'Économie et des Finances", date: "03/08/2016", annee: "2016", lienPdf: "#" },
        ],
      },
      {
        titre: "Ministère du Budget et du Portefeuille de l'État",
        documents: [
          { titre: "Décret n°2021-800 portant organisation du ministère du Budget et du Portefeuille de l'État", date: "08/12/2021", annee: "2021", lienPdf: "#" },
        ],
      },
    ],
  },
  {
    id: "corruption",
    label: "Lutte contre la Corruption",
    icon: Shield,
    description: "Textes relatifs à la prévention et la lutte contre la corruption",
    sections: [
      {
        titre: "Haute Autorité pour la Bonne Gouvernance — Ordonnances",
        documents: [
          { titre: "Ordonnance n°2013-661 du 20 septembre 2013 fixant les attributions, la composition, l'organisation et le fonctionnement de la HABG", date: "20/09/2013", annee: "2013", lienPdf: "#" },
        ],
      },
      {
        titre: "Haute Autorité pour la Bonne Gouvernance — Décrets",
        documents: [
          { titre: "Décret n°2014-213 du 16 avril 2014 portant attributions, organisation et fonctionnement des organes de la HABG", date: "16/04/2014", annee: "2014", lienPdf: "#" },
        ],
      },
      {
        titre: "Ministère de la Promotion de la Bonne Gouvernance — Ordonnances",
        documents: [
          { titre: "Ordonnance n°2013-660 du 20 septembre 2013 relative à la prévention et à la lutte contre la corruption et les infractions assimilées", date: "20/09/2013", annee: "2013", lienPdf: "#" },
        ],
      },
      {
        titre: "Ministère de la Promotion de la Bonne Gouvernance — Décrets",
        documents: [
          { titre: "Décret n° 2022-264 du 13 avril 2022 portant création de la plateforme SPACIA de dénonciation des actes de corruption", date: "13/04/2022", annee: "2022", lienPdf: "#" },
          { titre: "Décret n°2021-463 portant organisation du ministère de la Promotion de la Bonne Gouvernance et de la Lutte contre la Corruption", date: "08/09/2021", annee: "2021", lienPdf: "#" },
        ],
      },
    ],
  },
  {
    id: "autres",
    label: "Autres Textes",
    icon: FolderOpen,
    description: "Marchés publics, lois de finances, établissements publics et autres textes",
    sections: [
      {
        titre: "Textes divers",
        documents: [
          { titre: "Ordonnance n° 2019-679 du 24 juillet 2019 portant Code des Marchés publics", date: "03/11/2021", annee: "2021", lienPdf: "#" },
          { titre: "Loi de finances n° 2021-899 du 21 décembre 2021 portant Budget de l'État pour l'année 2022", date: "21/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Annexe fiscale à la Loi de Finances n° 2021-899 pour l'année 2022", date: "21/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n° 2021-909 fixant les modalités d'exécution des crédits budgétaires dans le cadre du Code des Marchés publics", date: "22/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n° 2021-873 portant attributions, composition et fonctionnement des cellules de Passation des Marchés publics", date: "15/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n° 2021-874 portant modalités d'application des sanctions des violations de la réglementation des Marchés publics", date: "15/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n° 2021-871 portant conditions et modalités de résiliation des marchés publics", date: "15/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n°2021-870 fixant les modalités de constitution des garanties dans les marchés publics", date: "15/12/2021", annee: "2021", lienPdf: "#" },
          { titre: "Décret n°2021-677 portant régime financier et comptable des Établissements publics nationaux", date: "03/11/2021", annee: "2021", lienPdf: "#" },
          { titre: "Loi n°2020-886 relative aux sociétés à participation financière publique", date: "21/10/2020", annee: "2020", lienPdf: "#" },
          { titre: "Décret n° 2020-409 fixant les modalités de saisine de l'Autorité nationale de Régulation des Marchés publics", date: "22/04/2020", annee: "2020", lienPdf: "#" },
          { titre: "Loi n°2020-627 fixant les règles générales relatives aux établissements publics nationaux", date: "14/08/2020", annee: "2020", lienPdf: "#" },
          { titre: "Loi n° 2020-626 portant définition et organisation des sociétés d'État", date: "14/08/2020", annee: "2020", lienPdf: "#" },
          { titre: "Ordonnance n° 2020-385 portant création du Fonds d'Appui aux Acteurs du Secteur informel", date: "15/04/2020", annee: "2020", lienPdf: "#" },
          { titre: "Ordonnance n° 2020-384 portant création du FSPMECOVID19", date: "15/04/2020", annee: "2020", lienPdf: "#" },
          { titre: "Ordonnance n° 2020-383 portant création du FSGE-COVID 19", date: "15/04/2020", annee: "2020", lienPdf: "#" },
          { titre: "Ordonnance n° 2020-382 portant création du Fonds spécial de solidarité COVID-19", date: "15/04/2020", annee: "2020", lienPdf: "#" },
          { titre: "Décret n° 2019-222 portant modalités de mise en œuvre des contrôles financier et budgétaire", date: "13/03/2019", annee: "2019", lienPdf: "#" },
          { titre: "Ordonnance n° 2016-541 fixant les règles générales relatives à la création d'agences d'exécution", date: "20/07/2016", annee: "2016", lienPdf: "#" },
        ],
      },
    ],
  },
];

const DocumentTable = ({ documents }: { documents: Document[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b-2 border-primary/20">
          <th className="text-left py-3 px-4 font-medium text-foreground uppercase tracking-wide text-xs">Titre</th>
          <th className="text-left py-3 px-4 font-medium text-foreground uppercase tracking-wide text-xs w-28">Date</th>
          <th className="text-center py-3 px-4 font-medium text-foreground uppercase tracking-wide text-xs w-20">Année</th>
          <th className="text-center py-3 px-4 font-medium text-foreground uppercase tracking-wide text-xs w-20">Lien</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, i) => (
          <tr key={i} className="border-b border-border hover:bg-accent/30 transition-colors">
            <td className="py-3 px-4 text-muted-foreground leading-relaxed">{doc.titre}</td>
            <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{doc.date}</td>
            <td className="py-3 px-4 text-center">
              <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium rounded">
                {doc.annee}
              </span>
            </td>
            <td className="py-3 px-4 text-center">
              <a
                href={doc.lienPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TextesOfficiels = () => {
  const { type } = useParams<{ type?: string }>();
  const [activeCategory, setActiveCategory] = useState(type || "igf");

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Textes Officiels</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Textes Officiels</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Ensemble des textes législatifs et réglementaires régissant l'organisation 
            et le fonctionnement de l'Inspection Générale des Finances et des institutions connexes.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar — Category navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-2">
              <h3 className="font-heading text-lg mb-4 text-foreground">Catégories</h3>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-start gap-3 p-3 text-left transition-all rounded ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${activeCategory === cat.id ? "text-primary-foreground" : "text-primary"}`} />
                    <div>
                      <span className="text-sm font-medium block">{cat.label}</span>
                      <span className={`text-xs mt-0.5 block ${activeCategory === cat.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {cat.sections.reduce((acc, s) => acc + s.documents.length, 0)} documents
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Contact box */}
              <div className="mt-6 p-4 bg-accent border border-border rounded">
                <p className="text-sm font-medium text-foreground mb-2">Besoin d'un document ?</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Contactez-nous pour toute demande de document officiel.
                </p>
                <Link to="/contact" className="text-xs text-primary font-medium hover:underline">
                  Nous contacter →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Category header */}
            <div className="mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3 mb-2">
                <currentCategory.icon className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-2xl md:text-3xl">{currentCategory.label}</h2>
              </div>
              <p className="text-muted-foreground">{currentCategory.description}</p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {currentCategory.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="font-heading text-lg mb-4 text-foreground border-l-4 border-primary pl-4">
                    {section.titre}
                  </h3>
                  <div className="bg-card border border-border rounded overflow-hidden">
                    <DocumentTable documents={section.documents} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextesOfficiels;
