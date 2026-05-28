import BenefitPresentation from "@/components/Home/BenefitPresentation/BenfitPresentation";
import CtaSection from "@/components/Home/CTA/CtaSection";
import FaqSection from "@/components/Home/FAQ/Faq";
import Hero from "@/components/Home/Hero/Hero";
import Presentation from "@/components/Home/Presentation/Presentation";
import { useHeaderStore } from "@/store/useHeaderStore";
import { useEffect } from "react";

const Home = () => {
    const setNavActive = useHeaderStore((state) => state.setNavActive);
    useEffect(() => {
        setNavActive("accueil");
    }, [setNavActive]);
    return (
        <>
            <Hero />
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-10 flex flex-col gap-10 overflow-hidden">
                <Presentation />
                <BenefitPresentation />
                <FaqSection />
            </div>
            <CtaSection/>
            <div className="px-20 py-5 text-center font-size-10 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 transition-colors duration-300">
                <p>© {new Date().getFullYear()} Open Source, sous licence MIT.</p>
            </div>
        </>
    );
};

export default Home;
