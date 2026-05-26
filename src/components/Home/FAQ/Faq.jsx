import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        value: "faq-1",
        question: "Comment fonctionne le système de recommandation ?",
        answer:
            "Notre algorithme analyse votre profil scolaire, vos centres d'intérêt et vos aspirations professionnelles. En quelques minutes, il vous propose une liste de filières personnalisées classées par compatibilité.",
    },
    {
        value: "faq-2",
        question: "La plateforme est-elle gratuite ?",
        answer:
            "Oui, l'accès de base est entièrement gratuit. Vous pouvez explorer les filières, comparer les établissements et recevoir des recommandations sans aucun frais. Une offre premium est disponible pour un accompagnement personnalisé avec un conseiller.",
    },
    {
        value: "faq-3",
        question: "Quels types d'établissements sont répertoriés ?",
        answer:
            "Nous référençons les universités publiques et privées, les grandes écoles, les instituts techniques, les écoles de commerce et d'ingénieurs. Notre base de données est mise à jour chaque année.",
    },
    {
        value: "faq-4",
        question: "Puis-je modifier mon profil après l'avoir créé ?",
        answer:
            "Absolument. Votre profil est modifiable à tout moment depuis votre tableau de bord. Chaque mise à jour recalcule automatiquement vos recommandations pour qu'elles restent pertinentes.",
    },
    {
        value: "faq-5",
        question: "Comment prendre rendez-vous avec un conseiller ?",
        answer:
            "Depuis votre espace personnel, accédez à la section « Conseillers » et choisissez un créneau disponible. Les séances se déroulent en visioconférence ou par chat selon votre préférence.",
    },
];

const FaqSection = () => {
    return (
        <section className="px-6 py-20">

            {/* Header */}
            <div className="mb-12 text-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-picton-blue-600 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-picton-blue-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-picton-blue-600" />
                    FAQ
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-picton-blue-900">
                    Questions fréquentes
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Vous avez des questions ? Nous avons les réponses. Si vous ne trouvez
                    pas ce que vous cherchez, contactez-nous directement.
                </p>
            </div>

            {/* Accordion */}
            <Accordion
                type="single"
                collapsible
                defaultValue="faq-1"
                className="mx-auto max-w-2xl"
            >
                {faqs.map(({ value, question, answer }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger className="text-left font-semibold text-picton-blue-900 hover:text-picton-blue-600 hover:no-underline">
                            {question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </section>
    );
};

export default FaqSection;