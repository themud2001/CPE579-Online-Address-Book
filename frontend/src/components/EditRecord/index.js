import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { useEditRecordMutation } from "../../store";

const EditRecord = () => {
    const { username, token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [editRecord, { isLoading, isSuccess, isError, error }] = useEditRecordMutation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!username) {
            navigate("/");
        }

        if (isSuccess) {
            toast.success("Record edited!");
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
        formData.id = searchParams.get("id");
        editRecord({ formData, token });
    };

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card className="shadow p-4">
                <Card.Body>
                    <Card.Title className="text-center">Edit Record</Card.Title>

                    <hr />

                    <Form onSubmit={handleSubmit(handleFormOnSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Name"
                                isInvalid={errors.name}
                                {...register("name", { required: "Name is required", value: searchParams.get("name") })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Address"
                                isInvalid={errors.address}
                                {...register("address", { required: "Address is required", value: searchParams.get("address") })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Phone"
                                isInvalid={errors.phone}
                                {...register("phone", { required: "Phone is required", value: searchParams.get("phone") })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="workField">
                            <Form.Label>Work field</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Work field"
                                isInvalid={errors.workField}
                                {...register("workField", { required: "Work field is required", value: searchParams.get("workField") })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="coordinates">
                            <Form.Label>Location Coordinates</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="none"
                                placeholder="Location Coordinates"
                                isInvalid={errors.coordinates}
                                {...register("coordinates", { required: "Coordinates are required", value: searchParams.get("coordinates") })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Edit Record
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditRecord;