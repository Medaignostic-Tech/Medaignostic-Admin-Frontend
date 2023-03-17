import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import {FaEnvelope, FaPhone} from 'react-icons/fa';
import {ImLocation} from 'react-icons/im';

function HomeContact() {
    return (
        <Container
            style={{
            paddingTop: '30px',
            paddingBottom: '30px'
        }}>
            <Row>
                <Col>
                    <h5 style={{
                        fontWeight: 'bold',
                        fontSize: '36px',
                        marginBottom: '20px',
                        color: '#222',
                    }}>Contact Us</h5>
                    <ListGroup>
                        <ListGroup.Item>
                            <FaEnvelope
                                style={{
                                marginRight: '10px'
                            }}/>
                            medaignostic@gmail.com
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FaPhone
                                style={{
                                marginRight: '10px'
                            }}/>
                            +91 8939512050
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <ImLocation
                                style={{
                                marginRight: '10px'
                            }}/>
                            Chennai, Tamil Nadu, India
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeContact;