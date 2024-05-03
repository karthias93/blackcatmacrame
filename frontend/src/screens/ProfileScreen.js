import React, {useState, useEffect} from "react";
import {Table, Form, Button, Row, Col} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {listMyOrders} from "../actions/orderActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import EditAvatar from "../components/EditAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Chart, PieController } from 'chart.js/auto'

const ProfileScreen = ({location, history}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const {loading, error, user} = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const {userInfo} = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {success} = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;

	const [chartData] = useState({
		labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
		datasets: [
		  {
			label: 'Percentage',
			data: [25, 25, 25, 25],
			backgroundColor: ['#ffbbcc', '#c4dffe', '#d6ffc4', '#ffd9b3'],
			borderColor: ['#ffbbcc', '#c4dffe', '#d6ffc4', '#ffd9b3'],
		  },
		],
	  });
	  useEffect(() => {
		const ctx = document.getElementById('myChart').getContext('2d');
		let chartInstance;
	  
		const createChart = () => {
		  Chart.register(PieController);
		  chartInstance = new Chart(ctx, {
			type: 'pie',
			data: chartData,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  display: true,
				  position: 'top',
				},
				tooltip: {
				  callbacks: {
					label: (context) => `${context.label}: ${context.parsed}%`,
				  },
				},
			  },
			},
		  });
		};
	  
		if (chartInstance) {
		  chartInstance.destroy(); 
		}
		createChart();
		return () => {
		  if (chartInstance) {
			chartInstance.destroy();
		  }
		};
	  }, [chartData]); 

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user || !user.name || success) {
				dispatch({type: USER_UPDATE_PROFILE_RESET});
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
			setMessage("Passwords do not match");
		} else {
			dispatch(updateUserProfile({id: user._id, name, email, password, avatar}));
		}
	};

	return (
		<Row>
		  <Col md={3} className="my-3">
			<h2>User Profile</h2>
			{message && <Message variant="danger">{message}</Message>}
			{}
			{success && <Message variant="success">Profile Updated</Message>}
			{loading ? (
			  <Loader />
			) : error ? (
			  <Message variant="danger">{error}</Message>
			) : (
			  <Form onSubmit={submitHandler}>
				<EditAvatar avatar={avatar} setAvatar={setAvatar} />
	  
				<Form.Group controlId="name" className="mb-2">
				  <Form.Label>Name</Form.Label>
				  <Form.Control
					type="name"
					placeholder="Enter name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				  ></Form.Control>
				</Form.Group>
	  
				<Form.Group controlId="email" className="mb-2">
				  <Form.Label>Email Address</Form.Label>
				  <Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				  ></Form.Control>
				</Form.Group>
	  
				<Form.Group controlId="password" className="mb-2">
				  <Form.Label>Password</Form.Label>
				  <Form.Control
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				  ></Form.Control>
				</Form.Group>
	  
				<Form.Group controlId="confirmPassword" className="mb-3">
				  <Form.Label>Confirm Password</Form.Label>
				  <Form.Control
					type="password"
					placeholder="Confirm password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				  ></Form.Control>
				</Form.Group>
	  
				<Button type="submit" variant="primary">
				  Update
				</Button>
			  </Form>
			)}
		  </Col>
		  <Col md={9}>
			<h2>My Orders</h2>
			{loadingOrders ? (
			  <Loader />
			) : errorOrders ? (
			  <Message variant="danger">{errorOrders}</Message>
			) : (
			  <div>
				<Table striped bordered hover responsive className="table-sm">
				  <thead>
					<tr>
					  <th>ID</th>
					  <th>DATE</th>
					  <th>TOTAL</th>
					  <th>PAID</th>
					  <th>DELIVERED</th>
					  <th></th>
					</tr>
				  </thead>
				  <tbody>
					{orders.map((order) => (
					  <tr key={order._id}>
						<td>{order._id}</td>
						<td>{order.createdAt.substring(0, 10)}</td>
						<td>{order.totalPrice}</td>
						<td>
						  {order.isPaid ? (
							order.paidAt.substring(0, 10)
						  ) : (
							<FontAwesomeIcon icon={faTimes} style={{color: "red"}} />
						  )}
						</td>
						<td>
						  {order.isDelivered ? (
							order.deliveredAt.substring(0, 10)
						  ) : (
							<FontAwesomeIcon icon={faTimes} style={{color: "red"}} />
						  )}
						</td>
						<td>
						  <LinkContainer to={`/order/${order._id}`}>
							<Button className="btn-sm" variant="light">
							  Details
							</Button>
						  </LinkContainer>
						</td>
					  </tr>
					))}
				  </tbody>
				</Table>
			  </div>
			)}
			<div className="block m-auto pieChart my-3">
                <canvas id="myChart"></canvas>
            </div>
		  </Col>
		</Row>
	  );
	  
};

export default ProfileScreen;
