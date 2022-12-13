import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import auth from '../utils/auth';
import FormTable from './FormTable';
import AdminNavbar from './AdminNavbar';
import { Container, Row, Col } from 'react-bootstrap';

function ViewForms() {
    const loginNavigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated() && await auth.isSuperUser()) {
                const result = await auth.getUser();
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": result}});
                    loginNavigate(0);
                }
            }
            else {
                loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": "You do not have access to this page"}});
                loginNavigate(0);
            }
        }
        fetchData();
    });

    return (
        <div>
            <AdminNavbar />
            <Container fluid className="jumbotron text-white text-center" style={{ marginBottom: '20px' }}>
                <Row>
                    <Col>
                        <h1 className="display-3">View Dynamic Forms</h1>
                    </Col>
                </Row>
            </Container>
            <FormTable />
        </div>
    );
}

export default ViewForms;