import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { BiSearch } from "react-icons/bi";

import { changeSearch } from "../../store";

const Search = () => {
    const dispatch = useDispatch();
    const [{ searchValue }, location] = useSelector(state => [state.search, state.location]);
    const [search, setSearch] = useState(searchValue || "");

    const handleSearchOnSubmit = e => {
        e.preventDefault();

        const nearestLocation = e.target["nearest-location"].checked;
        dispatch(changeSearch({ searchValue: search, nearestLocation }));
    }

    const handleSearchOnChange = e => {
        setSearch(e.target.value);
    };

    return (
        <Form className="w-100 me-auto" onSubmit={handleSearchOnSubmit}>
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

            <Form.Check
                type="switch"
                id="nearest-location"
                label="Find nearest location"

                disabled={!location.longitude || !location.latitude}
            />
        </Form>
    );
};

export default Search;