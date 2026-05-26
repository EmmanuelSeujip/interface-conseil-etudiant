"use client"; // Indispensable pour framer-motion et les hooks React

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TitleDiv from "@/components/Home/SharedHome/TitleDiv";
import BreathingButton from "@/components/Shared/BreathingButton";
import { Brain, ChartBar, MapPin } from "lucide-react";
import AdvantageCard from "./AdvantageCard";

const fadeSlideX = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
});

const textItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const BenefitPresentation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Fusion correcte des variants pour la section gauche
  const leftSectionVariants = {
    hidden: { 
      ...fadeSlideX("left").hidden 
    },
    visible: {
      ...fadeSlideX("left").visible,
      transition: {
        ...fadeSlideX("left").visible.transition,
        staggerChildren: 0.12 // Ajout du stagger sans écraser l'opacité
      }
    }
  };

  return (
    <div ref={ref} className="w-full mx-auto p-4 flex flex-col gap-10">

      {/* Header */}
      <div className="flex justify-between">

        {/* Texte gauche */}
        <motion.div
          className="flex flex-col"
          variants={leftSectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={textItemVariants}>
            <TitleDiv>Nos avantages</TitleDiv>
          </motion.div>

          <motion.h1
            variants={textItemVariants}
            className="text-4xl font-bold mt-4 mb-4 w-3/4 leading-snug text-picton-blue-600"
          >
            Tout ce dont vous avez besoin pour bien s'orienter
          </motion.h1>

          <motion.p variants={textItemVariants} className="w-1/2">
            Des outils pensés pour simplifier votre parcours et vous guider
            vers la filière qui vous correspond vraiment.
          </motion.p>
        </motion.div>

        {/* Bouton droit */}
        <motion.div
          className="flex items-center justify-center"
          variants={fadeSlideX("right")}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <BreathingButton>Commencer le test</BreathingButton>
        </motion.div>

      </div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-3 gap-5"
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={cardVariants}>
          <AdvantageCard icon={Brain} title="IA sur mesure">
            Notre IA est entrainée sur des milliers de profils d'étudiants
            pour vous proposer les filières les plus adaptées.
          </AdvantageCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <AdvantageCard icon={ChartBar} title="Evaluation claire de votre profil">
            Visualisez clairement les différents domaines et filières adaptés
            à votre profil.
          </AdvantageCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <AdvantageCard icon={MapPin} title="Orientation adaptée au contexte">
            Obtenez des recommandations adaptées au contexte du système
            éducatif camerounais.
          </AdvantageCard>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default BenefitPresentation;