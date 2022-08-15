import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionGetListVendor } from '../../redux/adminAction';

const ManageVendor = () => {
  const listVendors = useSelector((state: any) => state.admin.vendors);
  console.log(listVendors);
  const user_id = useSelector((state: any) => state.auth.user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetListVendor());
  }, [dispatch]);

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: 'Intro',
      dataIndex: 'intro',
      key: 'intro',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Opening Time',
      dataIndex: 'opening_time',
      key: 'opening_time',
    },
    {
      title: 'Closing Time',
      dataIndex: 'closing_time',
      key: 'closing_time',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text: any, record: any, index: any) => (
        <div>
          <img src={record.logo} alt="Avatar" className="w-[100px] h-[100px]" />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (text: any, record: any, index: any) => (
        <div className="flex justify-around">
          <span className="mt-1">
            <Link to={`/manage-user/${record.user_id}`} style={styleLink}>
              <i className="fa-solid fa-circle-info"></i>
            </Link>
          </span>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} rowKey={'id'} dataSource={listVendors} />
    </div>
  );
};

export default ManageVendor;

const styleLink = {
  textDecoration: 'none',
};
