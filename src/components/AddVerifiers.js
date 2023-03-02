import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from './AdminNavbar';
import VerifierDropdown from './VerifierDropdown';
import '../styles/Login.css'
import auth from '../utils/auth';
import logo from '../assets/Medaignostic-logos.jpeg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVerifiers() {
    const [alert, setAlert] = useState("");
    const [alert_status, setAlertStatus] = useState("text-danger");
    const [doctorsList, setDoctorsList] = useState([]);
    const [validationsList, setValidationsList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedValidation, setSelectedValidation] = useState("");

    const loginNavigate = useNavigate();

    const fetchItems = async () => {
        const doctors = await auth.getDoctors();
        if (doctors == "Invalid or Inactive User" || doctors == "Internal Server Error") {
            return false;
        }
        setDoctorsList(doctors);
        const validations = await auth.getValidations();
        if (validations == "Invalid or Inactive User" || validations == "Internal Server Error") {
            return false;
        }
        setValidationsList(validations);
        return true;
    }

    const formHandler = async (event) => {
        event.preventDefault();
        const response = await auth.addVerifier(selectedDoctor, selectedValidation);
        const status = await response;
        setAlert(status[0]);
        setAlertStatus(status[1]);
    }

    useEffect(() => {
        const fetchData = async () => {
        if (auth.isAuthenticated() && (await auth.isSuperUser())) {
            const result = await auth.getUser();
            if (
            result === "Invalid or Inactive User" ||
            result === "Internal Server Error"
            ) {
            loginNavigate("/login", {
                replace: true,
                state: { alert_status: "failure", alert: result }
            });
            loginNavigate(0);
            }
            let success = await fetchItems();
            if (!success) {
                loginNavigate("/login", {
                    replace: true,
                    state: { alert_status: "failure", alert: result }
                });
                loginNavigate(0);
            }
        } else {
            loginNavigate("/login", {
            replace: true,
            state: {
                alert_status: "failure",
                alert: "You do not have access to this page"
            }
            });
            loginNavigate(0);
        }
        };
        fetchData();

        if (alert !== "") {
        window.history.replaceState({}, document.title);
        }
    }, [alert]);


    return (
        <div>
        <AdminNavbar />
        <Container className="login-content common-background" fluid={true}>
            <Row className="justify-content-md-center login-form">
            <Col md={{ span: 4 }}>
                <Card
                className="main-login mb-2"
                bg="light"
                text="dark"
                border="dark"
                >
                <Card.Img variant="top" src={logo} height="300em" />
                <Card.Header>
                    <h1>Add Verifiers</h1>
                </Card.Header>
                <Card.Body>
                    <VerifierDropdown title="Verifier Name" default="Doctor" key1="name" key2="email" selectKey="_id" data={doctorsList} onSelect={setSelectedDoctor} key1Title="Name" key2Title="Email" />
                    <VerifierDropdown title="Validation Name" default="Validation" key1="validation_name" key2="validation_link" selectKey="_id" data={validationsList} onSelect={setSelectedValidation} key1Title="Validation" key2Title="Link" />
                    <Button variant="dark" type="submit" size="lg" onClick={formHandler}>
                        Submit
                    </Button>
                </Card.Body>
                <Card.Footer className={ alert_status }>{ alert }</Card.Footer>
                </Card>
            </Col>
            </Row>
        </Container>
        </div>
    );
}

export default AddVerifiers;