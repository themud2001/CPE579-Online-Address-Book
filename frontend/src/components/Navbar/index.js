import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FaBookReader } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Button  from "react-bootstrap/Button";

import { useFetchAdminDetailsQuery, setCredentials, signOut } from "../../store";
import "./style.scss";

const EnhancedNavbar = () => {
    const dispatch = useDispatch();
    const { username, token } = useSelector(state => state.auth);
    const { isSuccess, data } = useFetchAdminDetailsQuery(token);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials({ ...data, token }));
        }
    }, [data, dispatch]);

    return (
        <Navbar className="sticky-top custom-gradient shadow-sm" bg="primary" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    <FaBookReader className="me-3" />
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