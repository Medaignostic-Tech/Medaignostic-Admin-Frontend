import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/auth";

function FormTable() {
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
        const response = await auth.deleteForm(id);
        alert(response);
        dashboardNavigate("/admin_dashboard", {replace: true});
        dashboardNavigate(0);
    }

    const handleUpdate = (id, organ, name, label, type, option) => {
        const updateData = {
            "id": id,
            "organ": organ,
            "name": name,
            "label": label,
            "type": type,
            "option": option
        }
        dashboardNavigate("/update_forms", {replace: true, state: updateData});
        dashboardNavigate(0, {replace: true, state: updateData});
    }

    useEffect(() => {
        const fetchData = async(pageNo) => {
            const d = await auth.getFormsByPage(pageNo);
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
                                    <th>Organ</th>
                                    <th>Name</th>
                                    <th>Label</th>
                                    <th>Type</th>
                                    <th>Options</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.organ}</td>
                                        <td>{item.name}</td>
                                        <td>{item.label}</td>
                                        <td>{item.type}</td>
                                        <td>{item.option.join(" , ")}</td>
                                        <td>
                                            <Button variant='warning' onClick={() => handleUpdate(item._id, item.organ, item.name, item.label, item.type, item.option.join(";"))}>Update</Button>
                                            &nbsp;&nbsp;&nbsp;
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

export default FormTable;