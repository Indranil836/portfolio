import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import '../styles/css/Components/About.min.css'
import Innoraft from '../assets/innoraft.svg'

export default function About() {
  return (
    <>
      <section className='about_section' id='about'>
        <Container>
              <h2 className='text-center pb-4'>My Journey</h2>
          <Row>
            <Col md={6} className='about_col'>
              <h5>
                From Student to Drupal Specialist
              </h5>
              <p>
                With a strong foundation in software engineering, I specialize in building enterprise Drupal backend applications, custom module development, and modern JavaScript web interfaces. I enjoy tackling complex architectural challenges and integrating modern cloud & AI solutions.
              </p>
              <p>My journey in technology began at Techno India University, where I earned my B.Tech in Electronics & Communication Engineering. What started as curiosity about how web systems operate evolved into a dedicated career creating robust digital platforms.</p>
              <div className='education'>
                <Card>
                  <Card.Header><i className="bi bi-mortarboard-fill"></i><span>Education Highlight</span></Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>
                        Bachelor of Technology in Electronics and Communication Engineering
                      </p>
                      <p>Techno India University (2019-2023)</p>
                    </blockquote>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
              <Card className='career_highlight'>
                  <Card.Header><i className="bi bi-person-workspace"></i><span>Career Highlights</span></Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <Row>
                        <Col className='d-flex justify-content-center align-items-center' md={3}>
                        <img src={Innoraft} alt="Innoraft Logo" className='img-fluid mb-3' width={100} height={80} />
                        </Col>
                        <Col>
                        <h5>Drupal Backend Developer</h5>
                        <p>Innoraft Solutions Pvt. Ltd. (2023 - Present)</p>
                        </Col>
                      </Row>
                    </blockquote>
                  </Card.Body>
                </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
