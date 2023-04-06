import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Location from "../Location";
import Navbar from "../Navbar";
import Modal from "../Modal";
import Home from "../Home";
import SignIn from "../SignIn";
import AddRecord from "../AddRecord";
import EditRecord from "../EditRecord";
import ErrorPage from "../ErrorPage";

const App = () => {
    return (
        <BrowserRouter>
            <Location />
            <Toaster />
            <Navbar />
            <Modal />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/add-record" element={<AddRecord />} />
                <Route path="/edit-record" element={<EditRecord />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;