import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import ProductCarousel from "./ProductCarousel";

const Product = ({ product }) => {
  return (
    <div className="my-3 rounded-lg shadow-lg overflow-hidden border Product_card" style={{height: "555px", width: "350px", margin: "10px"}}>
      <ProductCarousel
        imagesArr={product.images}
        link={`/product/${product._id}`}
        alt={product.name}
      />

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
        </Link>

        <div className="flex items-center mb-2">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className="text-xl text-green-600 font-semibold">
          ${product.price}
        </div>
      </div>
    </div>
  );
};

export default Product;

