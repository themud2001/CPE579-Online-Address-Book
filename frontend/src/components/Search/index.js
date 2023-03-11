import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <InputGroup>
            <Form.Control className="shadow-none" placeholder="Search..." />

            <Button variant="dark">
                <BiSearch />
            </Button>
        </InputGroup>
    );
};

export default Search;