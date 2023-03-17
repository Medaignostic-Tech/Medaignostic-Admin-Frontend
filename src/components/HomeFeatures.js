import {Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import aboutImg from '../assets/about2.jpg';
import feature1 from '../assets/feature1.jpg';
import feature2 from '../assets/feature2.jpg';
import feature3 from '../assets/feature3.jpg';
import feature4 from '../assets/feature4.jpg';
import feature5 from '../assets/feature5.jpg';
import feature6 from '../assets/feature6.jpg';
import '../styles/HomeTeam.css';

const HomeFeatures = () => {
    return (
        <div
            style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        }}>
            <Container>
                <h1 className="team-header" style={{
                    fontSize: "56px",
                    color: "white"
                }}>Features</h1>
                <Row className="team-row" style={{
                    paddingBottom: "4%"
                }}>
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature1} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">All reports in one place</Card.Title>
                                <Card.Text className="team-role">Stores all types of medical information and reports for a person</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature2} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">Meaningful insights and summary</Card.Title>
                                <Card.Text className="team-role">Gives meaningful insights and summary by analyzing the patient's report</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature3} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">Supports variety of Medical Reports</Card.Title>
                                <Card.Text className="team-role">Supports various medical reports like X-Ray, CT-Scan and more</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="team-row">
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature4} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">Accurate insights using AI</Card.Title>
                                <Card.Text className="team-role">Gives accurate information and insights about person's medical data using Artificial Intelligence</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature5} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">Security</Card.Title>
                                <Card.Text className="team-role">Stores user's information in a safe and secure manner</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card className="team-card">
                            <Card.Img variant="top" src={feature6} className="team-img"/>
                            <Card.Body>
                                <Card.Title className="team-name">Open Source</Card.Title>
                                <Card.Text className="team-role">Besides all other features medAIgnostic is open source</Card.Text>
                                <Card.Text className="team-desc"></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeFeatures;