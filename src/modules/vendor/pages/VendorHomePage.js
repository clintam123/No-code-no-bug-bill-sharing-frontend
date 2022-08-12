import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import groupOrderService from "../../../shared/services/api/groupOrderApi";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  addProductApi,
  deleteProductApi,
  deleteProductGroupApi,
  postProductGroupApi,
  putProductGroupApi,
  updateProductApi,
} from "../../../shared/services/api/manageProductApi";
import { getAllCategoryApi } from "../../../shared/services/api/manageCategoryApi";

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
      console.log(data.data);
      console.log(categories);
    } catch (err) {
      console.log(err);
    }
  };

  const displayVendor = (vendor) => {
    const vendorInfo = (
      <div>
        <div>{vendor.intro}</div>
        <div>{vendor.profile}</div>
        <div>
          {vendor.address + " " + vendor.district + " " + vendor.province}
        </div>
        <div>{vendor.phone}</div>
        <img src={vendor.logo} alt="Logo" width="200px" />
        <div>{vendor.opening_time}</div>
        <div>{vendor.closing_time}</div>
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
    console.log(data);
    setProductGroup([...productG]);
  };

  const addProductGroup = () => {
    const addForm = (
      <div>
        <form onSubmit={handleAddProductGroup}>
          Name:
          <input type="text" name="name" className="form-control" /> <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          <button type="submit" className="btn btn-primary">
            them product group
          </button>
        </form>
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
    console.log(data);
    getProductGroups();
  };

  const updateProductGroup = (productGroupId) => {
    const updateForm = (
      <div>
        <form
          onSubmit={(event) =>
            handleUpdateProductGroup(
              productGroupId,
              event.target.name.value,
              event.target.description.value
            )
          }
        >
          Name:
          <input type="text" name="name" className="form-control" /> <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          <button type="submit" className="btn btn-primary">
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
          className="btn btn-primary"
          onClick={() => deleteProductGroupApi(productGroupId)}
        >
          Delete product group
        </button>
      </div>
    );
  };

  const handleAddProduct = (
    productGroupId,
    name,
    description,
    price,
    discount,
    quantity,
    categoryId
  ) => {
    const param = {
      name,
      description,
      price,
      discount,
      quantity,
      category_id: categoryId,
      vendor_id: vendorId,
      product_group_id: productGroupId
    };
    const data = addProductApi(param);
    console.log(data);
    getProductGroups();
  };

  const addProduct = (productGroupId) => {
    return (
      <div>
        <form
          onSubmit={(event) =>
            handleAddProduct(
              productGroupId,
              event.target.name.value,
              event.target.description.value,
              event.target.price.value,
              event.target.discount.value,
              event.target.quantity.value,
              event.target.category.value
            )
          }
        >
          Name:
          <input type="text" name="title" className="form-control" />
          <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          Price:
          <input type="text" name="price" className="form-control" />
          <br />
          Discount:
          <input type="text" name="discount" className="form-control" />
          <br />
          Quantity:
          <input type="text" name="quantity" className="form-control" />
          <br />
          Category:
          <select name="category">
            {categories.map((category) => (
              <option value={category.id}>{category.title}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            add product
          </button>
        </form>
      </div>
    );
  };

  const handleUpdateProduct = (
    productId,
    productGroupId,
    name,
    description,
    price,
    discount,
    quantity,
    categoryId
  ) => {
    const param = {
      id: productId,
      data: {
        name,
        description,
        price,
        discount,
        quantity,
        category_id: categoryId,
        vendor_id: vendorId,
        product_group_id: productGroupId
      },
    };
    const data = updateProductApi(param);
    console.log(data);
    getProductGroups();
  };

  const updateProduct = (productGroupId, productId) => {
    return (
      <div>
        <form
          onSubmit={(event) =>
            handleUpdateProduct(
              productId,
              productGroupId,
              event.target.name.value,
              event.target.description.value,
              event.target.price.value,
              event.target.discount.value,
              event.target.quantity.value,
              event.target.category.value
            )
          }
        >
          Name:
          <input type="text" name="title" className="form-control" />
          <br />
          Description:
          <input type="text" name="description" className="form-control" />
          <br />
          Price:
          <input type="text" name="price" className="form-control" />
          <br />
          Discount:
          <input type="text" name="discount" className="form-control" />
          <br />
          Quantity:
          <input type="text" name="quantity" className="form-control" />
          <br />
          Category:
          <select name="category">
            {categories && categories.map((category) => (
              <option value={category.id}>{category}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            update product 
          </button>
        </form>
      </div>
    );
  };

  const deleteProduct = (productId) => {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={deleteProductApi(productId)}
        >
          Delete product 
        </button>
      </div>
    );
  };

  // const displayProductGroups = (data) => {
  //   const listProductGroups = data.map((productGroup, index) => (
  //     <div class="container-xxl" key={index + 1}>
  //       <div class="row mt-5">
  //         <div class="col">
  //           <div class="card mb-3">
  //             {/* <img src="images/benner1.jpg" class="card-img-top" width="20px" alt="..."> */}
  //             <div class="card-body">
  //               <h5 class="card-title">{productGroup.name}</h5>
  //               <p class="card-text">{productGroup.description}</p>
  //               <p class="card-text">
  //                 <small class="text-muted">Last updated 3 mins ago</small>
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="row mt-5 mb-5">
  //         <div class="col-3">
  //           <div class="card">
  //             <ul class="list-group list-group-flush">
  //               <li class="list-group-item">Món Ăn</li>
  //               <li class="list-group-item">A second item</li>
  //               <li class="list-group-item">A third item</li>
  //               <li class="list-group-item">A fourth item</li>
  //               <li class="list-group-item">And a fifth one</li>
  //             </ul>
  //           </div>
  //         </div>
  //         <div class="col-6">
  //           <div class="row">
  //             {productGroup.product_list.map((product, index) => (
  //               <div class="card mb-3" key={index}>
  //                 <div class="row g-0">
  //                   <div class="col-md-3">
  //                     <img
  //                       src={product.image_url}
  //                       alt="Product"
  //                       width="200px"
  //                     />
  //                   </div>
  //                   <div class="col-md-9">
  //                     <div class="card-body">
  //                       <h5 class="card-title">{product.title}</h5>
  //                       <h6 class="card-text">{product.price}</h6>
  //                       <p class="card-text">{product.description}</p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //         <div class="col-3">
  //           <div class="card">
  //             <div class="card-body">
  //               <h5 class="card-title">Ưu Đãi</h5>
  //               {/* <hr> */}
  //               <p class="card-text"> Freeship đơn hàng dưới 2km</p>
  //             </div>
  //           </div>

  //           <div class="card mt-3">
  //             <div class="card-body my-0">
  //               <div class="my-0">
  //                 <p class="float-start">ĐƠN HÀNG CỦA BẠN</p>
  //                 <button class="btn btn-primary float-end">Đặt Nhóm</button>
  //               </div>
  //             </div>
  //             <div class="card-body mt-0 my-0">
  //               {/* <hr> */}
  //               <p class="card-text text-center">
  //                 {' '}
  //                 Hãy chọn món yêu thích của bạn trên menu để đặt giao hàng
  //                 ngay!
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     ));
  //     return listProductGroups;
  //   };

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div key={index + 1}>
        <p>{productGroup.name}</p>
        <p>{productGroup.description}</p>
        {updateProductGroup(productGroup.id)}
        {deleteProductGroup(productGroup.id)}
        {addProduct(productGroup.id)}
        {productGroup.product_list.map((product, index) => (
          <table key={index + 1}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>'
                <img src={product.image_url} alt="Product" width="200px" />
                {updateProduct(product.id, productGroup.id)}
                {deleteProduct(product.id, productGroup.id)}
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    ));
    return listProductGroups;
  };

  return (
    <div>
      <div>VendorHomePage123</div>
      {vendor != null && displayVendor(vendor)}
      {displayProductGroups(productGroup)}
      {addProductGroup()}
    </div>
  );
};

export default VendorHomePage;
