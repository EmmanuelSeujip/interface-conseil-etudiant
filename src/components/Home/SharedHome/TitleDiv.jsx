const TitleDiv = ({ children }) => {
    return (
        <div className="border-1 border-primary w-fit p-2 flex items-center rounded-full text-xs bg-blue-50/30 dark:bg-gray-800/40">
            <h4 className="text-center text-blue-600 dark:text-slate-100">{children}</h4>
        </div>
    );
};

export default TitleDiv;