import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MovieMainPage from "./components/movieapp/MovieMain";
import Auth from "./hoc/auth";
import MovieDetail from "./components/movieapp/MovieDetail";
import FavoritePage from "./components/movieapp/FavoritePage";
import UploadVideoPage from "./components/youtubeapp/UploadVideoPage";
import YoutubeMainPage from "./components/youtubeapp/YoutubeMainPage";

const NewLandingPage = Auth(LandingPage, null);
const NewLoginPage = Auth(LoginPage, false);
const NewRegisterPage = Auth(RegisterPage, false);
const NewUploadVideoPage = Auth(UploadVideoPage, null)
const NewYoutubeMainPage = Auth(YoutubeMainPage, null)

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/register" element={<NewRegisterPage />} />
                <Route path="/moviemain" element={<MovieMainPage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/favorite" element={<FavoritePage />} />
                <Route path="/video/upload" element={<NewUploadVideoPage />} />
                <Route path="/video/main" element={<NewYoutubeMainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
