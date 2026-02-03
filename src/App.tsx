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

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded in this session
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
        
        {/* Loading Screen - only on first visit */}
        {isLoading && !hasLoaded && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}

        <BrowserRouter>
          {/* AI Assistant - available on all pages */}
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
            {/* Autres pages */}
            <Route path="/mot-inspecteur" element={<Presentation />} />
            <Route path="/organisation" element={<Presentation />} />
            <Route path="/historique" element={<Presentation />} />
            <Route path="/politique-qualite" element={<Presentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;