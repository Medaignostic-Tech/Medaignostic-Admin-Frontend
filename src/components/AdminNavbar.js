import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/Medaignostic-logos.jpeg';
import '../styles/MainNavbar.css'
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function AdminNavbar() {
    const history = useNavigate();

    const callLogout = () => {
        auth.logout(() => {
            history("/login", {replace: true});
        })
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/admin_dashboard"><img src={ logo } alt="Medaignostic Admin" className="nav-logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                    <Navbar.Collapse id="basic-navbar-nav">  
                        <Nav className="me-auto">
                            <Nav.Link href="/admin_dashboard">Home</Nav.Link>
                            <NavDropdown title="Forms">
                                <NavDropdown.Item href="/add_forms">Add Fields</NavDropdown.Item>
                                <NavDropdown.Item href="/view_forms">View Fields</NavDropdown.Item>
                                <NavDropdown.Item href="/update_forms">Update Fields</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Validations">
                                <NavDropdown.Item href="/add_validations">Add Validations</NavDropdown.Item>
                                <NavDropdown.Item href="/view_validations">View Validations</NavDropdown.Item>
                            </NavDropdown>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="outline-light" onClick={callLogout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavbar;