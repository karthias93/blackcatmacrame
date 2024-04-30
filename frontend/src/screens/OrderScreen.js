import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, List, Image, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../components/CheckoutForm";
import CheckoutForm from "../components/ChechoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderScreen = ({ match, history }) => {
    const [clientSecret, setClientSecret] = useState("");

    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo]);

    useEffect(() => {
        if (!orderDetails.loading && !order.isPaid) {
            const orderItems = {
                items: orderDetails.order.orderItems.map((item) => ({
                    _id: item.product,
                    quantity: item.qty,
                })),
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            axios
                .post("/api/orders/create-payment-intent", orderItems, config)
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => console.log(err));
        }
    }, [orderDetails, userInfo, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl mb-4">Order {order._id}</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message type="error" message={error} />
            ) : (
                <Row gutter={16}>
                    <Col span={16}>
                        <Card>
                            <List>
                                <List.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{" "}
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{" "}
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message type="success">Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                        <Message type="danger">Not Delivered</Message>
                                    )}
                                </List.Item>

                                <List.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message type="success">Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message type="danger">Not Paid</Message>
                                    )}
                                </List.Item>

                                <List.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={order.orderItems}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Image src={item.images[0]} alt={item.name} />}
                                                        title={
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        }
                                                        description={`${item.qty} x $${item.price} = $${(
                                                            item.qty * item.price
                                                        ).toFixed(2)}`}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    )}
                                </List.Item>
                            </List>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card>
                            <List>
                                <List.Item>
                                    <h2>Order Summary</h2>
                                </List.Item>
                                <List.Item>
                                    <Row justify="space-between">
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </List.Item>
                                <List.Item>
                                    <Row justify="space-between">
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </List.Item>
                                <List.Item>
                                    <Row justify="space-between">
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </List.Item>
                                <List.Item>
                                    <Row justify="space-between">
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </List.Item>
                                {!order.isPaid && (
                                    <List.Item>
                                        {loadingPay && <Loader />}
                                        {!clientSecret ? (
                                            <Loader />
                                        ) : (
                                            <Elements stripe={stripePromise}>
                                                <CheckoutForm
                                                    successPaymentHandler={successPaymentHandler}
                                                    userEmail={userInfo.email}
                                                />
                                            </Elements>
                                        )}
                                    </List.Item>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <List.Item>
                                        <Button type="primary" block onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </List.Item>
                                )}
                            </List>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default OrderScreen;

