import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./style.scss";

const ErrorPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center error-page">
            <h1>Oops!</h1>
            <p>An unexpected error has occurred!</p>
            <p className="text-muted">404 - Not Found</p>
            <Link to="/">Go back</Link>
        </Container>
    );
};

export default ErrorPage;