import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { BiLogIn } from "react-icons/bi";
import Button  from "react-bootstrap/Button";

import { useFetchAccountDetailsQuery, signOut } from "../../store";
import "./style.scss";
import logo from "./logo_white.png";

const EnhancedNavbar = () => {
    const dispatch = useDispatch();
    const { username, token } = useSelector(state => state.auth);
    useFetchAccountDetailsQuery(token);

    return (
        <Navbar className="sticky-top custom-gradient shadow-sm" bg="primary" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    <img src={logo} height="40" width="40" />
                    
                    Online Address Book
                </Link>

                {!username ? (
                    <Link to="/signin" className="btn btn-outline-light">
                        <BiLogIn /> Sign In
                    </Link>
                ) : (
                    <Button variant="light" onClick={() => dispatch(signOut())}>
                        Sign Out <BiLogIn />
                    </Button>
                )}
            </Container>
        </Navbar>
    );
};

export default EnhancedNavbar;