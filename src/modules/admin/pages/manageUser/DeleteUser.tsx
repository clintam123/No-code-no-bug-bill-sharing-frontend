import { Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionDeleteUser } from '../../redux/adminAction';

const DeleteUser = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionDeleteUser(props.id))
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <button className='border-none outline-none'  onClick={showModal}>
        <i className="fa-solid fa-trash text-red-700"></i>
      </button>
      <Modal
          title="Delete"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          Delete {props.name}
        </Modal>
    </div>
  )
}

export default DeleteUser