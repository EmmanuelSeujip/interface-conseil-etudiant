import TitleDiv from "@/component/Home/SharedHome/TitleDiv";

const ValuePresentation = () => {
    return (
        <div className="w-full mx-auto p-4">
            <div className="flex flex-col items-center justify-center ">
                <TitleDiv>Nos avantages</TitleDiv>
                <h1 className="text-4xl font-bold text-center mt-4 mb-4">Tout ce dont vous avez besoin pour bien s'orienter</h1>
                <p className="text-center">Des outils pensés pour simplifier votre parcours et vous guider vers la filière qui vous correspond vraiment.</p>
            </div>
        </div>
    );
};

export default ValuePresentation;