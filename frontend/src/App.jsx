import "./css/App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import UserProfile from "./pages/UserProfile";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import Notifications from "./pages/Notifications";
import PostMovie from "./pages/PostMovie";
import Series from "./pages/Series";
import TvShows from "./pages/TvShows.jsx";

function App() {
    return (
        <>
            <Navbar/>

            <main className="min-h-[90vh]">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/details" element={<MovieDetails/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Navigate to="/" replace/>}/>
                    <Route path="/notifications" element={<Notifications/>}/>
                    <Route path="/series" element={<Series/>}/>
                    <Route path="/tv-shows" element={<TvShows/>}/>
                    <Route path="/post-movie" element={<PostMovie/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </main>

            <Footer/>
        </>
    );
}

export default App;
