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
      <div className="col-12">
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
          <div className="row">
            <div className="col-5"> </div>
            <div className="col-2">
              <div class="form-group">
                <label>Ngày bắt đầu:</label>
                <input type="date" class="form-control" name="startDate" />
              </div>
            </div>

            <div className="col-2">
              <div class="form-group">
                <label>Ngày kết thúc:</label>
                <input type="date" class="form-control" name="endDate" />
              </div>
            </div>

            <div className="col-3 mt-4 mb-4">
              <div class="form-group">
                <button type="submit" className="btn btn-success">
                  Xem tất cả order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const displayOrders = () => {
    const listOrders = orders.map((order, index) => {
      return (

        <tbody>
          <tr>
            <td>{order.fullname}</td>
            <td>{order.username}</td>
            <td>{order.intro}</td>
            <td>{order.discount}</td>
            <td>{order.shipping}</td>
            <td>{order.grand_total}</td>
            <td>{order.created_at}</td>
            <td>{order.updated_at}</td>
          </tr>
        </tbody>

      );
    });
    return listOrders;
  };

  const getAllRevenue = () => {
    return (
      <div className="col-12">
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
          <div className="row">
            <div className="col-5"> </div>
            <div className="col-2">
              <div class="form-group">
                <label>Ngày bắt đầu:</label>
                <input type="date" class="form-control" name="startDate" />
              </div>
            </div>

            <div className="col-2">
              <div class="form-group">
                <label>Ngày kết thúc:</label>
                <input type="date" class="form-control" name="endDate" />
              </div>
            </div>

            <div className="col-3 mt-4 mb-4">
                <button type="submit" className="btn btn-success">
                Xem tất cả doanh thu
                </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const displayRevenues = () => {
    const listRevenues = revenues.map((revenue, index) => {
      return (
        <tbody>
          <tr>
            <td>{revenue.intro}</td>
            <td>{revenue.address}</td>
            <td>{revenue.province}</td>
            <td>{revenue.district}</td>
            <td>{revenue.revenue}</td>
          </tr>
        </tbody>
      );
    });
    return listRevenues;
  };

  return (
    <div className="container">
      <div className="row">
        {getAllOrders()}
      </div>
      <div className="row">
        <table className="table table-bordered border-success table-striped table-hover">
          <thead className="bg-success text-white">
            <tr>
              <th>Khách hàng</th>
              <th>Tài khoản</th>
              <th>Tên quán ăn</th>
              <th>Giảm Giá</th>
              <th>Tiền Shipping</th>
              <th>Tổng tiền</th>
              <th>Tạo lúc</th>
              <th>Thay đổi lúc</th>
            </tr>
          </thead>
          {displayOrders()}
        </table>
      </div>
      <div className="row">
        {getAllRevenue()}
      </div>
      <div className="row mt-3">
      <table className="table table-bordered border-success table-striped table-hover">
          <thead className="bg-success text-white">
            <tr>
              <th>Tên quán ăn</th>
              <th>Địa chỉ</th>
              <th>Quận</th>
              <th>Tỉnh</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          {displayRevenues()}
        </table>
      </div>
    </div>
  );
};

export default AdminStatistics;
