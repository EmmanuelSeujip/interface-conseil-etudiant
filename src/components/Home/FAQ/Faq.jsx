import Faq from "@/components/ui/faq-sections";
import TitleDiv from "../SharedHome/TitleDiv";

const faqs = [
    {
        question: "Comment le système prédit-il mon résultat académique ?",
        answer:
            "Notre modèle d'intelligence artificielle a été entraîné sur les données de plus de 32 000 étudiants issus du dataset OULAD. Il analyse votre profil (niveau d'éducation, genre, situation personnelle) ainsi que vos habitudes d'apprentissage déclarées pour estimer votre probabilité de réussite et vous proposer des recommandations concrètes.",
    },
    {
        question: "Pourquoi le système me propose deux scénarios différents ?",
        answer:
            "Si votre résultat prédit est défavorable, le système simule automatiquement un second scénario où vous atteignez la réussite (Pass). La comparaison entre les deux situations vous montre exactement quels efforts fournir et quelles ressources prioriser pour inverser la tendance.",
    },
    {
        question: "Mes informations personnelles sont-elles confidentielles ?",
        answer:
            "Oui. Les données que vous saisissez dans le formulaire sont utilisées uniquement pour générer votre recommandation et ne sont jamais stockées ni partagées. Chaque analyse est traitée en temps réel puis effacée.",
    },
    {
        question: "Les recommandations tiennent-elles compte du contexte camerounais ?",
        answer:
            "Absolument. Notre conseiller IA est configuré pour prendre en compte les réalités locales : cumul emploi-études, accès parfois limité à internet, pression familiale et système éducatif camerounais. Les conseils sont adaptés à votre filière et à votre situation réelle.",
    },
    {
        question: "Que signifient les graphiques affichés dans mon résultat ?",
        answer:
            "Chaque graphique a un rôle précis : la jauge indique votre niveau sur les métriques clés, le diagramme circulaire montre la distribution des probabilités entre les quatre résultats possibles (Distinction, Pass, Fail, Withdrawn), et le graphique de comparaison illustre l'écart entre votre situation actuelle et l'objectif de réussite.",
    },
];

const FaqSection = () => {
    return (
        <section className="py-20 flex flex-col items-center justify-center w-full gap-10">
            <TitleDiv>FAQ</TitleDiv>
            <Faq faqs={faqs} />
        </section>
    );
};

export default FaqSection;