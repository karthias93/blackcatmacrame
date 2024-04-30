import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Pagination } from "antd";
import Product from "./Product";
import Message from "./Message";
import Loader from "./Loader";
import { listProducts } from "../actions/productActions";
import Meta from "./Meta";

const Trees = ({ match }) => {
  const keyword = match.params.keyword;
  const category = "Trees";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="container mx-auto px-4">
      <Meta />
      <h1 className="text-3xl font-semibold text-center mb-8">Trees</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              total={pages * 10}
              onChange={(pageNumber) =>
                dispatch(listProducts(keyword, pageNumber, category))
              }
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Trees;
