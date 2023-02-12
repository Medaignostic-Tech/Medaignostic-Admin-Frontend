import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from './AdminNavbar';
import '../styles/Login.css'
import auth from '../utils/auth';
import logo from '../assets/Medaignostic-logos.jpeg';
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function UpdateValidations() {
    const [alert, setAlert] = useState('');
    const [alert_status, setAlertStatus] = useState('text-danger');
    const [id, setId] = useState('');
    const [validationName, setValidationName] = useState('');
    const [validationLink, setValidationLink] = useState('');
    const [validationFields, setValidationFields] = useState('');

    const loginNavigate = useNavigate();
    const location = useLocation();

    const formHandler = async (event) => {
        let fields = [];
        for (let field of validationFields.split(";")) {
            fields.push(field);
        }
        event.preventDefault();
        const response = auth.updateValidation(id, validationName, validationLink, fields);
        const status = await response;
        setAlert(status[0]);
        setAlertStatus(status[1]);
    };

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

        if (alert !== "") {
            window.history.replaceState({}, document.title);
        }
        
        if (location.state !== null) {
            setId(location.state.id);
            setValidationName(location.state.validation_name);
            setValidationLink(location.state.validation_link);
            setValidationFields(location.state.field_names);
        }
    }, [alert]);

    return (
        <div>
            <AdminNavbar />
            <Container className='login-content common-background' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <h1>Update Validations</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" placeholder="Enter validation id" required onChange={event => setId(event.target.value)} value={id}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Validation Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter validation name" required onChange={event => setValidationName(event.target.value)} value={validationName}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="link">
                                        <Form.Label>Validation Link</Form.Label>
                                        <Form.Control type="text" placeholder="Enter validation link" required onChange={event => setValidationLink(event.target.value)} value={validationLink}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="fields">
                                        <Form.Label>Validation Fields <br />(Enter validation fields in format : 'organName_fieldName' like 'lungs_q11')</Form.Label>
                                        <Form.Control type="text" placeholder="Enter fields separated by ';'" required onChange={event => setValidationFields(event.target.value)} value={validationFields}/>
                                    </Form.Group>

                                    <Button variant="dark" type="submit" onClick={formHandler}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                            <Card.Footer className={ alert_status }>{ alert }</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateValidations;