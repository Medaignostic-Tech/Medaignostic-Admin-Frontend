import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/Medaignostic-logos.jpeg';
import '../styles/MainNavbar.css'

function MainNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/"><img src={ logo } alt="Medaignostic Admin" className="nav-logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                    <Navbar.Collapse id="basic-navbar-nav">  
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNavbar;