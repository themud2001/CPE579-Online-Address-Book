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
    const { register, handleSubmit, formState: { errors } } = useForm();
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
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <Form.Text style={{ color: "red" }}>{errors.name.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <Form.Text style={{ color: "red" }}>{errors.address.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                {...register("phone", { required: "Phone is required" })}
                            />
                            {errors.phone && <Form.Text style={{ color: "red" }}>{errors.phone.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="workField">
                            <Form.Label>Work field</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Work field"
                                {...register("workField", { required: "Work field is required" })}
                            />
                            {errors.workField && <Form.Text style={{ color: "red" }}>{errors.workField.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="coordinates">
                            <Form.Label>Location Coordinates</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Locatoin Coordinates"
                                {...register("coordinates", { required: "Coordinates are required" })}
                            />
                            {errors.coordinates && <Form.Text style={{ color: "red" }}>{errors.coordinates.message}</Form.Text>}
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