import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";

import Navbar from "../Navbar";
import Search from "../Search";
import RecordsTable from "../RecordsTable";

const App = () => {
    return (
        <>
            <Navbar />
            
            <Container className="mt-5">
                <Stack direction="horizontal" gap={3}>
                    <Search />

                    <div className="vr" />

                    <Button variant={"dark"}>
                        <IoMdAdd /> Add Record
                    </Button>
                </Stack>

                <Row className="mt-3">
                    <RecordsTable />
                </Row>
            </Container>
        </>
    );
};

export default App;