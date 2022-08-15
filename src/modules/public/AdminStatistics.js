import React, { useState, useEffect } from 'react';
import {
  adminGetOrdersByDate,
  adminGetRevenuesByDate,
} from '../../shared/services/api/statisticsApi';

const AdminStatistics = () => {
  const [orders, setOrders] = useState([]);
  const [revenues, setRevenues] = useState([]);

  const getAllOrders = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await adminGetOrdersByDate(
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
          <div>Tên quán ăn: {order.intro}</div>
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

  const getAllRevenue = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = await adminGetRevenuesByDate(
              e.target.startDate.value,
              e.target.endDate.value
            );
            console.log(data);
            setRevenues([...data.data]);
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

  const displayRevenues = () => {
    const listRevenues = revenues.map((revenue, index) => {
      return (
        <div>
          <div>Tên quán ăn: {revenue.intro}</div>
          <br />
          <div>Địa chỉ: {revenue.address}</div>
          <br />
          <div>Quận: {revenue.district}</div>
          <br />
          <div>Tỉnh: {revenue.province}</div>
          <br />
          <div>Doanh thu: {revenue.revenue}</div>
          <br />
          <hr />
        </div>
      );
    });
    return listRevenues;
  };

  return (
    <div>
      {getAllOrders()}
      {displayOrders()}
      {getAllRevenue()}
      {displayRevenues()}
    </div>
  );
};

export default AdminStatistics;
