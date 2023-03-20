import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../Navbar";
import Home from "../Home";
import SignIn from "../SignIn";
import AddRecord from "../AddRecord";
import ErrorPage from "../ErrorPage";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/add-record" element={<AddRecord />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;