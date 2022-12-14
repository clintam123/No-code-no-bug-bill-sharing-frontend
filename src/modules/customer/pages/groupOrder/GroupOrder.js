import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import groupOrderService from '../../../../shared/services/api/groupOrderApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../../public/Navbar';

import { getDistance } from '../../../../shared/services/api/personalOrderApi';

import 'bootstrap/dist/css/bootstrap.min.css';

const GroupOrder = () => {
  const [vendor, setVendor] = useState(null);
  const [productGroup, setProductGroup] = useState([]);
  const [order, setOrder] = useState(null);
  const [link, setLink] = useState('demo');
  const [shipping, setShipping] = useState(null);
  const [stompClient, setStompClient] = useState();

  const vendor_id = useParams().id;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getProductGroups();
    getVendor();
    setStompClient(Stomp.over(new SockJS('/ws')));
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

  const handleGetLink = async () => {
    const newLink = await groupOrderService.getLink(
      user.id,
      vendor_id,
      shipping.shipping
    );
    setLink(newLink.link);
  };

  const getProductGroups = async () => {
    try {
      const data = await groupOrderService.getProductGroup(vendor_id);
      setProductGroup([...data.data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVendor = async () => {
    try {
      const data = await groupOrderService.getVendor(vendor_id);
      setVendor(data.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Web socket

  async function connect() {
    setStompClient(Stomp.over(new SockJS('http://localhost:8080/ws')));
    const status = await groupOrderService.checkLinkExist(link);
    // console.log(data);
    // console.log(data.data);
    if (status) {
      stompClient.connect({}, onConnected, onError);
    } else {
      console.log('Not found link');
    }
  }
  function onConnected() {
    stompClient.subscribe('/topic/group-order/' + link, onMessageReceived);
  }

  function onError(error) {
    console.log('Error:' + error);
  }
  function onMessageReceived(payload) {
    setOrder(JSON.parse(payload.body));
  }

  function sendAddRequest(orderItem) {
    stompClient.send(
      '/app/add-order-item/' + link,
      {},
      JSON.stringify(orderItem)
    );
  }

  function sendUpdateRequest(orderItem, index) {
    const quantity = parseInt(
      document.getElementById('orderItem-' + index).value
    );
    const content = document.getElementById('contentUpdate-' + index).value;
    stompClient.send(
      '/app/update-order-item/' + link,
      {},
      JSON.stringify({
        ...orderItem,
        content: content,
        sendId: user.id,
        quantity: quantity,
        total: quantity * orderItem.price,
      })
    );
  }

  function sendDeleteRequest(orderItem) {
    stompClient.send(
      '/app/delete-order-item/' + link,
      {},
      JSON.stringify({
        ...orderItem,
        sendId: user.id,
      })
    );
  }

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
      content: content,
      price: product.price,
      discount: product.discount,
      productName: product.title,
      imageUrl: product.image_url,
    };
    sendAddRequest(orderItem);
  };

  // Product group

  const handleOrder = async () => {
    const data = await groupOrderService.sendOrder(link);
    console.log(data);
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
      <div className="row">
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
        {order.orderItemRedis != null &&
          order.orderItemRedis.map((orderItem, index) => (
            <div>
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
                      onClick={() => sendUpdateRequest(orderItem, index)}
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
                      type="number"
                      className="form-control"
                      id={'contentUpdate-' + index}
                      placeholder="Thay ?????i ghi ch??"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div class="card-body p-0 mx-3">
                  {orderItem.userId == user.id && (
                    <button
                      className="btn btn-outline-danger float-end mx-3 mt-2"
                      onClick={() => sendDeleteRequest(orderItem)}
                    >
                      X??a
                    </button>
                  )}
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
            <h6 class="float-start">M?? Gi???m Gi?? (N???u c??) : {order.discount}</h6>
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
                  <button
                    className="btn btn-primary float-end"
                    onClick={handleGetLink}
                  >
                    L???y link
                  </button>

                  <div className="input-group mb-3">
                    <hr className="w-100" />
                    <div>
                      <div className="float-start">
                        <input
                          className="form-control"
                          id="link"
                          type="text"
                          value={link}
                          name="Link"
                          onChange={(e) => setLink(e.target.value)}
                          placeholder="Get link"
                        />
                      </div>
                      <button
                        className="btn btn-primary float-end  mx-3"
                        onClick={connect}
                      >
                        ?????t nh??m
                      </button>
                    </div>
                  </div>
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

export default GroupOrder;
