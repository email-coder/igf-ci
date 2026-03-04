import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Document = Tables<"documents">;

const AdminDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Document | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Programmes", file_url: "", cover_url: "", file_size: "", pages: 0, status: "published" as const });
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    setDocuments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDocuments(); }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "cover") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `documents/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("content").upload(path, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from("content").getPublicUrl(data.path);
      if (type === "file") {
        setForm(f => ({ ...f, file_url: urlData.publicUrl, file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB` }));
      } else {
        setForm(f => ({ ...f, cover_url: urlData.publicUrl }));
      }
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("documents").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editing.id);
    } else {
      await supabase.from("documents").insert({ ...form, published_at: new Date().toISOString() });
    }
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", description: "", category: "Programmes", file_url: "", cover_url: "", file_size: "", pages: 0, status: "published" });
    fetchDocuments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce document ?")) return;
    await supabase.from("documents").delete().eq("id", id);
    fetchDocuments();
  };

  const openEdit = (doc: Document) => {
    setEditing(doc);
    setForm({
      title: doc.title,
      description: doc.description || "",
      category: doc.category,
      file_url: doc.file_url || "",
      cover_url: doc.cover_url || "",
      file_size: doc.file_size || "",
      pages: doc.pages || 0,
      status: doc.status as "published",
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">Gérer les publications et documents</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", description: "", category: "Programmes", file_url: "", cover_url: "", file_size: "", pages: 0, status: "published" }); }}>
          <Plus className="h-4 w-4 mr-2" /> Nouveau document
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{editing ? "Modifier le document" : "Nouveau document"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Titre du document" />
              </div>
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Programmes">Programmes</option>
                  <option value="Rapports">Rapports</option>
                  <option value="Textes">Textes officiels</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fichier PDF</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept=".pdf" onChange={e => handleFileUpload(e, "file")} />
                  {form.file_url && <span className="text-xs text-primary">✓ Uploadé</span>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Couverture (image)</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => handleFileUpload(e, "cover")} />
                  {form.cover_url && <span className="text-xs text-primary">✓ Uploadée</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={uploading}>
                {uploading ? "Upload en cours..." : "Enregistrer"}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Chargement...</div>
          ) : documents.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Aucun document</div>
          ) : (
            <div className="divide-y divide-border">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {doc.cover_url && (
                      <img src={doc.cover_url} alt="" className="h-12 w-9 object-cover rounded border border-border" />
                    )}
                    <div>
                      <p className="font-medium text-foreground truncate">{doc.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                        {doc.file_size && <span className="text-xs text-muted-foreground">{doc.file_size}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(doc)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)}>
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

export default AdminDocuments;
