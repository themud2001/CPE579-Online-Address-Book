import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";

import "./style.scss";

const EnhancedModal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);

    const onEmailFormSubmit = formData => {
        if (!localStorage.getItem("email")) {
            localStorage.setItem("email", formData.email);
            reset();
            setShow(false);
            toast.success("E-mail saved!");
        }
    };

    const onUnsubscribeButtonClick = () => {
        localStorage.removeItem("email");
        setShow(false);
        toast.success("E-mail removed!");
    };

    const subscribeModal = (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>E-mail Subscription</Modal.Title>
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

    const unsubscribeModal = (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>E-mail Unsubscription</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Do you really want to unsubscribe? You won't receive search results on your E-mail.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={() => setShow(false)}>Close</Button>
                <Button variant="primary" onClick={onUnsubscribeButtonClick}>Unsubscribe</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            <Button
                className="fixed-bottom rounded-circle ms-auto m-3 email-modal-button"
                onClick={() => setShow(true)}
            ><HiOutlineMail /></Button>

            {!localStorage.getItem("email") ? subscribeModal : unsubscribeModal}
        </>
    );
};

export default EnhancedModal;