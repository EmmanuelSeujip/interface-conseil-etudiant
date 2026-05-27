import { useHeaderStore } from "@/store/useHeaderStore";
import { useEffect } from "react";

const Documentation = () => {
    const setNavActive = useHeaderStore((state) => state.setNavActive);
    useEffect(() => {
        setNavActive("documentation");
    }, []);
    return (
        <div>
            <h1>Documentation</h1>
        </div>
    );
};

export default Documentation;