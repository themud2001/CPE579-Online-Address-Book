import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const EnhancedNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Online Address Book</Navbar.Brand>
                <Button variant="light">Log In</Button>
            </Container>
        </Navbar>
    );
};

export default EnhancedNavbar;