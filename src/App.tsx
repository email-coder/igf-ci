import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/layout/LoadingScreen";
import AIAssistant from "@/components/chat/AIAssistant";
import Index from "./pages/Index";
import Presentation from "./pages/Presentation";
import GrandesEtapes from "./pages/GrandesEtapes";
import Missions from "./pages/Missions";
import Actualites from "./pages/Actualites";
import Publications from "./pages/Publications";
import Documents from "./pages/Documents";
import Contact from "./pages/Contact";
import Plaintes from "./pages/Plaintes";
import Galerie from "./pages/Galerie";
import FAQ from "./pages/FAQ";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import PlanSite from "./pages/PlanSite";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminGalerie from "./pages/admin/AdminGalerie";
import AdminPlaintes from "./pages/admin/AdminPlaintes";
import AdminPages from "./pages/admin/AdminPages";
import TextesOfficiels from "./pages/TextesOfficiels";
import Agenda from "./pages/Agenda";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("igf-loaded")) {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem("igf-loaded", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {isLoading && !hasLoaded && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}

        <BrowserRouter>
          <AIAssistant />
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/missions/:type" element={<Missions />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<Actualites />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:type" element={<Publications />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plaintes" element={<Plaintes />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/plan-site" element={<PlanSite />} />
            <Route path="/mot-inspecteur" element={<Presentation />} />
            <Route path="/organisation" element={<Presentation />} />
            <Route path="/historique" element={<GrandesEtapes />} />
            <Route path="/grandes-etapes" element={<GrandesEtapes />} />
            <Route path="/politique-qualite" element={<Presentation />} />
            <Route path="/textes-officiels" element={<TextesOfficiels />} />
            <Route path="/textes-officiels/:type" element={<TextesOfficiels />} />
            <Route path="/agenda" element={<Agenda />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="galerie" element={<AdminGalerie />} />
              <Route path="plaintes" element={<AdminPlaintes />} />
              <Route path="pages" element={<AdminPages />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;