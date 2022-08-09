import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ICategory } from "../../../../setup/redux/State";
import { actionUpdateCategory } from "../../redux/adminAction";

const UpdateCategory = ({ user_id, category }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const showModal = () => {
    setVisible(true);
  };
  const [cate, setCate] = useState<ICategory>({
    id: category.id,
    title: category.title,
    content: category.content,
    code: category.code,
    image_url: "",
    user_id: user_id,
  });

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const changeTitle = (e: any) => {
    setCate({ ...cate, title: e.target.value });
  };
  const changeContent = (e: any) => {
    setCate({ ...cate, content: e.target.value });
  };
  const changeCode = (e: any) => {
    setCate({ ...cate, code: e.target.value });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionUpdateCategory(cate))
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
      <button onClick={showModal}>
        <i className="fa-solid fa-pen text-yellow-400"></i>
      </button>
      <Modal
        title="Create Category"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="control-hooks" initialValues={category}>
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
            <input onChange={changeTitle} value={category.title}/>
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
            <input onChange={changeContent} value={category.content}/>
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
            <input onChange={changeCode} value={category.code}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateCategory;
