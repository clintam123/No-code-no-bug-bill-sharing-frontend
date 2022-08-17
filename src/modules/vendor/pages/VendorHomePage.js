import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import groupOrderService from '../../../shared/services/api/groupOrderApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  addProductApi,
  deleteProductApi,
  deleteProductGroupApi,
  postProductGroupApi,
  putProductGroupApi,
  updateProductApi,
  updateProductImage,
} from '../../../shared/services/api/manageProductApi';
import { getAllCategoryApi } from '../../../shared/services/api/manageCategoryApi';
import { updateVendorImage } from '../../../shared/services/api/manageVendorApi';
import Navbar from '../../public/Navbar';

const VendorHomePage = () => {
  const [vendor, setVendor] = useState(null);
  const [productGroup, setProductGroup] = useState([]);
  const [categories, setCategories] = useState([]);

  const vendorId = useSelector((state) => state.auth.user.vendorId);

  useEffect(() => {
    getProductGroups();
    getCategories();
    getVendor();
  }, []);

  const getProductGroups = async () => {
    try {
      const data = await groupOrderService.getProductGroup(vendorId);
      setProductGroup([...data.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getVendor = async () => {
    try {
      const data = await groupOrderService.getVendor(vendorId);
      setVendor(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getAllCategoryApi();
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const displayVendor = (vendor) => {
    const vendorInfo = (
      <div className="container-xxl">
        <div className="row mt-5">
          <div className="card mb-3">
            <div className="row">
              <div className="col">
                <img src={vendor.logo} alt="Logo" width="100%" />
              </div>
              <div className="col">
                <img src={vendor.logo} alt="Logo" width="100%" />
              </div>
              <div className="col">
                <img src={vendor.logo} alt="Logo" width="100%" />
              </div>
            </div>
            <div className="card-body ml-5">
              <div className="row">
                <div className="col ml-5">
                  <h5 className="card-title">{vendor.intro}</h5>
                  <p className="card-text">
                    🏠 Địa chỉ:
                    {vendor.address +
                      ' ' +
                      vendor.district +
                      ' ' +
                      vendor.province}
                  </p>
                  <p className="card-text">🌎 13km</p>
                  <p className="card-text">📞 Số điện thoại: {vendor.phone}</p>
                  <p className="card-text">
                    ⌚ Thời gian mở cửa: {vendor.opening_time}
                  </p>
                  <p className="card-text">
                    ⏱️ Thời gian đóng cửa: {vendor.closing_time}
                  </p>
                </div>
                <div className="col mt-5">
                  <p className="card-text mt-5">
                    🔗 https://loship.vn/trungnguyenlegendcoffeenhachung
                  </p>
                  <p className="card-text">
                    🏠 Xem chi nhánh khác tại Trung Nguyên Legend Coffee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return vendorInfo;
  };

  const handleAddProductGroup = async (event) => {
    event.preventDefault();
    const param = {
      name: event.target.name.value,
      description: event.target.description.value,
      vendor_id: vendorId,
    };
    const data = await postProductGroupApi(param);
    // setProductGroup(data)
    window.location.reload();
  };

  const addProductGroup = () => {
    const addForm = (
      <div>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Them
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleAddProductGroup}>
                  Name:
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                  />{' '}
                  <br />
                  Description:
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                  />
                  <br />
                  <button type="submit" className="btn btn-success">
                    them product group
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-success">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return addForm;
  };

  const handleUpdateProductGroup = (productGroupId, name, description) => {
    const param = {
      id: productGroupId,
      data: {
        name,
        description,
        vendor_id: vendorId,
      },
    };
    const data = putProductGroupApi(param);
    // getProductGroups();
    window.location.reload();
  };

  const updateProductGroup = (productGroupId) => {
    const updateForm = (
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateProductGroup(
              productGroupId,
              event.target.name.value,
              event.target.description.value
            );
          }}
        >
          Name:
          <input type="text" name="name" className="form-control" /> <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          <button type="submit" className="btn btn-success">
            update product group
          </button>
        </form>
      </div>
    );
    return updateForm;
  };

  const deleteProductGroup = (productGroupId) => {
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            deleteProductGroupApi(productGroupId);
            window.location.reload();
          }}
        >
          Delete product group
        </button>
      </div>
    );
  };

  const handleAddProduct = (
    productGroupId,
    title,
    description,
    price,
    discount,
    quantity,
    categoryId
  ) => {
    const param = {
      title,
      description,
      price,
      discount,
      quantity,
      category_id: categoryId,
      vendor_id: vendorId,
      product_group_id: productGroupId,
    };
    const data = addProductApi(param);
    // console.log(data);
    console.log(productGroupId);
    window.location.reload();
  };

  const addProduct = (productGroupId) => {
    return (
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddProduct(
              productGroupId,
              event.target.title.value,
              event.target.description.value,
              event.target.price.value,
              event.target.discount.value,
              event.target.quantity.value,
              event.target.category.value
            );
          }}
        >
          <p>{productGroupId}</p>
          Title:
          <input type="text" name="title" className="form-control" />
          <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          Price:
          <input type="number" name="price" className="form-control" />
          <br />
          Discount:
          <input type="number" name="discount" className="form-control" />
          <br />
          Quantity:
          <input type="number" name="quantity" className="form-control" />
          <br />
          Category:
          <select
            class="form-select"
            name="category"
            aria-label="Default select example"
          >
            {categories.map((category) => (
              <option value={category.id}>{category.title}</option>
            ))}
          </select>
          <div className="row">
            <div className="col-8 mt-2">
              <button type="submit" className="btn btn-success">
                add product
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const handleUpdateProduct = (
    productId,
    productGroupId,
    title,
    description,
    price,
    discount,
    quantity,
    categoryId
  ) => {
    console.log(productId);
    const param = {
      id: productId,
      data: {
        title,
        description,
        price,
        discount,
        quantity,
        category_id: categoryId,
        vendor_id: vendorId,
        product_group_id: productGroupId,
      },
    };
    const data = updateProductApi(param);
    console.log(data);
    // getProductGroups();
    window.location.reload();
  };

  const updateProduct = (productId, productGroupId) => {
    return (
      <div>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target={`#updateProductModal_${productId}`}
        >
          Update
        </button>
        <div
          class="modal fade"
          id={`updateProductModal_${productId}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Update Product
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleUpdateProduct(
                      productId,
                      productGroupId,
                      event.target.title.value,
                      event.target.description.value,
                      event.target.price.value,
                      event.target.discount.value,
                      event.target.quantity.value,
                      event.target.category.value
                    );
                  }}
                >
                  Title:
                  <input type="text" name="title" className="form-control" />
                  <br />
                  Description:
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                  />
                  <br />
                  Price:
                  <input type="number" name="price" className="form-control" />
                  <br />
                  Discount:
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                  />
                  <br />
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                  />
                  <br />
                  Category:
                  <select
                    class="form-select"
                    name="category"
                    aria-label="Default select example"
                  >
                    {categories &&
                      categories.map((category) => (
                        <option value={category.id}>{category.title}</option>
                      ))}
                  </select>
                  <button type="submit" className="btn btn-success mt-3">
                    update product
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deleteProduct = (productId) => {
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            deleteProductApi(productId);
            getProductGroups();
          }}
        >
          Delete product
        </button>
      </div>
    );
  };

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div key={index + 1} className="card mt-3">
        <div className="row mt-3">
          <div className="col-8">
            <p className="text-success fw-bold">Name: {productGroup.name}</p>
          </div>
          <div className="col-3">
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target={`#updateProductGroupModal_${productGroup.id}`}
            >
              Update
            </button>
            <div
              class="modal fade"
              id={`updateProductGroupModal_${productGroup.id}`}
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {updateProductGroup(productGroup.id)}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-end">
              {deleteProductGroup(productGroup.id)}
            </div>
          </div>
        </div>
        <p className="text-success fw-bold">
          Description: {productGroup.description}
        </p>

        <button
          type="button"
          class="btn btn-success col-2"
          data-bs-toggle="modal"
          data-bs-target={`#addProductModal_${productGroup.id}`}
        >
          Create Product
        </button>

        <div
          class="modal fade"
          id={`addProductModal_${productGroup.id}`}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">{addProduct(productGroup.id)}</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {productGroup.product_list.map((product, index) => (
          <div class="card mb-3 mt-2">
            <div class="row g-0">
              <div class="col-md-4">
                <img src={product.image_url} alt="Product" width="200px" />
              </div>
              <div class="col-md-8">
                <div className="row">
                  <div className="col">
                    <div class="card-body">
                      <h5 class="card-title">Id: {product.id}</h5>
                      <h5 class="card-title">Name: {product.title}</h5>
                      <h5 class="card-title">Price: {product.price}</h5>
                      <h5 class="card-title">Quantity: {product.quantity}</h5>
                      <h5 class="card-title">
                        Description: {product.description}
                      </h5>
                      <h5 class="card-title">Sku: {product.sku}</h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row mt-5 px-4 p-0">
                      <div className="col-2 mx-5">
                        {updateProduct(product.id, productGroup.id)}
                      </div>
                      <div className="col">
                        {deleteProduct(product.id, productGroup.id)}
                      </div>
                      {updateProductImageForm(product.id)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
    return listProductGroups;
  };

  const updateVendorImageForm = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(e.target.vendorImage.files[0]);
            await updateVendorImage(vendorId, {
              file: e.target.vendorImage.files[0],
            });
            window.location.reload();
          }}
        >
          <div className="container">
            <label for="vendorImage">Select Vendor Image:</label>
            <input type="file" id="vendorImage" name="vendorImage" />
            <br />
            <input type="submit" className="btn btn-success" />
          </div>
        </form>
      </div>
    );
  };

  const updateProductImageForm = (id) => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(e.target.productImage.files[0]);
            await updateProductImage(id, {
              file: e.target.productImage.files[0],
            });
            window.location.reload();
          }}
        >
          <div className="mx-5">
            <label for="productImage">Select Product Image:</label>
            <input type="file" id="productImage" name="productImage" />
            <br />
            <input type="submit" className="btn btn-success mt-1" />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {vendor != null && displayVendor(vendor)}
      {updateVendorImageForm()}

      <div className="container mt-5">
        <div className="row">
          {addProductGroup()}
          {displayProductGroups(productGroup)}
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
