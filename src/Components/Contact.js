import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import '../styles/css/Components/Contact.min.css';
import axios from 'axios';


export default function Contact() {
  const [inquiryType, setInquiryType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
  });
  
  const showProjectFields = ['project-collab', 'tech-consulting'].includes(inquiryType);
  const showSpeakingFields = inquiryType === 'speaking-opp';
  const showMentoringFields = inquiryType === 'mentoring';

  const submitContactForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });
    
    try {
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
      
      const submissionData = {
        name: formValues.formFullName,
        company: formValues.formCompany,
        subject: formValues.formSubject,
        email: formValues.formEmail,
        message: formValues.formMessage,
        inquiryType: inquiryType,
        consent: formValues.consentCheckbox === 'on',
        ...(showProjectFields && {
          budget: formValues.formProjectBudget,
          technologies: formValues.formProjectTech,
          timeline: formValues.formTimeline,
        }),
        ...(showSpeakingFields && {
          eventName: formValues.formEventName,
          eventDate: formValues.formEventDate,
          topic: formValues.formSpeakingTopic
        }),
        ...(showMentoringFields && {
          mentoringArea: formValues.formMentoringArea,
          experienceLevel: formValues.formExperienceLevel
        })
      };

      console.log('Submitting:', submissionData);

      // Remove the nested handleSubmit and make the request directly
      const response = await axios.post('http://localhost:9013/contact', submissionData);
      console.log('Success:', response.data);
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      e.target.reset();

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setSubmitStatus({ success: null, message: '' });
    }, 3000);
  };
  return (
    <>
      <section className='contact_section pt-5 pb-5' id='contact'>
        <h2 className='text-center pb-4'>Send Me a Message</h2>
        <p className='text-center pb-4'>
          Fill out the form below and I'll get back to you as soon as possible. The more details you provide, 
          the better I can help you.
        </p>
        
        <Container className='d-flex justify-content-center'>
          <div className='contact_me_form'>
            <Form onSubmit={submitContactForm}>
              <h5 className='mb-3'>What type of inquiry is this? *</h5>
                <div className="inquiry-type-selector">
                  <Row className='mb-4'>
                    <Col md={6}>
                      <Form.Check 
                        type="radio"
                        id="project-collab"
                        label={
                          <>
                            <i className="bi bi-kanban-fill inquiry-icon"></i>
                            <span className="inquiry-text">Project Collaboration</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('project-collab')}
                        checked={inquiryType === 'project-collab'}
                      />
                      <Form.Check 
                        type="radio"
                        id="speaking-opp"
                        label={
                          <>
                            <i className="bi bi-megaphone-fill inquiry-icon"></i>
                            <span className="inquiry-text">Speaking Opportunity</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('speaking-opp')}
                        checked={inquiryType === 'speaking-opp'}
                      />
                      <Form.Check 
                        type="radio"
                        id="tech-consulting"
                        label={
                          <>
                            <i className="bi bi-code-square inquiry-icon"></i>
                            <span className="inquiry-text">Technical Consulting</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('tech-consulting')}
                        checked={inquiryType === 'tech-consulting'}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Check 
                        type="radio"
                        id="mentoring"
                        label={
                          <>
                            <i className="bi bi-people-fill inquiry-icon"></i>
                            <span className="inquiry-text">Mentoring/Advice</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('mentoring')}
                        checked={inquiryType === 'mentoring'}
                      />
                      <Form.Check 
                        type="radio"
                        id="interview"
                        label={
                          <>
                            <i className="bi bi-camera-reels-fill inquiry-icon"></i>
                            <span className="inquiry-text">Interview/Media</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('interview')}
                        checked={inquiryType === 'interview'}
                      />
                      <Form.Check 
                        type="radio"
                        id="general"
                        label={
                          <>
                            <i className="bi bi-question-circle-fill inquiry-icon"></i>
                            <span className="inquiry-text">General Inquiry</span>
                          </>
                        }
                        name="inquiryType"
                        className='mb-2'
                        onChange={() => setInquiryType('general')}
                        checked={inquiryType === 'general'}
                      />
                    </Col>
                  </Row>
                </div>

              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control name="formFullName" type="text" placeholder="Your full name" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCompany">
                <Form.Label>Company/Organization</Form.Label>
                <Form.Control name='formCompany' type="text" placeholder="Your company name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control name='formEmail' type="email" placeholder="your.email@example.com" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject *</Form.Label>
                <Form.Control name='formSubject' type="text" placeholder="Brief subject line" required />
              </Form.Group>

              {/* Project-related fields */}
              {showProjectFields && (
                <>
                  <Form.Group className="mb-3" controlId="formProjectBudget">
                    <Form.Label>Project Budget (USD)</Form.Label>
                    <Form.Select name="formProjectBudget">
                      <option value="none">Select budget range</option>
                      <option value="Less than $1,000">Less than $1,000</option>
                      <option value=">$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formProjectTech">
                    <Form.Label>Technologies Involved</Form.Label>
                    <Form.Control 
                      name="formProjectTech"
                      as="textarea" 
                      rows={2} 
                      placeholder="List the technologies or platforms involved in your project" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTimeline">
                    <Form.Label>Project Timeline</Form.Label>
                    <Form.Select name='formTimeline'>
                      <option value="none">Select timeline</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3+ months">3+ months</option>
                      <option value="No specific timeline">No specific timeline</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              {/* Speaking opportunity fields */}
              {showSpeakingFields && (
                <>
                  <Form.Group className="mb-3" controlId="formEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control name="formEventName" type="text" placeholder="Name of the event or conference" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formEventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control name='formEventDate' type="date" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formSpeakingTopic">
                    <Form.Label>Preferred Topic</Form.Label>
                    <Form.Control name="formSpeakingTopic" type="text" placeholder="What topic would you like me to speak about?" />
                  </Form.Group>
                </>
              )}

              {/* Mentoring fields */}
              {showMentoringFields && (
                <>
                  <Form.Group className="mb-3" controlId="formMentoringArea">
                    <Form.Label>Area of Mentoring</Form.Label>
                    <Form.Control name="formMentoringArea" type="text" placeholder="What specific area do you need advice on?" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formExperienceLevel">
                    <Form.Label>Your Experience Level</Form.Label>
                    <Form.Select name='formExperienceLevel'>
                      <option value="Select your level">Select your level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message *</Form.Label>
                <Form.Control 
                  name="formMessage"
                  as="textarea" 
                  rows={5} 
                  placeholder="Tell me about your project, ideas, or how I can help you. The more details you provide, the better I can assist you." 
                  required 
                />
              </Form.Group>

              <div className="mb-3">
                <Form.Check 
                  type="checkbox"
                  id="consent-checkbox"
                  name='consentCheckbox'
                  label="By sending this message, you agree that I may contact you about your inquiry. I respect your privacy and won't share your information with third parties."
                  required
                />
              </div>
              <Button 
                variant="primary" 
                type="submit" 
                className='w-100'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
              {submitStatus.message && (
                <Alert 
                  variant={submitStatus.success ? 'success' : 'danger'}
                  className="mb-2 mt-2"
                  onClose={() => setSubmitStatus({ success: null, message: '' })}
                  dismissible
                >
                  {submitStatus.message}
                </Alert>
              )}
            </Form>
          </div>
        </Container> 
      </section>
    </>
  );
}