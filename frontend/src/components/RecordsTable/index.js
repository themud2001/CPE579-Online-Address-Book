import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

import { useFetchRecordsQuery } from "../../store";
import RecordsTablePlaceholder from "../RecordsTablePlaceholder";

const RecordsTable = () => {
    const [page, setPage] = useState(1);
    const { isSuccess, isError, isFetching, data, error } = useFetchRecordsQuery(page);
    let renderedRecords;
    let renderedPagination = [];

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

        const condition = Math.ceil(data.count / 10);

        for (let i = 0; i < condition; i++) {
            renderedPagination.push(
                <Pagination.Item
                    key={i}
                    active={page == i + 1}
                    onClick={() => setPage(i + 1)}
                >{i + 1}</Pagination.Item>
            );
        }
    }

    return (
        isError && error.data ? (
            <h4 className="text-center text-muted mt-5">{error.data.errorMessage}</h4>
        ) : (
            isFetching ? (
                <div className="mt-4 shadow-sm">
                    <RecordsTablePlaceholder />
                </div>
            ) : (
                <>
                    <div className="mt-4 shadow-sm">
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
                    </div>

                    <Pagination className="justify-content-center mt-3" size="sm">
                        <Pagination.Prev
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            {"<"} Back
                        </Pagination.Prev>

                        {renderedPagination}

                        <Pagination.Next
                            disabled={page >= Math.ceil(data.count / 10)}
                            onClick={() => setPage(page + 1)}
                        >
                            Next {">"}
                        </Pagination.Next>
                    </Pagination>
                </>
            )
        )
    );
};

export default RecordsTable;