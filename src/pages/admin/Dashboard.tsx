import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Image, MessageSquareWarning, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ articles: 0, documents: 0, photos: 0, complaints: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [articles, documents, photos, complaints] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("gallery_photos").select("id", { count: "exact", head: true }),
        supabase.from("complaints").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        articles: articles.count || 0,
        documents: documents.count || 0,
        photos: photos.count || 0,
        complaints: complaints.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Articles", value: stats.articles, icon: FileText, color: "text-blue-600 bg-blue-50" },
    { label: "Documents", value: stats.documents, icon: BookOpen, color: "text-primary bg-accent" },
    { label: "Photos", value: stats.photos, icon: Image, color: "text-amber-600 bg-amber-50" },
    { label: "Plaintes", value: stats.complaints, icon: MessageSquareWarning, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble de la gestion du site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-3xl font-heading font-bold text-foreground mt-1">{card.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bienvenue dans le backoffice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Utilisez le menu latéral pour gérer les contenus du site : articles, documents, galerie photos, plaintes et pages institutionnelles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
