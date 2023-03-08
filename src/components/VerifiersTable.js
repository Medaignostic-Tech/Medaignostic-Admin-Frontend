import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/auth";

function VerifiersTable() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const dashboardNavigate = useNavigate();

    const handlePaginationForward = () => {
        if (data.length !== 0) {
            setPage(page + 1);
        }
    }

    const handlePaginationBackward = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleDelete = async(id) => {
        const response = await auth.deleteVerifier(id);
        alert(response);
        dashboardNavigate("/admin_dashboard", {replace: true});
        dashboardNavigate(0);
    }

    useEffect(() => {
        const fetchData = async(pageNo) => {
            const d = await auth.getVerifiersByPage(pageNo);
            if (d.length === 0) {
                setPage(page - 1);
            }
            setData(d);
        }

        fetchData(page);

    }, [page]);

    return (
        <div>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Table bordered hover responsive variant='light'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Verifier Name</th>
                                    <th>Verifier Email</th>
                                    <th>Validation</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{((page - 1) * 10) + (index + 1)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.validation_name}</td>
                                        <td>
                                            <Button variant='danger' onClick={async() => await handleDelete(item._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination>
                            <Pagination.Item onClick={handlePaginationBackward}>Previous</Pagination.Item>
                            <Pagination.Item onClick={handlePaginationForward}>Next</Pagination.Item>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default VerifiersTable;