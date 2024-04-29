import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Container } from "react-bootstrap";
import Product from "./Product";
import Message from "./Message";
import Loader from "./Loader";
import Paginate from "./Paginate";
import { listProducts } from "../actions/productActions";
import Meta from "./Meta";

const Pendants = ({match}) => {
  const keyword = match.params.keyword;
  const category = "Pendants";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="featured_products_container container mx-auto px-4">
      <Meta />
      <h1 className="latest_products text-center text-3xl font-bold my-4">Pendants</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </>)}
    </div>)
}

export default Pendants