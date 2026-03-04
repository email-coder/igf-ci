import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Article = Tables<"articles">;

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", category: "Actualité", excerpt: "", content: "", status: "draft" as string });

  const fetchArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleSave = async () => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const status = form.status as "draft" | "published" | "archived";
    
    if (editing) {
      await supabase.from("articles").update({ title: form.title, slug, category: form.category, excerpt: form.excerpt, content: form.content, status, updated_at: new Date().toISOString() }).eq("id", editing.id);
    } else {
      await supabase.from("articles").insert([{ title: form.title, slug, category: form.category, excerpt: form.excerpt, content: form.content, status, published_at: status === "published" ? new Date().toISOString() : null }]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", slug: "", category: "Actualité", excerpt: "", content: "", status: "draft" });
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    await supabase.from("articles").delete().eq("id", id);
    fetchArticles();
  };

  const openEdit = (article: Article) => {
    setEditing(article);
    setForm({
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt || "",
      content: article.content || "",
      status: article.status as "draft",
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Articles</h1>
          <p className="text-sm text-muted-foreground">Gérer les actualités du site</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", slug: "", category: "Actualité", excerpt: "", content: "", status: "draft" }); }}>
          <Plus className="h-4 w-4 mr-2" /> Nouvel article
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{editing ? "Modifier l'article" : "Nouvel article"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'article" />
              </div>
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Extrait</Label>
              <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Résumé court" />
            </div>
            <div className="space-y-2">
              <Label>Contenu</Label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Contenu de l'article" />
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>Enregistrer</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Chargement...</div>
          ) : articles.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Aucun article</div>
          ) : (
            <div className="divide-y divide-border">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={article.status === "published" ? "default" : "secondary"} className="text-xs">
                        {article.status === "published" ? "Publié" : article.status === "draft" ? "Brouillon" : "Archivé"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminArticles;
