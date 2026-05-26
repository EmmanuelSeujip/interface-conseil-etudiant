import image from "@/asset/image/black-man-woman-writing-report-with-information-from-notebook.webp";
import TitleDiv from "@/components/Home/SharedHome/TitleDiv";
import { motion } from "framer-motion";
const Presentation = () => {
    return (
        <div className="flex flex-col gap-10 items-center relative ">
            <div className="absolute bg-picton-blue-50 rounded-full z-0 w-60 h-60 -top-20 -right-30 z-0 " />
            <div className="absolute bg-picton-blue-50 opacity-20 rounded-full z-20 w-40 h-40 -bottom-20 left-1/4 z-0 " />
            <TitleDiv>A propos de nous</TitleDiv>
            <div className="flex gap-15 w-full z-10">
                <div className="w-1/2 relative">
                    <div className="absolute bg-picton-blue-300 w-15 h-15 rounded -left-5 -top-5 -z-10" />
                    <div className="absolute bg-picton-blue-500 w-20 h-20 rounded -right-8 -bottom-8 -z-10" />
                    <img src={image} alt="image" className="w-full object-cover rounded-2xl shadow-2xl z-20" />
                </div>

                <div className="flex-1 flex flex-col gap-8">
                    <h2 className="text-4xl font-bold text-picton-blue-600">Pourquoi cette plateforme?</h2>
                    <p className="w-full text-justify">
                        Cette plateforme est conçue pour aider les étudiants à trouver la filière qui leur convient le mieux.
                        Nous offrons des outils pour découvrir les différentes filières, comparer les universités et les écoles,
                        et trouver des conseils pour réussir ses études.
                    </p>
                    <div className="flex gap-4">
                        <motion.button whileHover={{ scale: 1.1 }} className="bg-picton-blue-400 text-white px-4 py-2 rounded-full cursor-pointer">Débuter une recommendation</motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="text-picton-blue-400 border border-picton-blue-400 px-4 py-2 rounded-full cursor-pointer">En savoir plus</motion.button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Presentation;