import image from "@/asset/image/black-man-woman-writing-report-with-information-from-notebook.webp"
const Presentation = () => {
    return (
        <div className="flex">
            <img src={image} alt="image" className="w-1/2 h-1/2 object-cover" />
            <p className="w-1/2">
                Cette plateforme est conçue pour aider les étudiants à trouver la filière qui leur convient le mieux. 
                Nous offrons des outils pour découvrir les différentes filières, comparer les universités et les écoles, 
                et trouver des conseils pour réussir ses études.
            </p>
        </div>
    );
};

export default Presentation;