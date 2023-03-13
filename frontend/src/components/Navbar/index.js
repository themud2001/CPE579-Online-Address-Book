import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FaBookReader } from "react-icons/fa";

const EnhancedNavbar = () => {
    return (
        <Navbar className="sticky-top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <FaBookReader className="me-3" />
                    Online Address Book
                </Navbar.Brand>

                <Button variant="light">Log In</Button>
            </Container>
        </Navbar>
    );
};

export default EnhancedNavbar;