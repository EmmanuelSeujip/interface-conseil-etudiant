import { CtaCard } from "./CtaCard";
import image from "@/assets/image/cta-background.webp";
const CTA = () => {
    return (
        <div>
            <CtaCard
                imageSrc={image}
                imageAlt="CTA Background"
                title="Elevate Your Career"
                subtitle="Unlock Your Full Potential"
                description="Join thousands of successful professionals who have transformed their careers with our expert guidance and resources."
                buttonText="Start Your Journey"
                onButtonClick={() => console.log('CTA button clicked!')}
            />
        </div>
    );
};

export default CTA;