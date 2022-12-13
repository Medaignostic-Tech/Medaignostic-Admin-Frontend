import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './MainNavbar';
import '../styles/Login.css'
import auth from '../utils/auth';
import logo from '../assets/Medaignostic-logos.jpeg';
import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function Login() {
    const [alert, setAlert] = useState('');
    const [alert_status, setAlertStatus] = useState('text-danger');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginResult = useLocation();
    const dashboardNavigate = useNavigate();

    const loginHandler = async (event) => {
        event.preventDefault();
        const response = auth.login(email, password);
        const status = await response;
        setAlert(status[0]);
        setAlertStatus(status[1]);
    };

    useEffect(() => {
        const isValid = async() => {
            if (await auth.isSuperUser()) {
                dashboardNavigate("/admin_dashboard", {replace: true});
                dashboardNavigate(0);
            }
            else {
                dashboardNavigate("/doctor_dashboard", {replace: true});
                dashboardNavigate(0);
            }
        }

        if (alert === "Login Success" || alert === "API Error" || alert === "Internal Server Error" || alert === "Invalid Login Credentials" || alert === "User is not verified") {
            window.history.replaceState({}, document.title);
        }
        else if (loginResult.state !== null) {
            if (loginResult.state.alert_status === "success") {
                setAlertStatus('text-success');
            }
            else if (loginResult.state.alert_status === "failure") {
                setAlertStatus('text-danger');
            }
            setAlert(loginResult.state.alert);
        }
        if (alert === "Login Success") {
            isValid();
        }
    }, [alert]);

    return (
        <div>
            <MainNavbar />
            <Container className='login-content common-background' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:3}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/login">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" required onChange={event => setEmail(event.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" required onChange={event => setPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Button variant="dark" type="submit" onClick={loginHandler}>
                                        Submit
                                    </Button>
                                </Form>
                                <Card.Link variant='primary' href='/forgot_password'>
                                    Forgot your Password ?
                                </Card.Link>
                            </Card.Body>
                            <Card.Footer className={ alert_status }>{ alert }</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;