import KineticGrid from "./KinecticGrid";
import TextPresentation from "./TextPresentation";
import logo from "@/assets/image/logo.svg"
const Hero = () => {
    return (
        <KineticGrid>
            <header className="p-4 px-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-10 h-10 object-cover" />
                    <div className="text-xl font-bold text-color-picture-blue-500 text-picton-blue-400">Oriention AI</div>
                </div>

                <nav className="flex gap-4 items-center">
                    <div>Accueil</div>
                    <div>Documentation</div>
                    <div>Contact</div>
                    <div className="px-5 py-2 bg-picton-blue-400 h-fit text-white cursor-pointer rounded"> Démarrer mon orientation</div>
                </nav>
            </header>
            <TextPresentation />
        </KineticGrid>
    );
};

export default Hero;       