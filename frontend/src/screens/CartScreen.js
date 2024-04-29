// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// import Message from '../components/Message'
// import { addToCart, removeFromCart } from '../actions/cartActions'


// const CartScreen = ({ match, location, history }) => {
//   const productId = match.params.id

//   const qty = location.search ? Number(location.search.split('=')[1]) : 1

//   const dispatch = useDispatch()

//   const cart = useSelector((state) => state.cart)
//   const { cartItems } = cart

//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty))
//     }
//   }, [dispatch, productId, qty])

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id))
//   }

//   const checkoutHandler = () => {
//     history.push('/login?redirect=shipping')
//   }

//   return (
//     <Row>
//       <Col md={8}>
//         <h1>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <Message>
//             Your cart is empty <Link to='/'>Go Back</Link>
//           </Message>
//         ) : (
//           <ListGroup variant='flush'>
//             {cartItems.map((item) => (
//               <ListGroup.Item key={item.product}>
//                 <Row>
//                   <Col md={2}>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col md={3}>
//                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                   </Col>
//                   <Col md={2}>${item.price}</Col>
//                   <Col md={2}>
//                     <Form.Control
//                       as='select'
//                       value={item.qty}
//                       onChange={(e) =>
//                         dispatch(
//                           addToCart(item.product, Number(e.target.value))
//                         )
//                       }
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Col>
//                   <Col md={2}>
//                     <Button
//                       type='button'
//                       variant='light'
//                       onClick={() => removeFromCartHandler(item.product)}
//                     >
//                       <i className='fas fa-trash'></i>
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col md={4}>
//         <Card>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   )
// }

// export default CartScreen


import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Row, Col, List, Image, InputNumber, Button, Space, Typography, Card } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './homescreen.css';

const CartScreen = ({ match, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const history = useHistory(); // Using useHistory instead of useNavigate

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping'); // Using history.push for navigation
  };

  return (
    <Row gutter={16} className="cart-container">
      <Col className='cart-items'>
        <Typography.Title level={3}>Shopping Cart</Typography.Title>
        {cartItems.length === 0 ? (
          <Space direction="vertical">
            <Typography.Text>Your cart is empty</Typography.Text>
            <Link to="/">Go Back</Link>
          </Space>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Image src={item.image} alt={item.name} width={64} />}
                  title={<Link to={`/product/${item.product}`}>{item.name}</Link>}
                  description={`$${item.price}`}
                />
                <Space>
                  <InputNumber min={1} max={item.countInStock} value={item.qty} onChange={(value) => dispatch(addToCart(item.product, value))} />
                  <Button type="primary" danger icon={<MinusCircleOutlined />} shape="round" onClick={() => removeFromCartHandler(item.product)} />
                  <Button type="primary" icon={<PlusCircleOutlined />} shape="round" onClick={() => dispatch(addToCart(item.product, item.qty + 1))} disabled={item.qty === item.countInStock} />
                </Space>
              </List.Item>
            )}
          />
        )}
      </Col>
      <Col className='cart-items'>
        <Card title="Cart Summary" bordered={true}>
          <List.Item>
            <List.Item.Meta
              title={<Typography.Text>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</Typography.Text>}
              description={`$${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}`}
            />
          </List.Item>
          <Button type="primary" block disabled={cartItems.length === 0} className='my-3' size={[undefined, 'large']}>
            Proceed To Checkout
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
