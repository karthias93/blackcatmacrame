import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../screens/homescreen.css'
import ContactForm from './ContactForm'

function Contact() {
  return (
    <>
    <Container fluid className='contact_container'>
    </Container>
    
    <Container>
      <Row>
        <Col>
          <h1 className='text-center'>Fill Out Form to Contact Me</h1>
            <ContactForm />
        </Col>
      </Row>
    </Container>
    
    </>

  )
}

export default Contact
