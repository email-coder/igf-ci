import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface TabContent {
  id: string;
  title: string;
  content: string[];
  link: string;
}

const tabsData: TabContent[] = [
  {
    id: "textes",
    title: "Nos Textes",
    content: [
      "Le décret n°99-599 du 13 octobre 1999 déterminant les attributions, l'organisation et le fonctionnement de l'IGF",
      "Le décret N°2014-863 du 23 décembre 2014 portant rattachement de l'IGF au Premier Ministre",
      "Le décret n°2015-475 du 1er juillet 2015 portant procédures et modalités de gestion des projets et programmes",
      "L'arrêté n°038 MEF/IGF du 17 février 2012 portant création de la Brigade de Lutte contre la Corruption (BLC)"
    ],
    link: "/publications/textes",
  },
  {
    id: "missions",
    title: "Nos Missions",
    content: [
      "Mission générale et permanente de contrôle du bon fonctionnement des services",
      "Missions de contrôle financier et comptable, d'audit et d'évaluation des procédures",
      "Missions de conseil, de vérification, de contrôle y compris les contrôles fiscaux et douaniers",
      "Missions d'appui à la lutte contre la fraude et la corruption",
      "Coordination technique des inspections sectorielles des Ministères"
    ],
    link: "/missions",
  },
  {
    id: "divisions",
    title: "Nos Divisions",
    content: [
      "Division I : Contrôle de l'activité des services - Assure le contrôle du bon fonctionnement",
      "Division II : Lutte contre la fraude - Conduit les missions de vérification et contrôle",
      "Division III : Brigade de Lutte contre la Corruption (BLC) - Combat la corruption"
    ],
    link: "/organisation",
  },
  {
    id: "cellules",
    title: "Nos Cellules",
    content: [
      "Cellule de Coordination des Audits des Projets (CCAP)",
      "Cellule de Suivi des Recommandations (CSR)",
      "Cellule de Documentation et d'Archives (CDA)",
      "Cellule Informatique (CI)"
    ],
    link: "/organisation",
  },
];

const OrganizationTabs = () => {
  const [activeTab, setActiveTab] = useState("textes");

  const activeContent = tabsData.find((tab) => tab.id === activeTab);

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        {/* Tabs navigation */}
        <div className="tab-nav overflow-x-auto">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-nav-item whitespace-nowrap ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeContent && (
          <div className="py-8 animate-fade-in">
            <ul className="space-y-4">
              {activeContent.content.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to={activeContent.link}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-8"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrganizationTabs;
