import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import TechStack from '../assets/Expertise';
import '../styles/css/Components/Expertise.min.css';

export default function Expertise() {
  return (
    <section className="expertise_section py-5" id='expertise'>
      <Container>
        <h2 className="text-center mb-4">Technical Expertise</h2>
        <Row className="g-4">
          {TechStack.techCategories.map((tech, index) => (
            <Col key={index} md={4} lg={4} xl={3}>
              <Card className="h-100">
                <Card.Header className="d-flex align-items-center">
                  <i className={tech.icon} />
                  <span className="ms-2">{tech.name}</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="row">
                    <div className="col-6">
                      <ul className="list-unstyled">
                        {tech.items.slice(0, Math.ceil(tech.items.length / 2)).map((item, idx) => (
                          <li key={idx} className="mb-1">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="list-unstyled">
                        {tech.items.slice(Math.ceil(tech.items.length / 2)).map((item, idx) => (
                          <li key={idx} className="mb-1">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}