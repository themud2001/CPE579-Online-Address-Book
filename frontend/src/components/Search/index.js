import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BiSearch } from "react-icons/bi";

import { changeSearch } from "../../store";

const Search = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.search);
    const [search, setSearch] = useState(searchValue || "");

    const handleSearchOnSubmit = e => {
        e.preventDefault();
        dispatch(changeSearch(search));
    }

    const handleSearchOnChange = e => {
        setSearch(e.target.value);
    };

    return (
        <Form className="w-100 me-auto shadow-sm" onSubmit={handleSearchOnSubmit}>
            <InputGroup>
                <Form.Control
                    type="text"
                    className="shadow-none"
                    placeholder="Search..."
                    onChange={handleSearchOnChange}
                    value={search}
                />

                <Button type="submit" variant="primary" className="search-submit">
                    <BiSearch />
                </Button>
            </InputGroup>
        </Form>
    );
};

export default Search;