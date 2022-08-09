import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { actionGetUserById } from '../../redux/adminAction';

const UserDetail = () => {
    let  userId  = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.admin.user)  
    useEffect(() => {
        dispatch(actionGetUserById(userId.id))
    }, [userId, dispatch])
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Information',
            dataIndex: 'info',
            key: 'info'
        }
    ]

    const data = [
        {
            title: 'Id',
            info: user.id
        },
        {
            title: 'Username',
            info: user.username
        },
        {
            title: 'Firstname',
            info: user.firs_tname
        },
        {
            title: 'Lastname',
            info: user.last_name
        },
        {
            title: 'Email',
            info: user.email
        },
        {
            title: 'Phone',
            info: user.phone
        },
        {
            title: 'Avatar',
            info: <img src={user.image_url} alt="avatar" className='w-[300px] h-[300px]'/>
        },
        {
            title: 'Role',
            info: user.role
        },
        {
            title: 'Provider',
            info: user.provider
        },
        {
            title: 'Status',
            info: user.status
        },
    ]
  return (
    <div>
        <Table columns={columns} dataSource={data} bordered/>
    </div>
  )
}

export default UserDetail