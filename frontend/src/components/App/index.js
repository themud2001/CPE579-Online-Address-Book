import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Search from "../Search";
import RecordsTable from "../RecordsTable";

const App = () => {
    return (
        <Container style={{ marginTop: "50px" }}>
            <Row>
                <Col md={10} sm={7} xs={9}>
                    <Search />
                </Col>

                <Col md={2} sm={5} xs={3}>
                    <Button>Add Record</Button>
                </Col>
            </Row>

            <Row>
                <RecordsTable />
            </Row>
        </Container>
    );
};

export default App;