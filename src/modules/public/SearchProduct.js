import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductByCategoryApi,
  seachProductApi,
} from '../../shared/services/api/manageProductApi';

import 'bootstrap/dist/css/bootstrap.min.css';

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState();
  const [vendorName, setVendorName] = useState();
  const [sort, setSort] = useState(0);

  const getProducts = async (event) => {
    event.preventDefault();
    const data = await seachProductApi({
      productName,
      vendorName,
      sort: parseInt(sort),
    });
    setProducts([...data.data]);
  };

  const test = (event) => {
    event.preventDefault();
    console.log({
      productName,
      vendorName,
      sort: parseInt(sort),
    });
  };

  const searchBar = () => {
    return (
      <form onSubmit={getProducts}>
        Tên món ăn:
        <input
          type="text"
          name="productName"
          onChange={(event) => setProductName(event.target.value)}
        />{' '}
        <br />
        Tên quán ăn:
        <input
          type="text"
          name="vendorName"
          onChange={(event) => setVendorName(event.target.value)}
        />
        <br />
        Sắp xếp theo:
        <select name="sort" onChange={(event) => setSort(event.target.value)}>
          <option value="0">Mặc định</option>
          <option value="1">Rating</option>
          <option value="2">Discount</option>
        </select>
        <br />
        <button type="submit" className="btn btn-success">Tìm kiếm</button>
      </form>
    );
  };

  const displayProducts = (products) => {
    const listProducts = products.map((product, index) => (
      <div key={index} className="px-3 col-2  card mx-3">
        <a className="text-decoration-none text-black"  href={`../order/vendor/${product.vendor_id}`}>
          <div className=" ">
            <img
              src={product.product_image}
              alt="Product"
              className="card-img-top mt-3"
              width="70%"
            />
            <div className="card-body">
              <h5 className="card-title">🍥Tên: {product.product_name}</h5>
              <p className="card-text">📝Mô tả: {product.description}</p>
              <p className="card-text">💰Giá: {product.price}đ</p>
            </div>
            <img
              src={product.vendor_logo}
              alt="Vendor"
              className="mt-3 card-img-top"
              width="70%"
            />
            <p className="card-text">📞Vendor:{product.vendor}</p>
          </div>
        </a>
      </div>
    ));
    return listProducts;
  };

  return (
    <div>
        <div className="container mt-4">
          {searchBar()}
          <hr />
          <div className="row">
          {displayProducts(products)}
          </div>
      </div>
    </div>
  );
};
export default SearchProduct;
