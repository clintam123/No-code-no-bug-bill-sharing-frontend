import { Form, Input, Modal } from "antd";
import { RcFile } from "antd/lib/upload";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  } from "../../admin/redux/adminAction";
import { actionChangeAvatar } from "../redux/AuthActions";


const ChangeAvatar = () => {
  const [file, setFile] = useState<Object>();
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const showModal = () => {
    setVisible(true);
  };
  const [image, setImage] = useState<any>("");
  let id = user.id;
  const changeImage = (e: any) => {
    setImage(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionChangeAvatar({id, file}));
    setImage('')
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
    setImage('')
  };
  return (
    <div>
      <button onClick={showModal}>Change Avatar</button>
      <Modal
        title="Change Avatar"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFieldsChange={() =>
            setButtonDisabled(
              form.getFieldsError().some((field) => field.errors.length > 0)
            )
          }
        >
          <div>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-[200px] h-[200px]"
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={user.imageUrl} className="w-[200px] h-[200px]" />
            )}
          </div>
          <Form.Item
            name="file"
            rules={[{ required: true, message: "Please enter iamge" }]}
          >
            <Input type="file" onChange={changeImage} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangeAvatar;
