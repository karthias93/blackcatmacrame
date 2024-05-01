import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { logout } from "../actions/userActions";
import "../screens/homescreen.css";
import Avatar from "./Avatar";
import Logo from './blackcatlogo2.jpg';
import { Menu, Layout } from 'antd';

const Header = () => {
	const dispatch = useDispatch();
	const { Header } = Layout;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Header>
			<Navbar variant='dark' expand='lg' className='navbar1'>
				<Container className='navbar_container'>
					<NavLink to="/">
						<Navbar.Brand className="jumboH2 text-info"><img className="logo1" src={Logo} alt="blackcatlogo"></img></Navbar.Brand>
					</NavLink>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="me-auto" id="first_nav">
							<NavLink to="/">
								<Navbar.Brand className="jumboH2 text-info ">Home</Navbar.Brand>
							</NavLink>
							<NavLink to="/story">
								<Navbar.Brand className="jumboH2 text-info">My Story</Navbar.Brand>
							</NavLink>
							<NavLink to="/contact">
								<Navbar.Brand className="jumboH2 text-info">Contact Me</Navbar.Brand>
							</NavLink>
							<NavDropdown title="Products" className="jumboH2 text-info" id="navbardropdown1">
								<NavLink to='/Necklaces/1'>
									<NavDropdown.Item className="jumboH5 text-info">Necklaces</NavDropdown.Item>
								</NavLink>
								<NavLink to='/Bracelets/1'>
									<NavDropdown.Item className="jumboH5 text-info">Bracelets</NavDropdown.Item>
								</NavLink>
								<NavLink to='/Pendants/1'>
									<NavDropdown.Item className="jumboH5 text-info">Pendants</NavDropdown.Item>
								</NavLink>
								<NavLink to='/Statementpieces/1'>
									<NavDropdown.Item className="jumboH5 text-info">Statement Pieces</NavDropdown.Item>
								</NavLink>
								<NavLink to='/jewelry/1'>
									<NavDropdown.Item className="jumboH5 text-info">Jewelry Sets</NavDropdown.Item>
								</NavLink>
								<NavLink to='/Trees/1'>
									<NavDropdown.Item className="jumboH5 text-info">Trees</NavDropdown.Item>
								</NavLink>
								<NavLink to='/Miscellaneous/1'>
									<NavDropdown.Item className="jumboH5 text-info">Miscellaneous</NavDropdown.Item>
								</NavLink>

							</NavDropdown>
						</Nav>
						<Nav className="ml-auto">
							{userInfo ? (
								<div className="d-lg-flex justify-content-start ms-lg-5">
									<Avatar size="40px" url={userInfo.avatar} className="" />
									<NavDropdown title={userInfo.name} id="username">
										<NavLink to="/profile">
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</NavLink>
										<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
									</NavDropdown>
								</div>
							) : (
								<NavLink to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</NavLink>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<NavLink to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</NavLink>
									<NavLink to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</NavLink>
									<NavLink to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</NavLink>
								</NavDropdown>

							)}
							<NavLink to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart text-info" id="shopping_cart_icon"></i>
								</Nav.Link>
							</NavLink>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Header>
	);
};

export default Header;
