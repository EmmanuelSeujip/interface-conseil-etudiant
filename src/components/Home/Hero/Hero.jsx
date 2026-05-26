import KineticGrid from "./KinecticGrid";
import TextPresentation from "./TextPresentation";
import logo from "@/assets/image/logo.svg"
const Hero = () => {
    return (
        <KineticGrid>
            <header className="p-4 px-20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-10 h-10 object-cover" />
                    <div className="text-xl font-bold text-color-picture-blue-500">Oriention Academique</div>
                </div>

                <nav className="flex gap-4">
                    <div>Accueil</div>
                    <div>Orientation</div>
                    <div>Documentation</div>
                    <div>Contact</div>
                </nav>
            </header>
            <TextPresentation />
        </KineticGrid>
    );
};

export default Hero;       