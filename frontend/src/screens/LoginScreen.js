// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Form, Button, Row, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
// import { login } from '../actions/userActions'

// const LoginScreen = ({ location, history }) => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const dispatch = useDispatch()

//   const userLogin = useSelector((state) => state.userLogin)
//   const { loading, error, userInfo } = userLogin

//   const redirect = location.search ? location.search.split('=')[1] : '/'

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect)
//     }
//   }, [history, userInfo, redirect])

//   const submitHandler = (e) => {
//     e.preventDefault()
//     dispatch(login(email, password))
//   }

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error && <Message variant='danger'>{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
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

//         <Row className='py-3'>
//           <Col>
//             <Link to={redirect ? `/reset?redirect=${redirect}` : '/reset'}>
//               Forgot your password?
//             </Link>
//           </Col>
//         </Row>

//         <Button type='submit' variant='primary'>
//           Sign In
//         </Button>
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           New Customer?{' '}
//           <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   )
// }

// export default LoginScreen

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-3xl mb-6">Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form layout="vertical" onSubmit={submitHandler}>
        <Form.Item label='Email Address' htmlFor='email'>
          <Input
            type="email"
            className="form-control block w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item label='Password' htmlFor='password'>
          <Input
            type="password"
            className="form-control block w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-primary-blue focus:border-primary-blue"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Row className='py-3'>
          <Col>
            <Link to={redirect ? `/reset?redirect=${redirect}` : '/reset'}>
              Forgot your password?
            </Link>
          </Col>
        </Row>

        <Form.Item>
          <Button htmlType='submit' className='bg-dark text-white px-4 text-center'>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
