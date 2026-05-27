import { ArrowRight } from "lucide-react";

const AdvantageCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-picton-blue-200 dark:border-picton-blue-800 bg-white dark:bg-picton-blue-950/60 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-picton-blue-500 dark:hover:border-picton-blue-500">

      {/* Cercle décoratif */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-picton-blue-50 dark:bg-picton-blue-900/50" />

      {/* Icône */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-picton-blue-100 dark:bg-picton-blue-900 text-picton-blue-600 dark:text-picton-blue-300">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Titre */}
      <h3 className="mb-3 text-base font-semibold leading-snug text-picton-blue-900 dark:text-picton-blue-100">
        {title}
      </h3>

      {/* Description — flex-1 pour pousser le footer tout en bas */}
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>

      {/* Footer link */}
      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-picton-blue-600">
        En savoir plus
        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>

    </div>
  );
};

export default AdvantageCard;