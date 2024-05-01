import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, List, Card, Button, Rate, Form, message, Input } from "antd";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listProductDetails, createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import ProductGallery from "../components/ProductGallery";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      message.success("Review submitted successfully");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }
  }, [dispatch, match, successProductReview, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Button className="my-3" onClick={() => history.goBack()}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <ProductGallery images={product.images} alt={product.name} />
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <h2>{product.name}</h2>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </Card>
              <Card>
                <List.Item>
                  <List.Item.Meta
                    title="Price"
                    description={<strong>${product.price}</strong>}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="Status"
                    description={
                      product.countInStock > 0 ? "In Stock" : "Out Of Stock"
                    }
                  />
                </List.Item>
                {product.countInStock > 0 && (
                  <List.Item>
                    <List.Item.Meta
                      title="Qty"
                      description={
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      }
                    />
                  </List.Item>
                )}
                <List.Item>
                  <Button
                    type="primary"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </List.Item>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <List
                dataSource={product.reviews}
                renderItem={(review) => (
                  <List.Item>
                    <List.Item.Meta
                      title={review.name}
                      description={
                        <>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
              <List.Item>
                <h2>Write a Customer Review</h2>
                {successProductReview && (
                  <Message type="success">Review submitted successfully</Message>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview && (
                  <Message type="error">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form layout="vertical" onSubmit={submitHandler}>
                    <Form.Item label="Rating">
                      <Rate value={rating} onChange={(value) => setRating(value)} />
                    </Form.Item>
                    <Form.Item label="Comment">
                      <Input.TextArea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingProductReview}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review{" "}
                  </Message>
                )}
              </List.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

