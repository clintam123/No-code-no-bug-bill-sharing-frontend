import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import groupOrderService from '../../../../shared/services/api/groupOrderApi';
import {
  getDistance,
  postOrder,
} from '../../../../shared/services/api/personalOrderApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../../public/Navbar';

const PersonalOrder = () => {
  const [productGroup, setProductGroup] = useState([]);
  const [order, setOrder] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [shipping, setShipping] = useState(null);

  const vendor_id = useParams().id;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getProductGroups();
    getVendor();
    const order = localStorage.getItem('order');
    if (order != null && order.vendor_id == vendor_id) {
      setOrder(JSON.parse(order));
    } else {
      localStorage.removeItem('order');
    }
    getShipping();
  }, []);

  const getShipping = async () => {
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    const origin = latitude + ',' + longitude;
    const res = await getDistance(origin, vendor_id);
    console.log(res);
    setShipping(res);
  };

  const getProductGroups = async () => {
    try {
      const data = await groupOrderService.getProductGroup(vendor_id);
      setProductGroup([...data.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getVendor = async () => {
    try {
      const data = await groupOrderService.getVendor(vendor_id);
      setVendor(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddOrderItem = (product, index) => {
    const quantity = parseInt(
      document.getElementById('quantity-' + index).value
    );
    const content = document.getElementById('contentAdd-' + index).value;
    const orderItem = {
      productId: product.id,
      total: product.price * quantity,
      quantity: quantity,
      userId: user.id,
      username: user.username,
      price: product.price,
      discount: product.discount,
      productName: product.title,
      imageUrl: product.image_url,
      content: content,
    };

    let order = JSON.parse(localStorage.getItem('order'));
    if (order === null) {
      order = {
        status: 0,
        shipping: shipping.shipping,
        grandTotal: orderItem.total + shipping.shipping,
        discount: 0,
        vendor_id: productGroup[0].vendor_id,
        user_id: user.id,
        order_items: [],
      };
    }

    let isIncludes = false;
    order.order_items.forEach((element, idx) => {
      if (element.product_name == orderItem.product_name) {
        isIncludes = true;
        order.order_items[idx] = {
          ...element,
          total: element.total + orderItem.total,
          quantity: element.quantity + orderItem.quantity,
          content: content,
        };
        order.grandTotal += orderItem.total;
      }
    });
    if (!isIncludes) {
      order.order_items.push(orderItem);
    }

    localStorage.setItem('order', JSON.stringify(order));
    setOrder(order);
  };

  function handleUpdate(orderItem, index) {
    const quantity = parseInt(
      document.getElementById('orderItem-' + index).value
    );
    const content = document.getElementById('contentUpdate-' + index).value;
    let order = JSON.parse(localStorage.getItem('order'));
    order.order_items.forEach((element, idx) => {
      if (element.product_name == orderItem.product_name) {
        if (quantity <= 0) {
          order.order_items.splice(idx, 1);
          order.grandTotal -= element.total;
        } else {
          order.grandTotal += quantity * orderItem.price - element.total;
          order.order_items[idx] = {
            ...element,
            total: quantity * orderItem.price,
            quantity: quantity,
            content: content,
          };
        }
      }
    });

    localStorage.setItem('order', JSON.stringify(order));
    setOrder(order);
  }

  const handleOrder = async () => {
    const order = JSON.parse(localStorage.getItem('order'));
    const data = await postOrder(order);
    console.log(data);
    localStorage.removeItem('order');
    alert('?????t h??ng th??nh c??ng!!');
    window.location.href = 'http://localhost:3000';
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
                    ???? ?????a ch???:
                    {vendor.address +
                      ' ' +
                      vendor.district +
                      ' ' +
                      vendor.province}
                  </p>
                  <p className="card-text">???? 13km</p>
                  <p className="card-text">???? S??? ??i???n tho???i: {vendor.phone}</p>
                  <p className="card-text">
                    ??? Th???i gian m??? c???a: {vendor.opening_time}
                  </p>
                  <p className="card-text">
                    ?????? Th???i gian ????ng c???a: {vendor.closing_time}
                  </p>
                </div>
                <div className="col mt-5">
                  <p className="card-text mt-5">
                    ???? https://loship.vn/trungnguyenlegendcoffeenhachung
                  </p>
                  <p className="card-text">
                    ???? Xem chi nh??nh kh??c t???i Trung Nguy??n Legend Coffee
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

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div key={index} className="row">
        <div>{productGroup.name}</div>
        {productGroup.product_list.map((product, index) => (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-md-3">
                <img src={product.image_url} alt="Product" width="200px" />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <button
                    className="btn btn-primary float-end"
                    onClick={() => handleAddOrderItem(product, index)}
                  >
                    ?????t m??n
                  </button>
                  <h5 className="card-title">T??n s???n ph???m: {product.title}</h5>
                  <h6 className="card-text">Gi??: {product.price}</h6>
                  <p className="card-text">Lo???i: {product.description}</p>
                  <p className="card-text">
                    <div className="input-group mb-3">
                      <label htmlFor="">S??? l?????ng:</label>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id={'quantity-' + index}
                      placeholder="S??? l?????ng"
                    />
                    <div className="input-group mb-3">
                      <label htmlFor="">S??? l?????ng:</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id={'contentAdd-' + index}
                      placeholder="Ghi ch??"
                    />
                  </p>

                  <a
                    href={`http://localhost:3000/review/product/${product.id}`}
                  >
                    <button className="btn btn-primary">Xem review</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
    return listProductGroups;
  };

  const displayOrder = (order) => {
    const listOrder = (
      <div>
        {order.order_items != null &&
          order.order_items.map((orderItem, index) => (
            <div key={index}>
              <div className="row">
                <div className="card-body p-0 mx-3 mb-2 ">
                  <h5 className="float-start text-danger">
                    T??i kho???n: {orderItem.username}
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="card-body p-0 mx-3 mb-2 ">
                  <h5 className="cart-title float-start">
                    {orderItem.productName}
                  </h5>
                  <h5 className="float-end text-danger mx-3">
                    {orderItem.price} ??
                  </h5>
                  <br />
                  <h5>Ghi ch??:{orderItem.content}</h5>
                </div>
              </div>

              <div className="row">
                <div className="card-body p-0 mx-3 mb-2 ">
                  <h5 className="cart-title float-start">S??? L?????ng:</h5>
                  <h5 className="float-end text-danger mx-3">
                    {orderItem.quantity}
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="col-5 mx-2">
                  {orderItem.userId == user.id && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleUpdate(orderItem, index)}
                    >
                      Thay ?????i
                    </button>
                  )}
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id={'orderItem-' + index}
                      placeholder="Thay ?????i s??? l?????ng"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id={'contentUpdate-' + index}
                      placeholder="Thay ?????i ghi ch??"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div class="card-body p-0 mx-3 mt-2 mb-3">
                  <h6 class="float-start">Th??nh Ti???n :</h6>
                  <h6 class="float-end text-danger mx-3">
                    {' '}
                    {orderItem.total} ??
                  </h6>
                </div>
              </div>
              <hr class="text-danger" />
            </div>
          ))}
        <div className="row">
          <div class="card-body p-0 mx-3">
            <h6 class="float-start">Gi???m Gi?? : {order.discount}</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2">
            <h6 class="float-start">Ti???n Shipping :</h6>
            <h6 class="float-end text-danger"> {order.shipping} ??</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2">
            <h6 class="float-start">Kho???ng c??ch :</h6>
            <h6 class="float-end text-danger"> {shipping.length} ??</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2">
            <h6 class="float-start">Th???i gian d??? ki???n :</h6>
            <h6 class="float-end text-danger"> {shipping.time} ??</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2 mb-3">
            <h6 class="float-start">T???ng (T???m t??nh) :</h6>
            <h6 class="float-end text-danger"> {order.grandTotal} ??</h6>
          </div>
        </div>
        <hr class="text-danger" />
      </div>
    );
    return listOrder;
  };

  return (
    <div>
      <Navbar />
      {vendor != null && displayVendor(vendor)}
      <div className="container-xxl">
        <div className="row mt-5 mb-5">
          <div className="col-2"></div>
          <div className="col-6">{displayProductGroups(productGroup)}</div>

          <div className="col-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">??u ????i</h5>
                <hr className="w-100" />
                <p className="card-text">???? Freeship ????n h??ng d?????i 2km</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body my-0">
                <div className="my-0">
                  <h6 className="float-start">????N H??NG C???A B???N</h6>
                  <a
                    href={`http://localhost:3000/group-order/vendor/${vendor_id}`}
                  >
                    <button className="btn btn-primary">?????t nh??m</button>
                  </a>
                </div>
              </div>

              {order != null && displayOrder(order)}

              <div className="card-body mt-0 my-0">
                <button onClick={handleOrder} className="btn btn-primary">
                  ?????t h??ng
                </button>
                <p className="card-text text-center">
                  H??y ch???n m??n y??u th??ch c???a b???n tr??n menu ????? ?????t giao h??ng
                  ngay!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalOrder;
