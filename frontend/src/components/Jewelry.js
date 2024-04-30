import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Product from "./Product";
import Message from "./Message";
import Loader from "./Loader";
import Paginate from "./Paginate";
import { listProducts } from "../actions/productActions";
import Meta from "./Meta";

const Jewelry = ({ match }) => {
  const keyword = match.params.keyword;
  const category = "Jewelry";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="w-full featured_products_container">
      <Meta />
      <h1 className="text-center text-2xl font-bold my-8 latest_products">Jewelry Sets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} category={category} keyword={keyword ? keyword : ""} />
        </div>
      )}
    </div>
  );
};

export default Jewelry;
