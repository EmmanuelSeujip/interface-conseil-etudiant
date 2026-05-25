import BenefitPresentation from "@/component/Home/BenefitPresentation/BenfitPresentation";
import Hero from "@/component/Home/Hero/Hero";
import Presentation from "@/component/Home/Presentation/Presentation";
const Home = () => {
    return (
        <>
            <Hero />
            <div className="px-20 py-10 flex flex-col gap-30 overflow-hidden">
                <Presentation />
                <BenefitPresentation/>
            </div>

        </>
    );
};

export default Home;
