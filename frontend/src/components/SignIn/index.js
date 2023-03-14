import React from "react";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LogIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormOnSubmit = formData => {
        console.log(formData);
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="shadow p-4">
                <Card.Body>
                    <Card.Title className="text-center">Sign In</Card.Title>

                    <hr />

                    <Form onSubmit={handleSubmit(handleFormOnSubmit)}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <Form.Text style={{ color: "red" }}>{errors.username.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <Form.Text style={{ color: "red" }}>{errors.password.message}</Form.Text>}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LogIn;