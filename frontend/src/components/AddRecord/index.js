import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { useAddRecordMutation } from "../../store";

const AddRecord = () => {
    const { username, token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [addRecord, { isLoading, isSuccess, isError, error }] = useAddRecordMutation();

    useEffect(() => {
        if (!username) {
            navigate("/");
        }

        if (isSuccess) {
            toast.success("Record added!");
        }
    
        if (isError) {
            toast.error(error.data.errorMessage);
        }
    }, [
        navigate,
        username,
        isSuccess,
        isError,
        error
    ]);

    const handleFormOnSubmit = formData => {
        addRecord({ formData, token });
        reset();
    };

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card className="shadow p-4">
                <Card.Body>
                    <Card.Title className="text-center">Add Record</Card.Title>

                    <hr />

                    <Form onSubmit={handleSubmit(handleFormOnSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Name"
                                isInvalid={errors.name}
                                {...register("name", { required: "Name is required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Address"
                                isInvalid={errors.address}
                                {...register("address", { required: "Address is required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Phone"
                                isInvalid={errors.phone}
                                {...register("phone", { required: "Phone is required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="workField">
                            <Form.Label>Work field</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Work field"
                                isInvalid={errors.workField}
                                {...register("workField", { required: "Work field is required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Longitude"
                                isInvalid={errors.longitude}
                                {...register("longitude", { required: "Longitude are required" })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Latitude"
                                isInvalid={errors.latitude}
                                {...register("latitude", { required: "Latitude are required" })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Add Record
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddRecord;