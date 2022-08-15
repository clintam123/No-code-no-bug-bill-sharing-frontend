import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  deleteProductReviewApi,
  getProductReviewApi,
  postProductReviewApi,
  putProductReviewApi,
} from '../../shared/services/api/manageProductApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        <button type="button" class="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#addReviewModal">
          Thêm Review
        </button>

        <div class="modal fade" id="addReviewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Thêm review</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
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
                <div class="modal-body">

                  <div class="form-group mb-3">
                    <label>Title: </label>
                    <input type="text" class="form-control mt-2" name="title" placeholder="Title" />
                  </div>


                  {/* Nội dung:
                  <input type="text" name="content" /> <br /> */}

                  <div class="form-group mb-3">
                    <label>Rating: </label>
                    <input type="number" class="form-control mt-2" min="1" max="10" name="rating" placeholder="Rating" />
                  </div>

                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Nội dung: </label>
                    <textarea class="form-control" name="content" id="exampleFormControlTextarea1" rows="3" placeholder="Nội dung"></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Thêm review
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayReviews = () => {
    const listReviews = reviews.map((review, index) => {
      return (
        <div key={index} className="card mt-3">
          <div className="row">
            <div className="col">
              <h5 className="text-success mt-2">Tên Người Dùng: <span className="text-secondary">{review.customer_name}</span> </h5>
              <h5 className="text-success mt-2">Tiêu đề: <span className="text-secondary">{review.title}</span> </h5>
              <h5 className="text-success mt-2">Nội dung: <span className="text-secondary">{review.content}</span> </h5>
              <h5 className="text-success mt-2">Rating: <span className="text-secondary">{review.rating}</span> </h5>
              <h5 className="text-success mt-2">Tạo lúc: <span className="text-secondary">{review.modified_at}</span> </h5>
            </div>
            <div className="col">
              <div className="row mt-3">
                <div className="col-3"></div>
                <div className="col-3">
                  {userId == review.user_id && updateReviewForm(review.review_id)}
                </div>
                <div className="col-3">
                  {userId == review.user_id && deleteReview(review.review_id)}
                </div>
                <div className="col-3"></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return listReviews;
  };

  const updateReviewForm = (id) => {
    return (
      <div>

        <button type="button" class="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target={`#updateReviewModal_${id}`}>
          Update review
        </button>

        <div class="modal fade" id={`updateReviewModal_${id}`}
        tabindex="-1" 
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update review</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
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
                <div class="modal-body">

                  <div class="form-group mb-3">
                    <label>Title: </label>
                    <input type="text" class="form-control mt-2" name="title" placeholder="Title" />
                  </div>

                  <div class="form-group mb-3">
                    <label>Rating: </label>
                    <input type="number" class="form-control mt-2" min="1" max="10" name="rating" placeholder="Rating" />
                  </div>

                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Nội dung: </label>
                    <textarea class="form-control" name="content" id="exampleFormControlTextarea1" rows="3" placeholder="Nội dung"></textarea>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Update review
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  };

  const deleteReview = (id) => {
    return (
      <div>
        <button type="button" class="btn btn-danger" 
        data-bs-toggle="modal"
        data-bs-target={`#deleteReviewModal_${id}`}>
          Delete Review
        </button>

        <div class="modal fade" id={`deleteReviewModal_${id}`} 
        tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Bạn có thực sự muốn xóa ?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => {
                    deleteProductReviewApi(id);
                    window.location.reload();
                  }} className="btn btn-danger">
                  Xóa review
                </button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        {addReviewForm()}
      </div>
      <div className="row mb-5">
        {displayReviews()}
      </div>
    </div>
  );
};

export default ProductReview;
