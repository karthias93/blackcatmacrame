import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, List, Image, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 0 : 1);

  cart.taxPrice = addDecimals(Number((0.08 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <List>
            <List.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>{" "}
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
              </p>
            </List.Item>

            <List.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong> {cart.paymentMethod}
            </List.Item>

            <List.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={cart.cartItems}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Image src={item.images[0]} alt={item.name} />
                        }
                        title={
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        }
                        description={`${item.qty} x $${item.price} = $${
                          item.qty * item.price
                        }`}
                      />
                    </List.Item>
                  )}
                />
              )}
            </List.Item>
          </List>
        </Col>
        <Col span={8}>
          <Card>
            <List>
              <List.Item>
                <h2>Order Summary</h2>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col style={{ color: "red" }}>
                    <strong>Free Shipping</strong>
                  </Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                {error && <Message type="error" message={error} />}
              </List.Item>
              <List.Item>
                <Button
                  type="primary"
                  block
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
