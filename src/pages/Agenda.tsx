import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { useState } from "react";

type AgendaEvent = {
  id: number;
  titre: string;
  date: string;
  dateFin?: string;
  lieu: string;
  type: "formation" | "reunion" | "audit" | "ceremonie" | "conference";
  description: string;
};

const events: AgendaEvent[] = [
  {
    id: 1,
    titre: "Atelier de formation sur la détection des fraudes financières",
    date: "2026-02-02",
    dateFin: "2026-02-06",
    lieu: "Hôtel Tiama, Abidjan-Plateau",
    type: "formation",
    description: "Formation offerte par la GIZ sur la détection des soupçons d'actes de fraude et d'infractions financières lors de la conduite des travaux d'audits.",
  },
  {
    id: 2,
    titre: "Revue de Direction du Système de Management de la Qualité",
    date: "2026-03-15",
    lieu: "Siège de l'IGF, Abidjan",
    type: "reunion",
    description: "Revue périodique du SMQ pour évaluer l'efficacité du système de management de la qualité ISO 9001:2015.",
  },
  {
    id: 3,
    titre: "Audit Qualité Interne",
    date: "2026-04-20",
    dateFin: "2026-04-25",
    lieu: "IGF - Toutes les divisions",
    type: "audit",
    description: "Audit qualité interne annuel pour vérifier la conformité des processus au référentiel ISO 9001:2015.",
  },
  {
    id: 4,
    titre: "Journée portes ouvertes de l'IGF",
    date: "2026-05-10",
    lieu: "Siège de l'IGF, Abidjan-Plateau",
    type: "ceremonie",
    description: "Journée de sensibilisation et de rencontre avec le public et les partenaires institutionnels.",
  },
  {
    id: 5,
    titre: "Conférence régionale sur la gouvernance financière",
    date: "2026-06-18",
    dateFin: "2026-06-20",
    lieu: "Sofitel Hôtel Ivoire, Abidjan",
    type: "conference",
    description: "Conférence annuelle réunissant les inspections générales des finances de la zone UEMOA.",
  },
  {
    id: 6,
    titre: "Session de renforcement des capacités des inspecteurs",
    date: "2026-07-05",
    dateFin: "2026-07-09",
    lieu: "Centre de formation de l'IGF",
    type: "formation",
    description: "Programme de formation continue pour les agents de l'IGF dans les domaines du contrôle et de l'audit internes.",
  },
];

const typeColors: Record<string, string> = {
  formation: "bg-blue-100 text-blue-800 border-blue-200",
  reunion: "bg-amber-100 text-amber-800 border-amber-200",
  audit: "bg-red-100 text-red-800 border-red-200",
  ceremonie: "bg-purple-100 text-purple-800 border-purple-200",
  conference: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const typeLabels: Record<string, string> = {
  formation: "Formation",
  reunion: "Réunion",
  audit: "Audit",
  ceremonie: "Cérémonie",
  conference: "Conférence",
};

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
};

const formatDateFr = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

const Agenda = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => {
      if (e.dateFin) {
        return dateStr >= e.date && dateStr <= e.dateFin;
      }
      return e.date === dateStr;
    });
  };

  const getEventsForMonth = () => {
    const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    return events.filter((e) => e.date.startsWith(monthStr) || (e.dateFin && e.dateFin.startsWith(monthStr)));
  };

  const monthEvents = getEventsForMonth();

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-section-light border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Agenda</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-section-dark text-hero-foreground py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <CalendarIcon className="h-10 w-10 text-primary" />
            <h1 className="font-heading text-4xl md:text-5xl">Agenda</h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl">
            Calendrier des événements, formations, audits et conférences de l'IGF.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              {/* Calendar header */}
              <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
                <button onClick={prevMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="font-heading text-xl md:text-2xl">
                  {MONTHS_FR[currentMonth]} {currentYear}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-border">
                {DAYS_FR.map((day) => (
                  <div key={day} className="py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 md:h-24 border-b border-r border-border bg-muted/30" />
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDate(day);
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                  return (
                    <div
                      key={day}
                      onClick={() => dayEvents.length > 0 ? setSelectedDate(dateStr) : setSelectedDate(null)}
                      className={`h-20 md:h-24 border-b border-r border-border p-1 md:p-2 transition-colors ${
                        dayEvents.length > 0 ? "cursor-pointer hover:bg-accent/50" : ""
                      } ${isToday(day) ? "bg-primary/5" : ""} ${selectedDate === dateStr ? "bg-accent" : ""}`}
                    >
                      <span className={`text-sm font-medium ${isToday(day) ? "bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center" : "text-foreground"}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map((evt) => (
                            <div
                              key={evt.id}
                              className={`text-[10px] md:text-xs px-1 py-0.5 rounded truncate border ${typeColors[evt.type]}`}
                            >
                              <span className="hidden md:inline">{evt.titre.slice(0, 20)}...</span>
                              <span className="md:hidden">•</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3">
              {Object.entries(typeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full border ${typeColors[key]}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="font-heading text-xl mb-4 text-foreground">
                Événements — {MONTHS_FR[currentMonth]}
              </h3>

              {monthEvents.length === 0 ? (
                <div className="p-6 bg-muted/50 border border-border rounded text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Aucun événement ce mois-ci</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {monthEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded flex flex-col items-center justify-center">
                          <span className="text-primary font-bold text-lg leading-none">
                            {new Date(event.date).getDate()}
                          </span>
                          <span className="text-primary text-[10px] uppercase">
                            {MONTHS_FR[new Date(event.date).getMonth()].slice(0, 3)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded border mb-1 ${typeColors[event.type]}`}>
                            {typeLabels[event.type]}
                          </span>
                          <h4 className="text-sm font-medium text-foreground leading-tight mb-2">
                            {event.titre}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDateFr(event.date)}
                              {event.dateFin && ` — ${formatDateFr(event.dateFin)}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.lieu}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick links */}
              <div className="mt-8 p-4 bg-accent border border-border rounded">
                <h4 className="text-sm font-medium text-foreground mb-2">Liens rapides</h4>
                <div className="space-y-2">
                  <Link to="/actualites" className="block text-xs text-primary hover:underline">
                    Dernières actualités →
                  </Link>
                  <Link to="/contact" className="block text-xs text-primary hover:underline">
                    Nous contacter →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
