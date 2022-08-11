import React, { useEffect, useState } from 'react';
import { client } from '@stomp/stompjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import groupOrderService from '../../../../shared/services/api/groupOrderApi';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const GroupOrder = () => {
  const [vendor, setVendor] = useState(null);
  const [productGroup, setProductGroup] = useState([]);
  const [order, setOrder] = useState(null);
  const [link, setLink] = useState('demo');
  const [stompClient, setStompClient] = useState();

  // const { vendor_id } = useParams();
  const vendor_id = 1;
  const user = { username: 'customer', userId: 4 };

  useEffect(() => {
    getProductGroups();
    getVendor();
    setStompClient(Stomp.over(new SockJS('/ws')));
  }, []);

  const handleGetLink = async () => {
    const newLink = await groupOrderService.getLink(user.userId, vendor_id);
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
        sendId: user.userId,
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
        sendId: user.userId,
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
      userId: user.userId,
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

      // <div>
      //   <div>{vendor.intro}</div>
      //   <div>{vendor.profile}</div>
      //   <div>
      //     {vendor.address + ' ' + vendor.district + ' ' + vendor.province}
      //   </div>
      //   <div>{vendor.phone}</div>
      //   <img src={vendor.logo} alt="Logo" width="200px" />
      //   <div>{tvendor.opening_ime}</div>
      //   <div>{vendor.closing_time}</div>
      // </div>
    );
    return vendorInfo;
  };

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div className="container-xxl" key={index + 1}>
        <div className="row mt-5 mb-5">
          <div className="col-2">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{productGroup.name}</li>
                <li className="list-group-item">{productGroup.description}</li>
              </ul>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              {productGroup.product_list.map((product, index) => (
                <div className="card mb-3" key={index}>
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src={product.image_url}
                        alt="Product"
                        width="200px"
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <button
                          className="btn btn-primary float-end"
                          onClick={() => handleAddOrderItem(product, index)}
                        >
                          Đặt món
                        </button>
                        <h5 className="card-title">
                          Tên sản phẩm: {product.title}
                        </h5>
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
          </div>
          <div className="col-4">
            {/* <div>
              {vendor != null && displayVendor(vendor)}
              {displayProductGroups(productGroup)}

              <input
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
              <button onClick={handleOrder}>Order</button>
              {order != null && displayOrder(order)}
            </div> */}

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ưu Đãi</h5>
                <hr className="w-100" />
                <p className="card-text">🌎 Freeship đơn hàng dưới 2km</p>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body my-0">
                <div className="my-0">
                  <h6 className="float-start">ĐƠN HÀNG CỦA BẠN</h6>
                  <button
                    className="btn btn-primary float-end"
                    onClick={connect}
                  >
                    Đặt nhóm
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
                        className="btn btn-primary float-end mx-3"
                        onClick={handleGetLink}
                      >
                        Get Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body mt-0 my-0">
                {order != null && displayOrder(order)}
                <p className="card-text text-center">
                  Hãy chọn món yêu thích của bạn trên menu để đặt giao hàng
                  ngay!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div key={index + 1}>
      //   <p>{productGroup.name}</p>
      //   <p>{productGroup.description}</p>
      //   {productGroup.product_list.map((product, index) => (
      //     <table key={index + 1}>
      //       <thead>
      //         <tr>
      //           <th>STT</th>
      //           <th>Title</th>
      //           <th>Price</th>
      //           <th>Description</th>
      //           <th>Action</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         <tr key={index}>
      //           <td>{index + 1}</td>
      //           <td>{product.title}</td>
      //           <td>{product.price}</td>
      //           <td>{product.description}</td>
      //           <td>
      //             <input type="number" id={'quantity-' + index} />
      //             <button
      //               className="btn btn-primary"
      //               onClick={() => handleAddOrderItem(product, index)}
      //             >
      //               Dat mon
      //             </button>
      //           </td>
      //         </tr>
      //       </tbody>
      //     </table>
      //   ))}
      // </div>
    ));
    return listProductGroups;
  };

  const displayOrder = (order) => {
    const listOrder = (
      <div className="row">
        <div className="col">
          {order.orderItemRedis != null &&
            order.orderItemRedis.map((orderItem, index) => (
              <div className="row">
                <div>
                  <h6>🦸‍♂️ {orderItem.username}</h6>
                </div>
                <h6 className="float-start">
                  Tên sản phẩm: {orderItem.productName}
                </h6>
                <div className="float-end">
                  <h6>Giá: {orderItem.price} đ</h6>
                </div>
              </div>
            ))}
        </div>
        <div className="col">
          <div className="row">
            <h6>Mã giảm giá: {order.discount}</h6>
          </div>
          <div className="row">
            <h6>Tổng (Tạm tính): {order.grandTotal}</h6>
          </div>
        </div>
      </div>

      // <div>
      //   <h1>Order</h1>
      //   <p>Discount: {order.discount}</p>
      //   <p>Shipping: {order.shipping}</p>
      //   <p>Grand Total: {order.grandTotal}</p>
      //   <table>
      //     <thead>
      //       <tr>
      //         <th>STT</th>
      //         <th>Title</th>
      //         <th>Username</th>
      //         <th>Price</th>
      //         <th>Quantity</th>
      //         <th>Total</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {order.orderItemRedis != null &&
      //         order.orderItemRedis.map((orderItem, index) => (
      //           <tr>
      //             <td>{index}</td>
      //             <td>{orderItem.productName}</td>
      //             <td>{orderItem.username}</td>
      //             <td>{orderItem.price}</td>
      //             <td>{orderItem.quantity}</td>
      //             <img src={orderItem.imageUrl} alt="product" />
      //             <td>{orderItem.total}</td>
      //             <td>
      //               <input type="number" id={'orderItem-' + index} />
      //               {orderItem.userId == user.userId && (
      //                 <button
      //                   className="updateOrderItem"
      //                   onClick={() => sendUpdateRequest(orderItem, index)}
      //                 >
      //                   Update
      //                 </button>
      //               )}
      //               {orderItem.userId == user.userId && (
      //                 <button
      //                   className="deleteOrderItem"
      //                   onClick={() => sendDeleteRequest(orderItem)}
      //                 >
      //                   Delete
      //                 </button>
      //               )}
      //             </td>
      //           </tr>
      //         ))}
      //     </tbody>
      //   </table>
      // </div>
    );
    return listOrder;
  };

  return (
    <div>
      {vendor != null && displayVendor(vendor)}
      {displayProductGroups(productGroup)}

      <input
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
      <button onClick={handleOrder}>Order</button>
      {order != null && displayOrder(order)}
    </div>
  );
};

export default GroupOrder;
