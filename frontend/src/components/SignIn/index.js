import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { useSignInMutation } from "../../store";

const SignIn = () => {
    const navigate = useNavigate();
    const { username } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signIn, { isSuccess, isLoading, isError, error }] = useSignInMutation();
    
    const handleFormOnSubmit = formData => {
        signIn(formData);
    };

    useEffect(() => {
        if (username) {
            navigate("/");
        }

        if (isSuccess) {
            toast.success("Successfully signed in!");
        }

        if (isError) {
            toast.error(error.data ? error.data.errorMessage : "An unexpected error occurred!");
        }
    }, [
        navigate,
        username,
        isSuccess,
        isError,
        error
    ]);

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
                                autoComplete="none"
                                placeholder="Username"
                                isInvalid={errors.username}
                                {...register("username", { required: "Username is required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                isInvalid={errors.password}
                                {...register("password", { required: "Password is required" })}
                            />
                        </Form.Group>

                        <Button variant="primary" disabled={isLoading} type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignIn;