import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";

const EnhancedModal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer;

        if (!localStorage.getItem("email")) {
            timer = setTimeout(() => setShow(true), 3000);
        }

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const onEmailFormSubmit = formData => {
        if (!localStorage.getItem("email")) {
            localStorage.setItem("email", formData.email);
            reset();
            setShow(false);
            toast.success("E-mail saved!");
        }
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Send Records on E-mail?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onEmailFormSubmit)}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            className="shadow-none"
                            placeholder="name@example.com"
                            isInvalid={errors.email}
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                }
                            })}
                        />

                        <Button type="submit" variant="primary">Subscribe</Button>
                    </InputGroup>
                </Form>

                <Container className="mt-3">
                    <p className="text-muted">We promise that we'll use your E-mail only to send records to and nothing else!</p>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default EnhancedModal;