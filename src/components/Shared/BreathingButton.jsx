import { motion } from "framer-motion";

const BreathingButton = ({ children, onClick }) => {
  return (
    <div className="relative inline-flex items-center justify-center">

      {/* Anneau de respiration externe */}
      <motion.span
        className="absolute inset-0 rounded-full bg-picton-blue-400"
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Anneau de respiration interne */}
      <motion.span
        className="absolute inset-0 rounded-full bg-picton-blue-300"
        animate={{ scale: [1, 1.10, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Bouton principal */}
      <motion.button
        onClick={onClick}
        className="relative z-10 rounded-full bg-picton-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md cursor-pointer"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </motion.button>

    </div>
  );
};

export default BreathingButton;