import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../../../setup/redux/State";
import { actionGetListCategory } from "../../redux/adminAction";
import 'antd/dist/antd.css';
import DeleteCategory from "./DeleteCategory";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import UploadImage from "./UploadImage";

const ManageCategory = () => {
  const listCategory = useSelector((state: any) => state.admin.categories);
  const user_id = useSelector((state: any) => state.auth.user.id)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetListCategory());
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: 'stt',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (text: any, record: any, index: any) => (
        <div>
          <img src={record.image_url} alt="Image Category" className="w-[100px] h-[100px]"/>
        </div>
      )
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any, index: any) => (
        <div className="flex justify-around">
          <UploadImage id={record.id}/>
          <UpdateCategory user_id={user_id} category={record}/>
          <DeleteCategory id={record.id} />
        </div>
      )
    },
  ];
  return (
    <div>
      <AddCategory user_id={user_id}/>
      <Table columns={columns} rowKey={"id"} dataSource={listCategory} />
    </div>
  );
};

export default ManageCategory;
