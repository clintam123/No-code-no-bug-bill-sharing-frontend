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
      sendId: user.userId,
    };
    sendAddRequest(orderItem);
  };

  // Product group

  const handleOrder = async () => {
    const data = await groupOrderService.sendOrder(link);
  };

  const displayVendor = (vendor) => {
    const vendorInfo = (
      <div>
        <div>{vendor.intro}</div>
        <div>{vendor.profile}</div>
        <div>
          {vendor.address + ' ' + vendor.district + ' ' + vendor.province}
        </div>
        <div>{vendor.phone}</div>
        <img src={vendor.logo} alt="Logo" width="200px"/>
        <div>{vendor.opening_time}</div>
        <div>{vendor.closing_time}</div>
      </div>
    );
    return vendorInfo;
  };

  const displayProductGroups = (data) => {
    const listProductGroups = data.map((productGroup, index) => (
      <div class="container-xxl" key={index + 1}>
        <div class="row mt-5">
          <div class="col">
            <div class="card mb-3">
              {/* <img src="images/benner1.jpg" class="card-img-top" width="20px" alt="..."> */}
              <div class="card-body">
                <h5 class="card-title">{productGroup.name}</h5>
                <p class="card-text">{productGroup.description}</p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5 mb-5">
          <div class="col-3">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Món Ăn</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              {productGroup.product_list.map((product, index) => (
                <div class="card mb-3" key={index}>
                  <div class="row g-0">
                    <div class="col-md-3">
                      <img
                        src={product.image_url}
                        alt="Product"
                        width="200px"
                      />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <button
                          class="btn btn-primary float-end"
                          onClick={() => handleAddOrderItem(product, index)}
                        >
                          Đặt món
                        </button>
                        <h5 class="card-title">{product.title}</h5>
                        <h6 class="card-text">{product.price}</h6>
                        <p class="card-text">{product.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Ưu Đãi</h5>
                {/* <hr> */}
                <p class="card-text"> Freeship đơn hàng dưới 2km</p>
              </div>
            </div>

            <div class="card mt-3">
              <div class="card-body my-0">
                <div class="my-0">
                  <p class="float-start">ĐƠN HÀNG CỦA BẠN</p>
                  <button class="btn btn-primary float-end">Đặt Nhóm</button>
                </div>
              </div>
              <div class="card-body mt-0 my-0">
                {/* <hr> */}
                <p class="card-text text-center">
                  {' '}
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
      <div>
        <h1>Order</h1>
        <p>Discount: {order.discount}</p>
        <p>Shipping: {order.shipping}</p>
        <p>Grand Total: {order.grandTotal}</p>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Title</th>
              <th>Username</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItemRedis != null &&
              order.orderItemRedis.map((orderItem, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{orderItem.productName}</td>
                  <td>{orderItem.username}</td>
                  <td>{orderItem.price}</td>
                  <td>{orderItem.quantity}</td>
                  <td>{orderItem.total}</td>
                  <td>
                    <input type="number" id={'orderItem-' + index} />
                    {orderItem.userId == user.userId && (
                      <button
                        className="updateOrderItem"
                        onClick={() => sendUpdateRequest(orderItem, index)}
                      >
                        Update
                      </button>
                    )}
                    {orderItem.userId == user.userId && (
                      <button
                        className="deleteOrderItem"
                        onClick={() => sendDeleteRequest(orderItem)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
