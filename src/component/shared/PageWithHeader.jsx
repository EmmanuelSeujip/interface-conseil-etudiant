import { Outlet } from "react-router-dom";
import Header from "../header";
const PageWithHeader = () => {
    return (
    <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-10">
            <Outlet />
        </main>
    </>
    );
};

export default PageWithHeader;