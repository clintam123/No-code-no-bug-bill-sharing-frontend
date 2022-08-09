import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionDeleteCategory } from '../../redux/adminAction';
const DeleteCategory = (props: any) => {
  
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionDeleteCategory(props.id))
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  return (
    <div>
        <button className='border-none outline-none'  onClick={showModal}>
          <i className="fa-solid fa-trash text-red-700"></i>
        </button>
        <Modal
          title="Title"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          Xoa
        </Modal>
    </div>
  )
}

export default DeleteCategory