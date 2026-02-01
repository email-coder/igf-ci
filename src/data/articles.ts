import actuCooperationBenin from "@/assets/actu-cooperation-benin.png";
import actuAuditPtua from "@/assets/actu-audit-ptua.png";
import actuVoyageMaroc from "@/assets/actu-voyage-maroc.png";
import actuFormationEvaluation from "@/assets/actu-formation-evaluation.png";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author?: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "cooperation-benin",
    title: "Coopération IGF Côte d'Ivoire - Bénin : Renforcement des liens bilatéraux",
    excerpt: "L'Inspection Générale des Finances de Côte d'Ivoire renforce sa coopération avec son homologue du Bénin dans le cadre d'un partenariat stratégique visant à améliorer les pratiques de contrôle des finances publiques.",
    content: `
      <p>Dans le cadre du renforcement de la coopération Sud-Sud, l'Inspection Générale des Finances de Côte d'Ivoire a accueilli une délégation de l'IGF du Bénin pour une semaine d'échanges d'expériences et de bonnes pratiques.</p>
      
      <h2>Objectifs de la coopération</h2>
      <p>Cette rencontre bilatérale s'inscrit dans une dynamique de partage de connaissances et d'harmonisation des méthodes de travail entre les deux institutions sœurs. Les discussions ont porté sur :</p>
      <ul>
        <li>Les méthodologies d'audit et de contrôle</li>
        <li>La digitalisation des processus de vérification</li>
        <li>La lutte contre la corruption et la fraude</li>
        <li>Le renforcement des capacités des inspecteurs</li>
      </ul>
      
      <h2>Résultats attendus</h2>
      <p>Au terme de cette visite, un protocole d'accord a été signé entre les deux institutions, prévoyant des échanges réguliers de personnel, des formations conjointes et un partage de ressources documentaires.</p>
      
      <p>L'Inspecteur Général des Finances a souligné l'importance de cette coopération : "Ensemble, nous renforçons notre capacité à garantir la bonne gestion des deniers publics dans nos pays respectifs."</p>
    `,
    image: actuCooperationBenin,
    date: "15 Janvier 2025",
    category: "Coopération",
    author: "Service Communication IGF",
  },
  {
    id: "2",
    slug: "audit-ptua",
    title: "Audit du PTUA : L'IGF vérifie l'utilisation des fonds publics",
    excerpt: "L'Inspection Générale des Finances a entrepris une mission d'audit du Programme de Travaux d'Urgence et d'Assainissement (PTUA) afin de s'assurer de la bonne utilisation des ressources allouées.",
    content: `
      <p>L'Inspection Générale des Finances a lancé une mission d'audit approfondie du Programme de Travaux d'Urgence et d'Assainissement (PTUA), un programme majeur d'infrastructures financé par l'État.</p>
      
      <h2>Portée de la mission</h2>
      <p>Cette mission de vérification couvre l'ensemble des dépenses effectuées dans le cadre du PTUA sur les trois dernières années. Les équipes d'audit examinent :</p>
      <ul>
        <li>La conformité des procédures de passation des marchés</li>
        <li>L'effectivité des travaux réalisés</li>
        <li>La qualité des ouvrages construits</li>
        <li>Le respect des délais et des coûts prévus</li>
      </ul>
      
      <h2>Méthodologie employée</h2>
      <p>L'équipe d'audit procède par des vérifications sur pièces et sur place, incluant des visites de chantiers et des entretiens avec les différents acteurs impliqués dans la mise en œuvre du programme.</p>
      
      <p>Les conclusions de cette mission permettront de formuler des recommandations pour améliorer la gestion de ce type de programmes à grande échelle.</p>
    `,
    image: actuAuditPtua,
    date: "10 Janvier 2025",
    category: "Audit",
    author: "Direction de l'Audit",
  },
  {
    id: "3",
    slug: "voyage-etudes-maroc",
    title: "Voyage d'études au Maroc : Échange d'expériences avec l'IGF marocaine",
    excerpt: "Une délégation de l'IGF de Côte d'Ivoire s'est rendue au Royaume du Maroc pour un voyage d'études axé sur les meilleures pratiques en matière de contrôle des finances publiques.",
    content: `
      <p>Dans le cadre de son programme de renforcement des capacités, l'Inspection Générale des Finances a organisé un voyage d'études au Maroc, pays reconnu pour l'excellence de ses institutions de contrôle.</p>
      
      <h2>Programme de la visite</h2>
      <p>La délégation ivoirienne a eu l'opportunité de :</p>
      <ul>
        <li>Visiter l'Inspection Générale des Finances du Royaume du Maroc</li>
        <li>Assister à des présentations sur les systèmes d'information utilisés</li>
        <li>Échanger sur les méthodologies d'audit de performance</li>
        <li>Découvrir les mécanismes de suivi des recommandations</li>
      </ul>
      
      <h2>Enseignements tirés</h2>
      <p>Ce voyage a permis d'identifier plusieurs bonnes pratiques transposables dans le contexte ivoirien, notamment en matière de digitalisation des processus d'audit et de gestion des missions de contrôle.</p>
      
      <p>Un plan d'action a été élaboré pour mettre en œuvre les enseignements tirés de cette expérience enrichissante.</p>
    `,
    image: actuVoyageMaroc,
    date: "5 Janvier 2025",
    category: "Formation",
    author: "Service des Relations Internationales",
  },
  {
    id: "4",
    slug: "formation-evaluation",
    title: "Formation en évaluation des politiques publiques",
    excerpt: "L'IGF organise une session de formation intensive sur l'évaluation des politiques publiques à destination de ses inspecteurs.",
    content: `
      <p>L'Inspection Générale des Finances poursuit son programme de renforcement des compétences avec une formation dédiée à l'évaluation des politiques publiques.</p>
      
      <h2>Contenu de la formation</h2>
      <p>Cette formation de deux semaines aborde les aspects suivants :</p>
      <ul>
        <li>Les fondements théoriques de l'évaluation</li>
        <li>Les différentes approches méthodologiques</li>
        <li>Les outils de collecte et d'analyse de données</li>
        <li>La rédaction de rapports d'évaluation</li>
      </ul>
      
      <h2>Intervenants</h2>
      <p>La formation est assurée par des experts nationaux et internationaux reconnus dans le domaine de l'évaluation des politiques publiques.</p>
      
      <p>À l'issue de cette formation, les participants seront en mesure de conduire des évaluations complètes et de formuler des recommandations pertinentes pour l'amélioration des politiques gouvernementales.</p>
    `,
    image: actuFormationEvaluation,
    date: "20 Décembre 2024",
    category: "Formation",
    author: "Direction de la Formation",
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};

export const getAdjacentArticles = (
  currentSlug: string
): { prev: Article | null; next: Article | null } => {
  const currentIndex = articles.findIndex((article) => article.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  };
};
