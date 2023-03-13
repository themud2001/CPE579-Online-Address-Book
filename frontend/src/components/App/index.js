import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";

import Search from "../Search";
import RecordsTable from "../RecordsTable";

const App = () => {
    return (
        <Container style={{ marginTop: "50px" }}>
            <Row>
                <Col md={9} sm={8} xs={8}>
                    <Search />
                </Col>

                <Col md={3} sm={4} xs={4}>
                    <Button variant={"dark"}>
                        <IoMdAdd /> Add Record
                    </Button>
                </Col>
            </Row>

            <Row>
                <RecordsTable />
            </Row>
        </Container>
    );
};

export default App;