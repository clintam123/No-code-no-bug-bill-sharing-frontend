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
      <div key={index} className="px-3 col-2">
        <a href={`../../order/vendor/${product.vendor_id}`}>
          <div className=" ">
            <img
              src={product.product_image}
              alt="Product"
              className=""
              width="70%"
            />
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}đ</p>
            </div>
            <img
              src={product.vendor_logo}
              alt="Vendor"
              className=""
              width="70%"
            />
            <p className="card-text">{product.vendor}</p>
          </div>
        </a>
      </div>
    ));
    return listProducts;
  };

  return (
    <div>
      <div>Product</div>
      {displayProducts(products)}
    </div>
  );
};
export default ProductByCategory;
