import { useState, useEffect } from "react";
import logoIGF from "@/assets/logo-igf-couleur.png";
import motifIGF from "@/assets/motif-igf.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(onLoadingComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-all duration-600 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Motif background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${motifIGF})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            progress > 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <img
            src={logoIGF}
            alt="IGF - Inspection Générale des Finances"
            className="h-24 md:h-32 w-auto"
          />
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p
          className={`mt-4 text-sm text-muted-foreground transition-all duration-500 ${
            progress > 20 ? "opacity-100" : "opacity-0"
          }`}
        >
          Chargement...
        </p>

        {/* Slogan */}
        <p
          className={`mt-8 font-heading text-lg italic text-center text-muted-foreground max-w-md px-4 transition-all duration-700 ${
            progress > 50 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          "Un instrument d'appui à la promotion de la bonne gouvernance économique et financière"
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary" />
    </div>
  );
};

export default LoadingScreen;
