import {Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import aboutImg from '../assets/about2.jpg';
import '../styles/HomeTeam.css';

function HomeTeam() {
    return (
        <Container fluid className="team-container">
            <h2 className="team-header">Our Team</h2>
            <Row className="team-row">
                <Col xs={12} sm={3}>
                    <Card className="team-card">
                        <Card.Img variant="top" src={aboutImg} className="team-img"/>
                        <Card.Body>
                            <Card.Title className="team-name">Shrijeeth S</Card.Title>
                            <Card.Text className="team-role">Final Year Student at Rajalakshmi at Engineering College</Card.Text>
                            <Card.Text className="team-desc">
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={3}>
                    <Card className="team-card">
                        <Card.Img variant="top" src={aboutImg} className="team-img"/>
                        <Card.Body>
                            <Card.Title className="team-name">Akiladevi R</Card.Title>
                            <Card.Text className="team-role">Assistant Professor at Rajalakshmi Engineering College</Card.Text>
                            <Card.Text className="team-desc">
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={3}>
                    <Card className="team-card">
                        <Card.Img variant="top" src={aboutImg} className="team-img"/>
                        <Card.Body>
                            <Card.Title className="team-name">Saathvik Krishnan</Card.Title>
                            <Card.Text className="team-role">Final Year Student at Rajalakshmi at Engineering College</Card.Text>
                            <Card.Text className="team-desc">
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={3}>
                    <Card className="team-card">
                        <Card.Img variant="top" src={aboutImg} className="team-img"/>
                        <Card.Body>
                            <Card.Title className="team-name">Rohit M</Card.Title>
                            <Card.Text className="team-role">Final Year Student at Rajalakshmi at Engineering College</Card.Text>
                            <Card.Text className="team-desc">
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeTeam;