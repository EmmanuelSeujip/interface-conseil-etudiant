import { Outlet } from "react-router-dom";
import Header from "./header";
const PageWithHeader = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default PageWithHeader;