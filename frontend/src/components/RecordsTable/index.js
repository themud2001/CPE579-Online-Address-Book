import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

import { useDeleteRecordMutation, useFetchRecordsQuery } from "../../store";
import RecordsTablePlaceholder from "../RecordsTablePlaceholder";

const RecordsTable = () => {
    const navigate = useNavigate();
    const [
        { username, token },
        { searchValue, nearestLocation },
        { longitude, latitude }
    ] = useSelector(state => [state.auth, state.search, state.location]);
    const [page, setPage] = useState(1);
    const [show, setShow] = useState("");
    const {
        isSuccess: isSuccessFetchRecords,
        isError: isErrorFetchRecords,
        isFetching: isFetchingFetchRecords,
        data,
        error: errorFetchRecords
    } = useFetchRecordsQuery({
        page,
        searchValue,
        nearestLocation,
        longitude,
        latitude
    });

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
                    <td>{element.longitude}</td>
                    <td className="d-flex justify-content-between">
                        {element.latitude}
                        {username && (
                            <div className="d-flex gap-1">
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/edit-record?id=${element.id}&name=${element.name}&address=${element.address}&phone=${element.phone}&workField=${element.workField}&longitude=${element.longitude}&latitude=${element.latitude}`)}
                                >
                                    <TiEdit />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => setShow(element.id.toString())}
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
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                >{i + 1}</Pagination.Item>
            );
        }
    }

    const onConfirmDeleteButtonClick = () => {
        if (show && show.trim() !== "" && !isNaN(parseInt(show))) {
            deleteRecord({ id: parseInt(show), token });
            setShow("");
        }
    }
    
    return (
        isErrorFetchRecords ? (
            <h4 className="text-center text-muted mt-5">{errorFetchRecords.data ? errorFetchRecords.data.errorMessage : "An unexpected error occurred"}</h4>
        ) : (
            isFetchingFetchRecords ? (
                <div className="mt-4 shadow-sm">
                    <RecordsTablePlaceholder />
                </div>
            ) : (
                <>
                    <Modal show={show} onHide={() => setShow("")} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Do you really want to delete this record?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="light" onClick={() => setShow("")}>Close</Button>
                            <Button variant="danger" onClick={onConfirmDeleteButtonClick}>Delete</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="mt-4 shadow-sm">
                        <Table striped responsive bordered>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Work Field</th>
                                    <th colSpan="2">Location Coordinates</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isSuccessFetchRecords && renderedRecords}
                            </tbody>
                        </Table>
                    </div>

                    {!searchValue && searchValue.trim() === "" && (
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
                    )}
                </>
            )
        )
    );
};

export default RecordsTable;