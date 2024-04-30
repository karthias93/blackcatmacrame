import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";

const Miscellaneous = ({ match }) => {
  const keyword = match.params.keyword;
  const category = "Miscellaneous";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="container mx-auto px-4 featured_products_container">
      <Meta />
      <h1 className="text-3xl font-bold text-center my-4">Miscellaneous</h1>
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
          <Paginate pages={pages} page={page} category={category} keyword={keyword || ""} />
        </>
      )}
    </div>
  );
};

export default Miscellaneous;
