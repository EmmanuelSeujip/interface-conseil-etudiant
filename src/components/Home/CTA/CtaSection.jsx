import { ArrowRight } from "lucide-react";
import ctaBackground from "@/assets/image/cta-background.webp";

const CtaSection = () => {
  return (
    <div className="flex justify-center items-center p-10 w-full">
    <div className="w-full mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-picton-blue-600 via-picton-blue-700 to-picton-blue-950">
      <div className="relative flex min-h-80">

        {/* Cercles décoratifs */}
        <div className="pointer-events-none absolute -top-14 right-72 h-52 w-52 rounded-full bg-white/5 z-5" />
        <div className="pointer-events-none absolute -bottom-20 left-28 h-72 w-72 rounded-full bg-white/[0.03]" />
        <div className="pointer-events-none absolute top-5 right-80 h-20 w-20 rounded-full bg-picton-blue-400/25" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 py-12">

          {/* Badge */}
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-picton-blue-200">
            Orientation scolaire
          </span>

          {/* Titre */}
          <h2 className="mb-3 text-5xl font-extrabold leading-tight tracking-tight text-white">
            Trouve ta filière,{" "}
            <span className="text-picton-blue-300">construis ton avenir</span>
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-sm text-md leading-relaxed text-white/70">
            Rejoins des milliers d'étudiants qui ont trouvé leur voie grâce à
            nos recommandations personnalisées et l'accompagnement de nos
            conseillers.
          </p>

          {/* Boutons */}
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-picton-blue-600 transition-transform hover:-translate-y-0.5">
              Débuter maintenant
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10">
              En savoir plus
            </button>
          </div>

        </div>

        {/* Image */}
        <div className="relative w-120 flex-shrink-0">
          <img
            src={ctaBackground}
            alt="Étudiante devant une université"
            className="h-full w-full object-cover object-top"
          />
          {/* Fondu gauche */}
          <div className="absolute inset-0 bg-gradient-to-r from-picton-blue-600 via-picton-blue-600/40 to-transparent" />
        </div>

      </div>
    </div>
    </div>
  );
};

export default CtaSection;