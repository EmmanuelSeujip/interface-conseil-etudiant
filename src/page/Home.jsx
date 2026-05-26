import BenefitPresentation from "@/components/Home/BenefitPresentation/BenfitPresentation";
import CTA from "@/components/Home/CTA/Cta";
import CtaSection from "@/components/Home/CTA/CtaSection";
import FaqSection from "@/components/Home/FAQ/Faq";
import Hero from "@/components/Home/Hero/Hero";
import Presentation from "@/components/Home/Presentation/Presentation";
const Home = () => {
    return (
        <>
            <Hero />
            <div className="px-20 py-10 flex flex-col gap-30 overflow-hidden">
                <Presentation />
                <BenefitPresentation />
                <FaqSection />
            </div>
            <CtaSection/>
        </>
    );
};

export default Home;
