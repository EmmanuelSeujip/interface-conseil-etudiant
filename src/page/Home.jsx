import Hero from "../component/Home/Hero";
import TitleDiv from "../component/Shared/TitleDiv";
import Presentation from "../component/Home/Presentation";
const Home = () => {
    return (
        <>
            <Hero />
            <TitleDiv>Pourquoi cette plateforme ?</TitleDiv>
            <Presentation />
        </>
    );
};

export default Home;
