 import { ReactNode } from "react";
 import { useScrollAnimation } from "@/hooks/useScrollAnimation";
 import { cn } from "@/lib/utils";
 
 interface ScrollSectionProps {
   children: ReactNode;
   className?: string;
   animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "none";
   delay?: number;
 }
 
 const ScrollSection = ({
   children,
   className,
   animation = "fade-up",
   delay = 0,
 }: ScrollSectionProps) => {
   const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
 
   const getAnimationClasses = () => {
     switch (animation) {
       case "fade-up":
         return isVisible
           ? "opacity-100 translate-y-0"
           : "opacity-0 translate-y-12";
       case "fade-left":
         return isVisible
           ? "opacity-100 translate-x-0"
           : "opacity-0 -translate-x-12";
       case "fade-right":
         return isVisible
           ? "opacity-100 translate-x-0"
           : "opacity-0 translate-x-12";
       case "scale":
         return isVisible
           ? "opacity-100 scale-100"
           : "opacity-0 scale-95";
       default:
         return "";
     }
   };
 
   return (
     <div
       ref={ref}
       className={cn(
         "transition-all duration-700 ease-out",
         getAnimationClasses(),
         className
       )}
       style={{ transitionDelay: `${delay}ms` }}
     >
       {children}
     </div>
   );
 };
 
 export default ScrollSection;