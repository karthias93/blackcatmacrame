import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import EditAvatar from "../components/EditAvatar";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageText, setMessageText] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessageText("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          avatar,
        })
      );
      message.success("Profile Updated");
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <h2>User Profile</h2>
        {messageText && <Message type="error" message={messageText} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error" message={error} />
        ) : (
          <Form layout="vertical" onSubmit={submitHandler}>
            <EditAvatar avatar={avatar} setAvatar={setAvatar} />

            <Form.Item label="Name">
              <Form.Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Email Address">
              <Form.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Password">
              <Form.Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Confirm Password">
              <Form.Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col xs={24} md={16}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error" message={errorOrders} />
        ) : (
          <Table dataSource={orders} pagination={false} rowKey="_id">
            <Table.Column title="ID" dataIndex="_id" key="_id" />
            <Table.Column
              title="DATE"
              dataIndex="createdAt"
              key="createdAt"
              render={(createdAt) => new Date(createdAt).toLocaleDateString()}
            />
            <Table.Column title="TOTAL" dataIndex="totalPrice" key="totalPrice" />
            <Table.Column
              title="PAID"
              dataIndex="isPaid"
              key="isPaid"
              render={(isPaid, record) =>
                isPaid ? (
                  new Date(record.paidAt).toLocaleDateString()
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )
              }
            />
            <Table.Column
              title="DELIVERED"
              dataIndex="isDelivered"
              key="isDelivered"
              render={(isDelivered, record) =>
                isDelivered ? (
                  new Date(record.deliveredAt).toLocaleDateString()
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )
              }
            />
            <Table.Column
              title="ACTION"
              key="action"
              render={(text, record) => (
                <Link to={`/order/${record._id}`}>Details</Link>
              )}
            />
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
