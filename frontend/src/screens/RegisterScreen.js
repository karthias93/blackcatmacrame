// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Form, Button, Row, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
// import { register } from '../actions/userActions'

// const RegisterScreen = ({ location, history }) => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [message, setMessage] = useState(null)

//   const dispatch = useDispatch()

//   const userRegister = useSelector((state) => state.userRegister)
//   const { loading, error, userInfo } = userRegister

//   const redirect = location.search ? location.search.split('=')[1] : '/'

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect)
//     }
//   }, [history, userInfo, redirect])

//   const submitHandler = (e) => {
//     e.preventDefault()
//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match')
//     } else {
//       dispatch(register(name, email, password))
//     }
//   }

//   return (
//     <FormContainer>
//       <h1>Sign Up</h1>
//       {message && <Message variant='danger'>{message}</Message>}
//       {error && <Message variant='danger'>{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId='name'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='name'
//             placeholder='Enter name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='email'>
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='password'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='confirmPassword'>
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Confirm password'
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Register
//         </Button>
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           Have an Account?{' '}
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   )
// }

// export default RegisterScreen

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, message as antdMessage, Input } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      antdMessage.error('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="text-3xl mb-4">Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onFinish={submitHandler}>
        <Form.Item name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}>
          <Input  placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item name='confirmPassword' rules={[{ required: true, message: 'Please confirm your password!' }]}>
          <Input.Password  placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='w-full bg-dark text-white px-4'>
            Register
          </Button>
        </Form.Item>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
