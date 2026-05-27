const TitleDiv = ({ children }) => {
    return (
        <div className="border-1 border-primary w-fit p-2 flex items-center rounded-full text-xs bg-picton-blue-50/30 dark:bg-picton-blue-900/40">
            <h4 className="text-center text-picton-blue-600 dark:text-picton-blue-300">{children}</h4>
        </div>
    );
};

export default TitleDiv;