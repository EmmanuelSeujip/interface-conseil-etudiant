import Home from "./page/Home"
import FormulaireProfil from "./page/Formulaire"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PageWithHeader from "./component/Shared/PageWithHeader"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<PageWithHeader />}>
                    <Route path="/formulaire" element={<FormulaireProfil />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App  