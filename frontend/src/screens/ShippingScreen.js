// import React, { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/FormContainer'
// import CheckoutSteps from '../components/CheckoutSteps'
// import { saveShippingAddress } from '../actions/cartActions'

// const ShippingScreen = ({ history }) => {
//   const cart = useSelector((state) => state.cart)
//   const { shippingAddress } = cart

//   const [address, setAddress] = useState(shippingAddress.address)
//   const [city, setCity] = useState(shippingAddress.city)
//   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
//   const [country, setCountry] = useState(shippingAddress.country)

//   const dispatch = useDispatch()

//   const submitHandler = (e) => {
//     e.preventDefault()
//     dispatch(saveShippingAddress({ address, city, postalCode, country }))
//     history.push('/payment')
//   }

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 />
//       <h1>Shipping</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId='address'>
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter address'
//             value={address}
//             required
//             onChange={(e) => setAddress(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='city'>
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter city'
//             value={city}
//             required
//             onChange={(e) => setCity(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='postalCode'>
//           <Form.Label>Postal Code</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter postal code'
//             value={postalCode}
//             required
//             onChange={(e) => setPostalCode(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId='country'>
//           <Form.Label>Country</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter country'
//             value={country}
//             required
//             onChange={(e) => setCountry(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   )
// }

// export default ShippingScreen

import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(saveShippingAddress(values));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="text-3xl">Shipping</h1>
      <Form onFinish={submitHandler} layout="vertical">
        <Form.Item
          label='Address'
          name='address'
          initialValue={address}
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder='Enter address' onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='City'
          name='city'
          initialValue={city}
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input placeholder='Enter city' onChange={(e) => setCity(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Postal Code'
          name='postalCode'
          initialValue={postalCode}
          rules={[{ required: true, message: 'Please enter your postal code' }]}
        >
          <Input placeholder='Enter postal code' onChange={(e) => setPostalCode(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Country'
          name='country'
          initialValue={country}
          rules={[{ required: true, message: 'Please enter your country' }]}
        >
          <Input placeholder='Enter country' onChange={(e) => setCountry(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;

