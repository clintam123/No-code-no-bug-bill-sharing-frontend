import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  deleteProductReviewApi,
  getProductReviewApi,
  postProductReviewApi,
  putProductReviewApi,
} from '../../shared/services/api/manageProductApi';

import { useSelector } from 'react-redux';

const ProductReview = () => {
  const productId = useParams().id;
  const userId = useSelector((state) => state.auth.user.id);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const data = await getProductReviewApi(productId);
      setReviews([...data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const addReviewForm = () => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postProductReviewApi(productId, {
              title: e.target.title.value,
              content: e.target.content.value,
              rating: e.target.rating.value,
              user_id: userId,
            });
            window.location.reload();
          }}
        >
          Tiêu đề:
          <input type="text" name="title" /> <br />
          Nội dung:
          <input type="text" name="content" /> <br />
          Rating:
          <input type="number" name="rating" min="1" max="10" /> <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Thêm review
          </button>
        </form>
      </div>
    );
  };

  const displayReviews = () => {
    const listReviews = reviews.map((review, index) => {
      return (
        <div key={index}>
          <div>Tên người dùng: {review.customer_name}</div>
          <div>Tiêu đề: {review.title}</div>
          <div>Nội dung: {review.content}</div>
          <div>Rating: {review.rating}</div>
          <div>Tạo lúc: {review.modified_at}</div>
          {userId == review.user_id && updateReviewForm(review.review_id)}
          {userId == review.user_id && deleteReview(review.review_id)}
          <br />
        </div>
      );
    });
    return listReviews;
  };

  const updateReviewForm = (id) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            putProductReviewApi(id, {
              title: e.target.title.value,
              content: e.target.content.value,
              rating: e.target.rating.value,
              user_id: userId,
            });
            window.location.reload();
          }}
        >
          Tiêu đề:
          <input type="text" name="title" /> <br />
          Nội dung:
          <input type="text" name="content" /> <br />
          Rating:
          <input type="number" name="rating" min="1" max="10" /> <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Update review
          </button>
        </form>
      </div>
    );
  };

  const deleteReview = (id) => {
    return (
      <div>
        <button
          onClick={() => {
            deleteProductReviewApi(id);
            window.location.reload();
          }}
          className="btn btn-primary"
        >
          Xóa review
        </button>
      </div>
    );
  };

  return (
    <div>
      {displayReviews()}
      {addReviewForm()}
    </div>
  );
};

export default ProductReview;
