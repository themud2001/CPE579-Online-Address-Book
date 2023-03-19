import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
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

                        <Button size="sm" variant="primary" className="shadow-sm">
                            <BsFileEarmarkPlus /> Add Record
                        </Button>
                    </>
                )}
            </Stack>

            <RecordsTable />
        </Container>
    );
};

export default Home;