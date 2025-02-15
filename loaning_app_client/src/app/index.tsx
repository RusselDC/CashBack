import { Route,  Routes } from "react-router-dom"
import HomePage from "./pages/home-page"
import Container from "./components/container"


const Routings = () => {
    return <Routes>
            <Route path="/" element={<Container/>}>
                <Route index element={<HomePage/>}/>
            </Route>
        </Routes>
}
    

export default Routings