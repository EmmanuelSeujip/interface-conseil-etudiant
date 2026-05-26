import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import image from "@/assets/image/black-man-woman-writing-report-with-information-from-notebook.webp";
import TitleDiv from "@/components/Home/SharedHome/TitleDiv";

const blockVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Presentation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col gap-10 items-center relative">

      {/* Cercles décoratifs de fond */}
      <div className="absolute bg-picton-blue-50 rounded-full z-0 w-60 h-60 -top-20 -right-30" />
      <div className="absolute bg-picton-blue-50 opacity-20 rounded-full z-0 w-40 h-40 -bottom-20 left-1/4" />

      {/* Badge titre */}
      <TitleDiv>A propos de nous</TitleDiv>

      <div className="flex gap-15 w-full z-10">

        {/* Bloc image — slide depuis la gauche */}
        <motion.div
          className="w-1/2 relative"
          custom="left"
          variants={blockVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="absolute bg-picton-blue-300 w-15 h-15 rounded -left-5 -top-5 -z-10" />
          <div className="absolute bg-picton-blue-500 w-20 h-20 rounded -right-8 -bottom-8 -z-10" />
          <img
            src={image}
            alt="Deux étudiants en discussion avec des notes"
            className="w-full object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Bloc contenu — slide depuis la droite */}
        <motion.div
          className="flex-1"
          custom="right"
          variants={blockVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enfants en stagger */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-picton-blue-600"
            >
              Pourquoi cette plateforme?
            </motion.h2>

            <motion.p variants={itemVariants} className="w-full text-justify">
              Cette plateforme est conçue pour aider les étudiants à trouver
              la filière qui leur convient le mieux. Nous offrons des outils
              pour découvrir les différentes filières, comparer les universités
              et les écoles, et trouver des conseils pour réussir ses études.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-picton-blue-400 text-white px-4 py-2 rounded-full cursor-pointer"
              >
                Débuter une recommendation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-picton-blue-400 border border-picton-blue-400 px-4 py-2 rounded-full cursor-pointer"
              >
                En savoir plus
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Presentation;