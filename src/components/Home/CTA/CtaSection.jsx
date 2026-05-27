import { ArrowRight } from "lucide-react";
import ctaBackground from "@/assets/image/cta-background.webp";

const CtaSection = () => {
  return (
    <div className="flex justify-center items-center px-4 sm:px-6 md:px-10 py-6 sm:py-10 w-full">
      <div className="w-full mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-picton-blue-600 via-picton-blue-700 to-picton-blue-950">
        <div className="relative flex flex-col md:flex-row min-h-64 md:min-h-80">

          {/* Cercles décoratifs — masqués sur mobile pour clarté */}
          <div className="pointer-events-none hidden md:block absolute -top-14 right-72 h-52 w-52 rounded-full bg-white/5 z-5" />
          <div className="pointer-events-none hidden md:block absolute -bottom-20 left-28 h-72 w-72 rounded-full bg-white/[0.03]" />
          <div className="pointer-events-none hidden md:block absolute top-5 right-80 h-20 w-20 rounded-full bg-picton-blue-400/25" />

          {/* Contenu texte */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 sm:px-10 py-8 sm:py-12">

            {/* Badge */}
            <span className="mb-4 sm:mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-picton-blue-200">
              Orientation scolaire
            </span>

            {/* Titre */}
            <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Trouve ta filière,{" "}
              <span className="text-picton-blue-300">construis ton avenir</span>
            </h2>

            {/* Description */}
            <p className="mb-6 sm:mb-8 max-w-sm text-sm sm:text-md leading-relaxed text-white/70">
              Rejoins des milliers d'étudiants qui ont trouvé leur voie grâce à
              nos recommandations personnalisées et l'accompagnement de nos
              conseillers.
            </p>

            {/* Boutons — flex-wrap pour éviter le débordement sur mobile */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-picton-blue-600 transition-transform hover:-translate-y-0.5 cursor-pointer"
                onClick={() => window.location.href = "/formulaire"}
              >
                Débuter maintenant
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 cursor-pointer"
                onClick={() => window.location.href = "/documentation"}
              >
                En savoir plus
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 cursor-pointer"
                onClick={() => window.location.href = "/contact"}
              >
                Nous contacter
              </button>
            </div>

          </div>

          {/* Image — cachée sur mobile, visible à partir de md */}
          <div className="hidden md:block relative w-96 lg:w-120 flex-shrink-0">
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