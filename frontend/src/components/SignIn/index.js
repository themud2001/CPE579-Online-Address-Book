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
            toast.error(error.data.errorMessage);
        }
    }, [
        navigate,
        username,
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