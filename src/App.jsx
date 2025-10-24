import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import FavoritesPage from "./components/pages/FavoritesPage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />}/>
                <Route index path='/home' element={<HomePage />}/>
                <Route path='/favorites' element={<FavoritesPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
