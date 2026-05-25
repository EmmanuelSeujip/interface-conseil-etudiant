import Hero from "../component/Home/Hero";
import Presentation from "../component/Home/Presentation";
const Home = () => {
    return (
        <>
            <Hero />
            <div className="px-20 py-10 flex flex-col gap-10 overflow-hidden">
                <Presentation />
            </div>

        </>
    );
};

export default Home;
