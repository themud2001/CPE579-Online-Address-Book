import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { BsFileEarmarkPlus } from "react-icons/bs";

import Search from "../Search";
import RecordsTable from "../RecordsTable";

const Home = () => {
    const { username } = useSelector(state => state.auth);

    return (
        <Container className="mt-4 p-4">
            <Stack direction="horizontal" gap={3}>
                <Search />

                {username && (
                    <>
                        <div className="vr" />

                        <Link to="/add-record" className="btn btn-primary btn-sm shadow-sm">
                            <BsFileEarmarkPlus /> Add Record
                        </Link>
                    </>
                )}
            </Stack>

            <RecordsTable />
        </Container>
    );
};

export default Home;