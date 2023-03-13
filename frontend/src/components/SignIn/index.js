import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LogIn = () => {
    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="shadow p-4">
                <Card.Body>
                    <Card.Title className="text-center">Sign In</Card.Title>

                    <hr />

                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LogIn;