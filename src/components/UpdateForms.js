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

function UpdateForms() {
    const [alert, setAlert] = useState('');
    const [alert_status, setAlertStatus] = useState('text-danger');
    const [id, setId] = useState('');
    const [organ, setOrgan] = useState('');
    const [type, setType] = useState('');
    const [label, setLabel] = useState('');
    const [option, setOption] = useState('');
    const [name, setName] = useState('');

    const loginNavigate = useNavigate();
    const location = useLocation();

    const formHandler = async (event) => {
        let options = []
        for (let op of option.split(";")) {
            options.push(op);
        }
        event.preventDefault();
        const response = auth.updateForm(id, organ, type, label, name, options);
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
            setLabel(location.state.label);
            setName(location.state.name);
            setOption(location.state.option);
            setOrgan(location.state.organ);
            setType(location.state.type);
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
                                <h1>Update Form Fields</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" placeholder="Enter field id" required onChange={event => setId(event.target.value)} value={id}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="organ">
                                        <Form.Label>Organ</Form.Label>
                                        <Form.Control type="text" placeholder="Enter organ name" required onChange={event => setOrgan(event.target.value.toLowerCase())} value={organ}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="type">
                                        <Form.Label>Field Type</Form.Label><br />
                                        <Form.Check inline name='type' type="radio" placeholder="Radio" label='Radio' onClick={() => setType('radio')} checked={type === "radio"}/>
                                        <Form.Check inline name='type' type="radio" placeholder="Text" label='Text' onClick={() => setType('text')} checked={type === "text"}/>
                                        <Form.Check inline name='type' type="radio" placeholder="Number" label='Number' onClick={() => setType('number')} checked={type === "number"}/>
                                        <Form.Check inline name='type' type="radio" placeholder="File" label='File' onClick={() => setType('file')} checked={type === "file"}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="name">
                                        <Form.Label>Field Name</Form.Label>
                                        <Form.Control type="text" placeholder="Field Name" required onChange={event => setName(event.target.value.toLowerCase())} value={name}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="label">
                                        <Form.Label>Field Label</Form.Label>
                                        <Form.Control type="text" placeholder="Field Label" required onChange={event => setLabel(event.target.value)} value={label}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="options">
                                        <Form.Label>Field Options <br />(Fields for radio buttons, Files accepted for files, Placeholders for others)</Form.Label>
                                        <Form.Control type="text" placeholder="Enter options separated by ';'" required onChange={event => setOption(event.target.value)} value={option}/>
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

export default UpdateForms;