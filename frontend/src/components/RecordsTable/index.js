import React from "react";
import Table from "react-bootstrap/Table";

import { useFetchRecordsQuery } from "../../store";
import RecordsTablePlaceholder from "../RecordsTablePlaceholder";

const RecordsTable = () => {
    const { isSuccess, isError, isFetching, data, error } = useFetchRecordsQuery();
    let renderedRecords;

    if (isSuccess) {
        renderedRecords = data.records.map(element => {
            return (
                <tr key={element.id}>
                    <td>{element.name}</td>
                    <td>{element.address}</td>
                    <td>{element.phone}</td>
                    <td>{element.workField}</td>
                    <td>{element.coordinates}</td>
                </tr>
            );
        });
    }

    return (
        <div className="mt-5 shadow-sm">
            {isFetching ? (
                <RecordsTablePlaceholder />
            ) : (
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
                        {isSuccess && renderedRecords}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default RecordsTable;