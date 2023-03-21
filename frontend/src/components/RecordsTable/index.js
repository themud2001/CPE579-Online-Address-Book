import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { useDeleteRecordMutation, useFetchRecordsQuery } from "../../store";
import RecordsTablePlaceholder from "../RecordsTablePlaceholder";

const RecordsTable = () => {
    const navigate = useNavigate();
    const { username, token } = useSelector(state => state.auth);
    const [page, setPage] = useState(1);
    const {
        isSuccess: isSuccessFetchRecords,
        isError: isErrorFetchRecords,
        isFetching: isFetchingFetchRecords,
        data,
        error: errorFetchRecords
    } = useFetchRecordsQuery(page);

    const [deleteRecord, {
        isSuccess: isSuccessDeleteRecords,
        isError: isErrorDeleteRecords,
        error: errorDeleteRecords
    }] = useDeleteRecordMutation();

    let renderedRecords;
    let renderedPagination = [];

    useEffect(() => {
        if (isSuccessDeleteRecords) {
            toast.success("Deleted successfully!");
        }

        if (isErrorDeleteRecords) {
            toast.error(errorDeleteRecords.data.errorMessage);
        }
    }, [isSuccessDeleteRecords, isErrorDeleteRecords, errorDeleteRecords]);

    if (isSuccessFetchRecords) {
        renderedRecords = data.records.map(element => {
            return (
                <tr key={element.id}>
                    <td>{element.name}</td>
                    <td>{element.address}</td>
                    <td>{element.phone}</td>
                    <td>{element.workField}</td>
                    <td className="d-flex justify-content-between">
                        {element.coordinates}
                        {username && (
                            <div className="d-flex gap-1">
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/edit-record?id=${element.id}`)}
                                >
                                    <TiEdit />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => deleteRecord({ id: element.id, token })}
                                >
                                    <RiDeleteBinLine />
                                </Button>
                            </div>
                        )}
                    </td>
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
        isErrorFetchRecords && errorFetchRecords.data ? (
            <h4 className="text-center text-muted mt-5">{errorFetchRecords.data.errorMessage}</h4>
        ) : (
            isFetchingFetchRecords ? (
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
                                {isSuccessFetchRecords && renderedRecords}
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