import React, { useState, useEffect } from 'react';
import {
  vendorGetOrdersByDate,
  vendorGetRevenueByDate,
} from '../../shared/services/api/statisticsApi';

import { useSelector } from 'react-redux';

const VendorStatistics = () => {
  const [orders, setOrders] = useState([]);
  const [revenues, setRevenues] = useState();

  const vendorId = useSelector((state) => state.auth.user.vendorId);

  const getAllOrders = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await vendorGetOrdersByDate(
              vendorId,
              e.target.startDate.value,
              e.target.endDate.value
            );
            console.log(data);
            setOrders([...data.data]);
          }}
        >
          Ngày bắt đầu:
          <input type="date" name="startDate" />
          <br />
          Ngày kết thúc:
          <input type="date" name="endDate" />
          <br />
          <button type="submit" className="btn btn-primary">
            Xem tất cả order
          </button>
        </form>
      </div>
    );
  };

  const displayOrders = () => {
    const listOrders = orders.map((order, index) => {
      return (
        <div>
          <div>Khách hàng: {order.fullname}</div>
          <br />
          <div>Username: {order.username}</div>
          <br />
          <div>Discount: {order.discount}</div>
          <br />
          <div>Shipping: {order.shipping}</div>
          <br />
          <div>Tổng tiền: {order.grand_total}</div>
          <br />
          <div>Tạo lúc: {order.created_at}</div>
          <br />
          <div>Thay đổi lúc: {order.updated_at}</div>
          <br />
          <hr />
        </div>
      );
    });
    return listOrders;
  };

  const getRevenue = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await vendorGetRevenueByDate(
              vendorId,
              e.target.startDate.value,
              e.target.endDate.value
            );
            console.log(data);
            setRevenues(data.data.grand_total);
          }}
        >
          Ngày bắt đầu:
          <input type="date" name="startDate" />
          <br />
          Ngày kết thúc:
          <input type="date" name="endDate" />
          <br />
          <button type="submit" className="btn btn-primary">
            Xem tất cả doanh thu
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {getAllOrders()}
      {displayOrders()}
      {getRevenue()}
      <div>Doanh thu: {revenues}</div>
    </div>
  );
};

export default VendorStatistics;
