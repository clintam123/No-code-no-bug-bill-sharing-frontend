import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import groupOrderService from '../../../../shared/services/api/groupOrderApi';
import { useParams } from 'react-router-dom';

const GroupOrder = () => {
  const [productGroup, setProductGroup] = useState<any>([]);
  const [order, setOrder] = useState(null);
  const [link, setLink] = useState('demo');
  const [stompClient, setStompClient] = useState<any>();

  // const { vendor_id } = useParams();
  const vendor_id = 1;
  const user = { username: 'customer', userId: 4 };

  useEffect(() => {
    getProductGroups();
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
    } catch (err) {
      console.log(err);
    }
  };

  // Web socket

  async function connect() {
    setStompClient(Stomp.over(new SockJS('htpp://localhost:8080/ws')));
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

  function onError(error: any) {
    console.log('Error:' + error);
  }
  function onMessageReceived(payload: any) {
    setOrder(JSON.parse(payload.body));
  }

  function sendAddRequest(orderItem: any) {
    stompClient.send(
      '/app/add-order-item/' + link,
      {},
      JSON.stringify(orderItem)
    );
  }

  function sendUpdateRequest(orderItem: any, index: any) {
    const quantity: number = parseInt(
      (document.getElementById('orderItem-' + index) as HTMLInputElement)!.value
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

  function sendDeleteRequest(orderItem: any) {
    stompClient.send(
      '/app/delete-order-item/' + link,
      {},
      JSON.stringify({
        ...orderItem,
        sendId: user.userId,
      })
    );
  }

  const handleAddOrderItem = (product: any, index: any) => {
    const quantity: number = parseInt(
      (document.getElementById('quantity-' + index) as HTMLInputElement)!.value
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

  const clearLocalStorage = () => {
    localStorage.removeItem('order');
  };

  const handleOrder = async () => {
    const data = await groupOrderService.sendOrder(link);
  };

  const displayProductGroups = (data: any) => {
    const listProductGroups = data.map((productGroup: any, index: any) => (
      <div key={index + 1}>
        <p>{productGroup.name}</p>
        <p>{productGroup.description}</p>
        {productGroup.product_list.map((product: any, index: any) => (
          <table key={index + 1}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <input type="number" id={'quantity-' + index} />
                  <button
                    className="addProduct"
                    onClick={() => handleAddOrderItem(product, index)}
                  >
                    Dat mon
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    ));
    return listProductGroups;
  };

  const displayOrder = (order: any) => {
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
              order.orderItemRedis.map((orderItem: any, index: any) => (
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
      <h1>Group order</h1>
      {displayProductGroups(productGroup)}

      <input
        id="link"
        type="text"
        value={link}
        name="Link"
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={connect}>Connect</button>
      <br />
      <button onClick={clearLocalStorage}>Clear Local Storage</button>
      <button onClick={handleGetLink}>Get Link</button>
      <button onClick={handleOrder}>Order</button>
      {order != null && displayOrder(order)}
    </div>
  );
};

export default GroupOrder;
