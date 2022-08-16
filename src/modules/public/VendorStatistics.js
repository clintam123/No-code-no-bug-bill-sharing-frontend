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
      <div className="col-12">
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
                Xem tất cả order
              </button>
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
                Xem doanh thu
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row  mt-5">
        {getRevenue()}
      </div>

      <div>Doanh thu: {revenues}</div>
      <hr/>
      <div className="row">
        {getAllOrders()}
      </div>
      <div className="row">
        <table className="table table-bordered border-success table-striped table-hover">
          <thead className="bg-success text-white">
            <tr>
              <th>Khách hàng</th>
              <th>Tài khoản</th>
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

    </div>
  );
};

export default VendorStatistics;
