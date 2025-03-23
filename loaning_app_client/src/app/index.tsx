import { Route,  Routes } from "react-router-dom"
import HomePage from "./pages/home-page"
import Container from "./components/container"
import HomeContainer from "./components/HomeContainer"
import UserHome from "./pages/user/UserHome"
import { AuthRoute, PublicRoutes } from "./utils/route-guard"
import UserLoans from "./pages/user/Userloans"
import RegisterPage from "./pages/register"


const Routings = () => {
    return <Routes>
            <Route element={<PublicRoutes/>}>
                <Route element={<Container/>}>
                    <Route path="/" element={<HomePage/>}/>
                </Route>
                <Route path="/register" element={<RegisterPage/>}/>
            </Route>
            <Route element={<AuthRoute/>}>
                <Route element={<HomeContainer/>} path="/user">
                    <Route path="dashboard" element={<UserHome/>}/>
                    <Route path="" element={<UserHome/>}/>
                    <Route path="loans" element={<UserLoans/>}/>
                </Route>
            </Route>
        </Routes>
}
    

export default Routings