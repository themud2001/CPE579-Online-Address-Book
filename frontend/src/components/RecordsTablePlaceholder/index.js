import React from "react";
import Table from "react-bootstrap/Table";
import Placeholder from "react-bootstrap/Placeholder";

const RecordsTablePlaceholder = () => {
    const renderedPlaceholder = [];

    for (let i = 0; i < 10; i++) {
        renderedPlaceholder.push(
            <tr>
                <Placeholder as="td" animation="glow">
                    <Placeholder xs={4 + Math.floor(Math.random() * 4)} />
                </Placeholder>

                <Placeholder as="td" animation="glow">
                    <Placeholder xs={4 + Math.floor(Math.random() * 4)} />
                </Placeholder>

                <Placeholder as="td" animation="glow">
                    <Placeholder xs={4 + Math.floor(Math.random() * 4)} />
                </Placeholder>

                <Placeholder as="td" animation="glow">
                    <Placeholder xs={4 + Math.floor(Math.random() * 4)} />
                </Placeholder>

                <Placeholder as="td" animation="glow">
                    <Placeholder xs={6 + Math.floor(Math.random() * 6)} />
                </Placeholder>
            </tr>
        );
    }

    return (
        <Table striped responsive bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Work Field</th>
                    <th>Location Coordinates</th>
                </tr>
            </thead>

            <tbody>
                {renderedPlaceholder}
            </tbody>
        </Table>
    );
};

export default RecordsTablePlaceholder;