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
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const resetPasswordNavigate = useNavigate();
    const [alert, setAlert] = useState('');
    const [alert_status, setAlertStatus] = useState('text-danger');
    const [email, setEmail] = useState('');


    const forgotPasswordHandler = async (event) => {
        event.preventDefault();
        const response = auth.forgotPassword(email);
        const status = await response;
        if (status[1] === "success") {
            resetPasswordNavigate("/reset_password", {replace:true, state:{"alert_status":status[1], "alert":status[0]}});
            resetPasswordNavigate(0);
        }
        else if (status[1] === "failure") {
            if (status[0] === "User does not exist") {
                setAlert("User does not exist");
                setAlertStatus('text-danger');
            }
            else {
                resetPasswordNavigate("/reset_password", {replace:true, state:{"alert_status":status[1], "alert":status[0]}});
                resetPasswordNavigate(0);
            }
        }
    };

    return (
        <div className="common-background">
            <MainNavbar />
            <Container className='login-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:3}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/forgot_password">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/forgot_password">Forgot Password</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" required onChange={event => setEmail(event.target.value)}/>
                                    </Form.Group>
                                    <Button variant="dark" type="button" onClick={forgotPasswordHandler}>
                                        Generate Code
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

export default ForgotPassword;