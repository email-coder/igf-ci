import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Photo = Tables<"gallery_photos">;

const AdminGalerie = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Institutions", year: new Date().getFullYear(), date: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchPhotos = async () => {
    const { data } = await supabase.from("gallery_photos").select("*").order("created_at", { ascending: false });
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleSave = async () => {
    if (!file) return;
    setUploading(true);
    const path = `gallery/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("content").upload(path, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from("content").getPublicUrl(data.path);
      await supabase.from("gallery_photos").insert({
        ...form,
        src: urlData.publicUrl,
      });
    }
    setUploading(false);
    setShowForm(false);
    setForm({ title: "", description: "", category: "Institutions", year: new Date().getFullYear(), date: "" });
    setFile(null);
    fetchPhotos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    await supabase.from("gallery_photos").delete().eq("id", id);
    fetchPhotos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Galerie</h1>
          <p className="text-sm text-muted-foreground">Gérer les photos</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" /> Ajouter une photo
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle className="text-lg">Nouvelle photo</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={uploading || !file}>{uploading ? "Upload..." : "Enregistrer"}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-border">
            <img src={photo.src} alt={photo.title} className="aspect-square w-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button variant="destructive" size="icon" onClick={() => handleDelete(photo.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs p-2 truncate text-foreground">{photo.title}</p>
          </div>
        ))}
      </div>

      {!loading && photos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Aucune photo dans la galerie</div>
      )}
    </div>
  );
};

export default AdminGalerie;
