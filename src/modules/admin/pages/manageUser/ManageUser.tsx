import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionGetListUser } from '../../redux/adminAction';
import DeleteUser from './DeleteUser';

const ManageUser = () => {
  const listUsers = useSelector((state: any) => state.admin.users);
  console.log(listUsers);
  const user_id = useSelector((state: any) => state.auth.user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetListUser());
  }, [dispatch]);

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'rmail',
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text: any, record: any, index: any) => (
        <div>
          <img
            src={record.image_url}
            alt="Avatar"
            className="w-[100px] h-[100px]"
          />
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
            <Link to={`/manage-user/${record.id}`} style={styleLink}>
              <i className="fa-solid fa-circle-info"></i>
            </Link>
          </span>
          <DeleteUser id={record.id} name={record.username} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} rowKey={'id'} dataSource={listUsers} />
    </div>
  );
};

export default ManageUser;

const styleLink = {
  textDecoration: 'none',
};
