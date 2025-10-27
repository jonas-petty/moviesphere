import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Favorites from "./pages/Favorites";
import Movie from "./pages/Movie";
import Share from "./pages/Share";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/share/:token" element={<Share />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
