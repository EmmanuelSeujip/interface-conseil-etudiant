import TitleDiv from "@/components/Home/SharedHome/TitleDiv";
import BreathingButton from "@/components/Shared/BreathingButton";
import { Brain, ChartBar, MapPin } from "lucide-react";
import AdvantageCard from "./AdvantageCard";

const BenefitPresentation = () => {
    return (
        <div className="w-full mx-auto p-4 flex flex-col gap-10">
            <div className="flex justify-between">
                <div className="flex flex-col ">
                    <TitleDiv>Nos avantages</TitleDiv>
                    <h1 className="text-4xl font-bold  mt-4 mb-4 w-3/4 leading-snug text-picton-blue-600">Tout ce dont vous avez besoin pour bien s'orienter</h1>
                    <p className=" w-1/2">Des outils pensés pour simplifier votre parcours et vous guider vers la filière qui vous correspond vraiment.</p>
                </div>
                <div className="flex items-center justify-center">
                    <BreathingButton>Commencer le test</BreathingButton>
                </div>
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