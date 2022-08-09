import { Form, Input, Modal } from "antd";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { actionUploadImageCategory } from "../../redux/adminAction";
import "antd/dist/antd.css";

// const getBase64 = (file: any) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

const UploadImage = ({ id }: any) => {
  const [state, setState] = useState<Object>();
  const [image, setImage] = useState<any>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };
  const changeImage = (e: any) => {
    setImage(e.target.files[0]);
    setState(e.target.files[0])
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(actionUploadImageCategory({ id: id, file: {file: state} }));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    setImage(null);
    setState({});
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setImage(null);
    setState({});
    
  };

  return (
    <div>
      <button className="text-green-700" onClick={showModal}>
        <i className="fa-solid fa-upload"></i>
      </button>
      <Modal
        title="Upload Image"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: buttonDisabled }}
      >
        <Form
          onFieldsChange={() =>
            setButtonDisabled(
              form.getFieldsError().some((field) => field.errors.length > 0)
            )
          }
        >
          <div>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-[200px] h-[200px]"
              />
            )}
          </div>
          <Form.Item
            name="file"
            rules={[{ required: true, message: "Please enter image" }]}
          >
            <Input type="file" onChange={changeImage} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadImage;
