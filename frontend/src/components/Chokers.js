// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Container } from "react-bootstrap";
// import Product from "../components/Product";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import Paginate from "../components/Paginate";
// import { listProducts } from "../actions/productActions";
// import Meta from "../components/Meta";

// const Chokers = ({match}) => {
//   const keyword = match.params.keyword;
//   const category = "Chokers";

//   const pageNumber = match.params.pageNumber || 1;

//   const dispatch = useDispatch();

//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products, page, pages } = productList;

//   useEffect(() => {
//     dispatch(listProducts(keyword, pageNumber, category));
//   }, [dispatch, keyword, pageNumber]);

//   return (
//     <Container fluid className="featured_products_container">
//       <Meta />
//       <h1 className="latest_products text-center">Chokers</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (<Container>
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={6} md={6} lg={4} xl={4}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//         <Paginate pages={pages} page={page} category={category} keyword={keyword ? keyword : ""} />
//       </Container>)}
//     </Container>)
// }

// export default Chokers

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";

const Chokers = ({ match }) => {
  const keyword = match.params.keyword;
  const category = "Chokers";
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber, category]);

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Meta title="Chokers" />
      <h1 className="text-3xl font-semibold text-center mb-8">Chokers</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id}>
                {/* Render your Product component here */}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to={`/search/${category}/page/${page > 1 ? page - 1 : 1}`}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                page === 1 ? "opacity-50 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Previous
            </Link>
            <Link
              to={`/search/${category}/page/${page < pages ? page + 1 : pages}`}
              className={`ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                page === pages ? "opacity-50 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
              <ChevronRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Chokers;
