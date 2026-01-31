import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Presentation from "./pages/Presentation";
import Missions from "./pages/Missions";
import Actualites from "./pages/Actualites";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Plaintes from "./pages/Plaintes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/missions/:type" element={<Missions />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:slug" element={<Actualites />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:type" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plaintes" element={<Plaintes />} />
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

export default App;
