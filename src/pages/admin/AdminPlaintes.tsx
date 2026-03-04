import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Complaint = Tables<"complaints">;

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  received: { label: "Reçue", variant: "secondary" },
  in_review: { label: "En examen", variant: "outline" },
  investigating: { label: "Investigation", variant: "default" },
  resolved: { label: "Résolue", variant: "default" },
  rejected: { label: "Rejetée", variant: "destructive" },
};

const AdminPlaintes = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const fetchComplaints = async () => {
    const { data } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
    setComplaints(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchComplaints(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("complaints").update({ status: status as any, updated_at: new Date().toISOString() }).eq("id", id);
    fetchComplaints();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as any } : null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading text-foreground">Plaintes</h1>
        <p className="text-sm text-muted-foreground">Suivi des plaintes et réclamations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Chargement...</div>
              ) : complaints.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">Aucune plainte</div>
              ) : (
                <div className="divide-y divide-border">
                  {complaints.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${selected?.id === c.id ? "bg-accent/50" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{c.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {c.tracking_number} • {new Date(c.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <Badge variant={statusLabels[c.status]?.variant || "secondary"}>
                          {statusLabels[c.status]?.label || c.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          {selected ? (
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-heading text-lg text-foreground">{selected.subject}</h3>
                  <button onClick={() => setSelected(null)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">N° {selected.tracking_number}</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{selected.description}</p>

                {!selected.is_anonymous && (
                  <div className="space-y-1 text-sm">
                    {selected.complainant_name && <p><strong>Nom :</strong> {selected.complainant_name}</p>}
                    {selected.complainant_email && <p><strong>Email :</strong> {selected.complainant_email}</p>}
                    {selected.complainant_phone && <p><strong>Tél :</strong> {selected.complainant_phone}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Changer le statut</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(statusLabels).map(([key, val]) => (
                      <Button
                        key={key}
                        size="sm"
                        variant={selected.status === key ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => updateStatus(selected.id, key)}
                      >
                        {val.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground text-sm">
                Sélectionnez une plainte pour voir les détails
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPlaintes;
