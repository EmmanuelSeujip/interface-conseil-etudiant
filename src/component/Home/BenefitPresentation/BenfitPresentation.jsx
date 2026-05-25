import { Brain, ChartBar, MapPin } from "lucide-react";
import TitleDiv from "@/component/Home/SharedHome/TitleDiv";
import AdvantageCard from "./AdvantageCard";

const BenefitPresentation = () => {
    return (
        <div className="w-full mx-auto p-4 flex flex-col gap-10">
            <div className="flex flex-col items-center justify-center ">
                <TitleDiv>Nos avantages</TitleDiv>
                <h1 className="text-4xl font-bold text-center mt-4 mb-4 w-2/3 leading-snug text-primary">Tout ce dont vous avez besoin pour bien s'orienter</h1>
                <p className="text-center w-1/2">Des outils pensés pour simplifier votre parcours et vous guider vers la filière qui vous correspond vraiment.</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <AdvantageCard icon={Brain} title="IA sur mesure">
                    Notre IA est entrainée sur des millier de profils d'étudiants pour vous proposer les filières les plus adaptées.
                </AdvantageCard>

                <AdvantageCard icon={ChartBar} title="Evaluation claire de votre profil">
                    Visualiser clairemnet les different domaines et filiere adapter a votre profil.
                </AdvantageCard>

                <AdvantageCard icon={MapPin} title="Orientation adaptée au contexte">
                    Obtenez des recommendation adapté au contexte du systeme educatif camerounais.
                </AdvantageCard>
            </div>
        </div>
    );
};

export default BenefitPresentation;