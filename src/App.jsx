import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PageWithHeader from "./components/Shared/PageWithHeader"
import FormulaireProfil from "./page/Formulaire"
import Home from "./page/Home"
import ContactPage from "./page/Contact"
import Documentation from "./page/Documentation"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route element={<PageWithHeader />}>
                    <Route path="/formulaire" element={<FormulaireProfil />} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/documentation" element={<Documentation/>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App  