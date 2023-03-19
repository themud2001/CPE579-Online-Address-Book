import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../Navbar";
import Home from "../Home";
import SignIn from "../SignIn";
import ErrorPage from "../ErrorPage";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;