import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import logoIGF from "@/assets/logo-igf.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user has a staff role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);

      if (roleError) throw roleError;

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        throw new Error("Accès refusé. Vous n'avez pas les permissions nécessaires.");
      }

      navigate("/admin");
    } catch (err: any) {
      setError(
        err.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : err.message || "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Green accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
          {/* Header with logo */}
          <div className="bg-gradient-to-b from-primary/5 to-transparent pt-10 pb-6 px-8 text-center">
            <div className="flex justify-center mb-5">
              <img
                src={logoIGF}
                alt="IGF - Inspection Générale des Finances"
                className="h-28 w-auto"
              />
            </div>
            <h1 className="text-xl font-heading text-foreground">
              Espace Administration
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Inspection Générale des Finances
            </p>
          </div>

          {/* Separator */}
          <div className="mx-8 h-px bg-border" />

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="flex items-start gap-3 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">
                Adresse e-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@igf.ci"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-medium uppercase tracking-wider"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-muted-foreground">
              Accès réservé au personnel autorisé de l'IGF
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Inspection Générale des Finances — Côte d'Ivoire
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
