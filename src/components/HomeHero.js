import {Container, Row, Col} from 'react-bootstrap';
import heroPic from '../assets/about1.jpg';

function HomeHero() {
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
            <Container
                style={{
                padding: '30px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Row>
                    <Col md={6}>
                        <img
                            src={heroPic}
                            alt="about"
                            style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '10px',
                            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
                            width: '550px',
                            height: '550px'
                        }}/>
                    </Col>
                    <Col
                        md={6}
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div
                            style={{
                            textAlign: 'center'
                        }}>
                            <h1
                                style={{
                                fontSize: '4rem',
                                marginBottom: '2rem',
                                color: '#203d79'
                            }}>Automated Medical Diagnosis Tool (Admin)</h1>
                            <p
                                style={{
                                fontSize: '1.5rem',
                                marginBottom: '2rem',
                                color: '#666'
                            }}>
                                This tool is designed to help healthcare professionals diagnose patients more
                                accurately and efficiently by automating the process using artificial
                                intelligence (AI) microservices.
                            </p>
                            <p
                                style={{
                                fontSize: '1.5rem',
                                marginBottom: '2rem',
                                color: '#666'
                            }}>
                                Our team of experts has developed a range of AI microservices that can validate
                                patient data and provide accurate diagnoses based on that data.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeHero;