import React from 'react';
import ContactImage from '../components/images/contactMe1.png';
import ContactForm from './ContactForm';

function Contact() {
  return (
    <>
      <div className="contact_container">
        <img src={ContactImage} className="contact_background_image" alt="Contact Background"></img>
      </div>

      <div className="container mx-auto">
        <div className="py-12">
          <h1 className="text-center text-4xl font-bold mb-8">Fill Out Form to Contact Me</h1>
          <div className="max-w-lg mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
