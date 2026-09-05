import floshLogoImg from "@/assets/flosh-scents-logo.jpg";

interface FloshLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showTagline?: boolean;
  className?: string;
}

export function FloshLogo({ size = "md", showTagline = false, className = "" }: FloshLogoProps) {
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-16 w-16",
    hero: "h-24 w-24 sm:h-28 sm:w-28",
  };

  const textClasses = {
    sm: "text-base tracking-widest",
    md: "text-lg sm:text-xl tracking-widest",
    lg: "text-2xl sm:text-3xl tracking-widest",
    hero: "text-3xl sm:text-4xl tracking-widest",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Gold-and-Black Logo Badge */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-full border border-[#D4AF37]/50 bg-black shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300 hover:border-[#F3E5AB] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] ${sizeClasses[size]}`}
      >
        <img
          src={floshLogoImg}
          alt="Flosh Scents Official Gold & Black Logo"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Brand Name and Tagline */}
      <div className="flex flex-col">
        <span className={`font-display font-bold uppercase ${textClasses[size]} gold-text`}>
          FLOSH SCENTS
        </span>
        {showTagline && (
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-[#C5A059] uppercase">
            SCENT OF CONFIDENCE • ESSENCE OF LUXURY
          </span>
        )}
      </div>
    </div>
  );
}
