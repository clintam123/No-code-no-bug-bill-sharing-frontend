import React, { useEffect, useState } from 'react';
import { client } from '@stomp/stompjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import groupOrderService from '../../../../shared/services/api/groupOrderApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const GroupOrder = () => {
  const [vendor, setVendor] = useState(null);
  const [productGroup, setProductGroup] = useState([]);
  const [order, setOrder] = useState(null);
  const [link, setLink] = useState('demo');
  const [stompClient, setStompClient] = useState();

  // const { vendor_id } = useParams();
  const vendor_id = 1;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getProductGroups();
    getVendor();
    setStompClient(Stomp.over(new SockJS('/ws')));
  }, []);

  const handleGetLink = async () => {
    const newLink = await groupOrderService.getLink(user.id, vendor_id);
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
    stompClient.send(
      '/app/update-order-item/' + link,
      {},
      JSON.stringify({
        ...orderItem,
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
    const orderItem = {
      productId: product.id,
      total: product.price * quantity,
      quantity: quantity,
      userId: user.id,
      username: user.username,
      content: 'test',
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
  };

  const displayVendor = (vendor) => {
    const vendorInfo = (
      <div className="container-xxl">
        <div className="row mt-5">
          <div className="card mb-3">
            <img src={vendor.logo} alt="Logo" />
            <div className="card-body ml-5">
              <div className="row">
                <div className="col ml-5">
                  <h5 className="card-title">{vendor.profile}</h5>
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

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div className="row">
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
                    Đặt món
                  </button>
                  <h5 className="card-title">Tên sản phẩm: {product.title}</h5>
                  <h6 className="card-text">Giá: {product.price}</h6>
                  <p className="card-text">Loại: {product.description}</p>
                  <p className="card-text">
                    <div className="input-group mb-3">
                      <label htmlFor="">Số lượng:</label>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id={'quantity-' + index}
                      placeholder="Số lượng"
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
                    Tài khoản: {orderItem.username}
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="card-body p-0 mx-3 mb-2 ">
                  <h5 className="cart-title float-start">
                    {orderItem.productName}
                  </h5>
                  <h5 className="float-end text-danger mx-3">
                    {orderItem.price} đ
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="card-body p-0 mx-3 mb-2 ">
                  <h5 className="cart-title float-start">Số Lượng:</h5>
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
                      Thay đổi
                    </button>
                  )}
                </div>
                <div className="col-6">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id={'orderItem-' + index}
                      placeholder="Thay đổi số lượng"
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
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              <div className="row">
                <div class="card-body p-0 mx-3 mt-2 mb-3">
                  <h6 class="float-start">Thành Tiền :</h6>
                  <h6 class="float-end text-danger mx-3">
                    {' '}
                    {orderItem.total} đ
                  </h6>
                </div>
              </div>
              <hr class="text-danger" />
            </div>
          ))}
        <div className="row">
          <div class="card-body p-0 mx-3">
            <h6 class="float-start">Mã Giảm Giá (Nếu có) : {order.discount}</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2">
            <h6 class="float-start">Tiền Shipping :</h6>
            <h6 class="float-end text-danger"> {order.shipping} đ</h6>
          </div>
        </div>
        <div className="row">
          <div class="card-body p-0 mx-3 mt-2 mb-3">
            <h6 class="float-start">Tổng (Tạm tính) :</h6>
            <h6 class="float-end text-danger"> {order.grandTotal} đ</h6>
          </div>
        </div>
        <hr class="text-danger" />
      </div>
    );
    return listOrder;
  };

  return (
    <div>
      {vendor != null && displayVendor(vendor)}
      <div className="container-xxl">
        <div className="row mt-5 mb-5">
          <div className="col-2">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Bánh Bao</li>
                <li className="list-group-item">Bánh bao trứng thịt</li>
              </ul>
            </div>
          </div>
          <div className="col-6">{displayProductGroups(productGroup)}</div>

          <div className="col-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Ưu Đãi</h5>
                <hr className="w-100" />
                <p className="card-text">🌎 Freeship đơn hàng dưới 2km</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body my-0">
                <div className="my-0">
                  <h6 className="float-start">ĐƠN HÀNG CỦA BẠN</h6>
                  <button
                    className="btn btn-primary float-end"
                    onClick={handleGetLink}
                  >
                    Lấy link
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
                        Đặt nhóm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {order != null && displayOrder(order)}

              <div className="card-body mt-0 my-0">
                <p className="card-text text-center">
                  Hãy chọn món yêu thích của bạn trên menu để đặt giao hàng
                  ngay!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <input
        id="link"
        type="text"
        value={link}
        name="Link"
        onChange={(e) => setLink(e.target.value)}
      />
      <button className="btn btn-primary" onClick={connect}>
        Connect
      </button>
      <br />
      <button onClick={handleGetLink}>Get Link</button>
      <button onClick={handleOrder}>Order</button> */}

      {/* {order != null && displayOrder(order)} */}
    </div>
  );
};

export default GroupOrder;
