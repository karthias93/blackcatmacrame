import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Testimonials from "../components/Testimonials";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import "./homescreen.css";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<div className="main mb-1 flex flex-col justify-center">
				<h1 className="text-center jumboH1">Welcome To Black Cat Macrame</h1>
				<h4 className="text-center jumboH2">
					Designing Beautiful Handmade Macrame Jewelry.
				</h4>
				<br />
				<div className="text-center">
					<a href="https://www.facebook.com/MacrameBlackCat"><i className="fab fa-facebook footer-icons"></i></a>
					<a href="https://www.instagram.com/macrameblackcat/?fbclid=IwAR0vuZkalF3G0wG7Mr4G2GlLZSHpwUxf_ZMAIFZ8op5ApSLYCU76R8qWNfU"><i className="fab fa-instagram footer-icons"></i></a>
					<a href="https://www.etsy.com/shop/MacrameBlackCat?fbclid=IwAR1A5vjBmlsHJOoa8k1dC6WVWdSjjd6Q9c-8mJxZRn4gMajTdp7ahSZBKjI"><i className="fab fa-etsy footer-icons"></i></a>
					<a href="https://www.pinterest.com/blackcatmacrame/?invite_code=96f1625f44a14a52a93506da06236db1&sender=340162715513308657"><i className="fab fa-pinterest footer-icons"></i></a>
				</div>
				<div className="flex justify-between items-end cat_col">
					<img src="../images/blackcat6.jpg" className="cat_image" alt="black cata" />
					<img src="../images/blackcat5.jpg" className="cat_image" alt="black cata" />
				</div>
			</div>
			<div className="featured_products_container">
				<Meta />
				<h1 className="latest_products text-center">Latest Products</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<div className="container">
						<Row gutter={[16, 16]}>
							{products.map((product) => (
								<Col key={product._id} xs={24} sm={12} md={8} lg={8}>
									<Product product={product} />
								</Col>
							))}
						</Row>
						<Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
					</div>
				)}
			</div>
			<Testimonials />
		</>
	);
};

export default HomeScreen;

