import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByCategoryApi } from '../../shared/services/api/manageProductApi';

import 'bootstrap/dist/css/bootstrap.min.css';

const ProductByCategory = () => {
  const categoryTitle = useParams('title').title;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await getProductByCategoryApi(categoryTitle);
    setProducts([...data.data]);
  };

  const displayProducts = (products) => {
    const listProducts = products.map((product, index) => (
      <div key={index} className="px-3 col-2 card mx-3">
        <a
          className="text-decoration-none text-success"
          href={`../../order/vendor/${product.vendor_id}`}
        >
          <div className=" ">
            <img
              src={product.product_image}
              alt="Product"
              className="card-img-top mt-3"
              width="70%"
            />
            <div className="card-body">
              <h5 className="card-title">🍥Sản phẩm: {product.product_name}</h5>
              <p className="card-text">📝Mô tả: {product.description}</p>
              <p className="card-text">💰price: {product.price}đ</p>
            </div>
            <div className="container">
              <hr />
            </div>
            <img
              src={product.vendor_logo}
              alt="Vendor"
              className="mt-3 card-img-top"
              width="70%"
            />
            <p className="card-text">📞Vendor: {product.vendor}</p>
          </div>
        </a>
      </div>
    ));
    return listProducts;
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a
                class="nav-link active"
                aria-current="page"
                href="http://localhost:3000/"
              >
                Home
              </a>
              <a class="nav-link" href="/product/search">
                | Tìm kiếm sản phẩm
              </a>
              <a class="nav-link" href="/account">
                | Quản lí tài khoản
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">{displayProducts(products)}</div>
      </div>
    </div>
  );
};
export default ProductByCategory;
