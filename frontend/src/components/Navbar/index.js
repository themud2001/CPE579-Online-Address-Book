import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FaBookReader } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

import "./style.scss";

const EnhancedNavbar = () => {
    return (
        <Navbar className="sticky-top custom-gradient shadow-sm" bg="primary" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    <FaBookReader className="me-3" />
                    Online Address Book
                </Link>

                <Link to="/signin" className="btn btn-outline-light">
                    <BiLogIn /> Sign In
                </Link>
            </Container>
        </Navbar>
    );
};

export default EnhancedNavbar;