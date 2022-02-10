import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MovieMainPage from "./components/movieapp/MovieMain";
import Auth from "./hoc/auth";
import MovieDetail from "./components/movieapp/MovieDetail";

const NewLandingPage = Auth(LandingPage, null);
const NewLoginPage = Auth(LoginPage, false);
const NewRegisterPage = Auth(RegisterPage, false);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/register" element={<NewRegisterPage />} />
                <Route path="/moviemain" element={<MovieMainPage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
