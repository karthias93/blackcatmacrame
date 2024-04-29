// import React from 'react';
// import { Container, Row, Form, Button } from 'react-bootstrap'
// import '../screens/homescreen.css'

// function ContactForm() {

//   return (


//     <Container className='form_container'>
//       <Row>
//         <Form  action="https://formspree.io/f/xoqbakor" method="POST"  className='form_1' id="contact-form">
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//               {/* <Form.Label>Name</Form.Label> */}
//               <Form.Control  className="inputFields"  name="firstName" placeholder="Enter Name" />
//             </Form.Group>            
            
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               {/* <Form.Label>Phone Number</Form.Label> */}
//               <Form.Control  name="Phone Number" type='number' placeholder="Phone Number" />
//             </Form.Group>

//             <Form.Group className="mb-3" name="email" controlId="formBasicEmail">
//               {/* <Form.Label>Email address</Form.Label> */}
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3"  controlId="formBasicPassword">
//               {/* <Form.Label>Message</Form.Label> */}
//               <Form.Control  className="messageInput" name="message" placeholder="Enter Message Here!" />
//             </Form.Group>
//             <Button variant="primary" type="submit" className='mb-5' id="submit_button">
//               Submit
//             </Button>
//           </Form>

//       </Row>
//     </Container>

//   );
// }
// function App() {
//   return (
//     <ContactForm />
//   );
// }
// export default App;

import React from 'react';
import '../screens/homescreen.css'
import '../index.css';

function ContactForm() {
  return (
    <div className="form_container">
      <h2 className="text-xl font-bold mb-4 text-center">Contact Me</h2>
      <form action="https://formspree.io/f/xoqbakor" method="POST" id="contact-form">
        <div className="mb-4">
          <input
            className="form-control block w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            id="firstName"
            name="firstName"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            inputmode="numeric"
            className="form-control block w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="form-control block w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            id="email"
            name="email"
            placeholder="Enter email"
            required
          />
          <p className="text-xs text-gray-500 mt-1">We'll never share your email with anyone else.</p>
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            className="form-control block w-full h-32 px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            placeholder="Enter Message Here!"
            required
          ></textarea>
        </div>
        <button 
        type="submit" 
        className="contact-submit-btn"
        id="submit_button"
        >
          Submit
        </button>

      </form>
    </div>
  );
}

function App() {
    return (
      <ContactForm />
    );
  }
export default App;
