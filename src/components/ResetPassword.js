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


function ResetPassword() {
    const loginNavigate = useNavigate();

    const [secretCode, setSecretCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState('');

    const resetPasswordHandler = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setAlert("Passwords did not match");
        }
        else {
            const response = auth.resetPassword(secretCode, newPassword);
            const status = await response;
            loginNavigate("/login", {replace:true, state:{"alert_status":status[1], "alert":status[0]}});
            loginNavigate(0);
        }
    }

    return (
        <div className="common-background">
            <MainNavbar />
            <Container className='register-content' fluid={true}>
                <Row className='justify-content-md-center login-form'>
                    <Col md={{span:4}}>
                        <Card className='main-login mb-2' bg='light' text='dark' border='dark'>
                            <Card.Img variant="top" src={ logo } height="300em" />
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/register">
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Secret Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Secret Code" required onChange={event => setSecretCode(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter New Password" required onChange={event => setNewPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password Again" required onChange={event => setConfirmPassword(event.target.value)}/>
                                    </Form.Group>
                                    <Button variant="dark" type="button" onClick={resetPasswordHandler}>
                                        Reset Password
                                    </Button>
                                </Form>
                            </Card.Body>
                            <Card.Footer className="text-danger">{ alert }</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResetPassword;