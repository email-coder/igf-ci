import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Page = Tables<"pages">;

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", content: "", meta_description: "", status: "draft" as const });

  const fetchPages = async () => {
    const { data } = await supabase.from("pages").select("*").order("created_at", { ascending: false });
    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const handleSave = async () => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (editing) {
      await supabase.from("pages").update({ ...form, slug, updated_at: new Date().toISOString() }).eq("id", editing.id);
    } else {
      await supabase.from("pages").insert({ ...form, slug });
    }
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", slug: "", content: "", meta_description: "", status: "draft" });
    fetchPages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette page ?")) return;
    await supabase.from("pages").delete().eq("id", id);
    fetchPages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Pages</h1>
          <p className="text-sm text-muted-foreground">Gérer les pages institutionnelles</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", slug: "", content: "", meta_description: "", status: "draft" }); }}>
          <Plus className="h-4 w-4 mr-2" /> Nouvelle page
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle className="text-lg">{editing ? "Modifier" : "Nouvelle page"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="ex: presentation" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contenu</Label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>Enregistrer</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Chargement...</div>
          ) : pages.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Aucune page</div>
          ) : (
            <div className="divide-y divide-border">
              {pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{page.title}</p>
                    <p className="text-xs text-muted-foreground">/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={page.status === "published" ? "default" : "secondary"} className="text-xs">
                      {page.status === "published" ? "Publié" : "Brouillon"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(page); setForm({ title: page.title, slug: page.slug, content: page.content || "", meta_description: page.meta_description || "", status: page.status as "draft" }); setShowForm(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(page.id)}>
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

export default AdminPages;
