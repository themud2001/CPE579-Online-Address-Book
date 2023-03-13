import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Search from "../Search";
import RecordsTable from "../RecordsTable";

const Home = () => {
    return (
        <Container className="mt-4 p-4">
            <Stack direction="horizontal" gap={3}>
                <Search />

                <div className="vr" />

                <Button size="sm" variant="dark" className="shadow-sm">
                    <BsFileEarmarkPlus /> Add Record
                </Button>
            </Stack>

            <RecordsTable />
        </Container>
    );
};

export default Home;