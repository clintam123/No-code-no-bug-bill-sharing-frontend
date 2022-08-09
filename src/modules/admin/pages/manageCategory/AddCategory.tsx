import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { actionCreateCategory } from "../../redux/adminAction";
import { ICategory } from "../../../../setup/redux/State";
const AddCategory = ({user_id} :any) => {
  const [cate, setCate] = useState<ICategory>({
    title: '',
    content: '',
    code: '',
    image_url: '',
    user_id: user_id
  })
  
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };
  const changeTitle = (e: any) => {
    setCate({...cate, title: e.target.value})
  }
  const changeContent = (e: any) => {
    setCate({...cate, content: e.target.value})
  }
  const changeCode = (e: any) => {
    setCate({...cate, code: e.target.value})
  }

  
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionCreateCategory(cate))
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    form.resetFields();
    setVisible(false);
  };

  
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Category
      </Button>
      <Modal
        title="Create Category"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="control-hooks">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Trường này không được để trống',
              },
            ]}
          >
            <Input onChange={changeTitle}/>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message: 'Trường này không được để trống',
              },
            ]}
          >
            <Input onChange={changeContent}/>
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[
              {
                required: true,
                message: 'Trường này không được để trống',
              },
            ]}
          >
            <Input onChange={changeCode}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategory;
