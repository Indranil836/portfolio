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
                From Student to Tech Leader
              </h5>
              <p>
                With a background in computer science, I have honed my skills in various programming languages and frameworks, 
                including React, Node.js, and Python. I enjoy tackling complex problems and continuously learning new technologies to enhance my skill set.
              </p>
              <p>My journey in technology began at Vellore Institute of Technology, where I earned my Bachelor's in Computer Science. What started as curiosity about how websites work evolved into a passion for creating digital experiences that matter.</p>
              <div className='education'>
                <Card>
                  <Card.Header><i class="bi bi-mortarboard-fill"></i><span>Education Highlight</span></Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>
                        Bachelor of Technology in Electronics and Communication Engineering
                      </p>
                      <p>Techo India university (2019-2023)</p>
                    </blockquote>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
              <Card className='career_highlight'>
                  <Card.Header><i class="bi bi-person-workspace"></i><span>Career Highlights</span></Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <Row>
                        <Col className='d-flex justify-content-center align-items-center' md={3}>
                        <img src={Innoraft} alt="Innoraft Logo" className='img-fluid mb-3' width={100} height={80} />
                        </Col>
                        <Col>
                        <h5>Druapl Backend Developer</h5>
                      <p>Innoraft Solution PVT.LTD (2023 - Present)</p>
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
