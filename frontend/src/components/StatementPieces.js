import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Pagination } from "antd";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";

const StatementPieces = ({ match }) => {
  const keyword = match.params.keyword;
  const category = "StatementPieces";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="container mx-auto featured_products_container">
      <Meta />
      <h1 className="text-center text-3xl mt-8 mb-4">Statement Pieces</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagination
            current={page}
            total={pages * 10}
            pageSize={10}
            onChange={(pageNumber) =>
              dispatch(listProducts(keyword, pageNumber, category))
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default StatementPieces;
