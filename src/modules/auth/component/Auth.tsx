import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChangeAvatar from "./ChangeAvatar";
import ChangePassword from "./ChangePassword";
import Logout from "./Logout";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "2",
        label: <ChangeAvatar />,
      },
      {
        key: "3",
        label: <ChangePassword />,
      },
      {
        key: "4",
        label: <Logout />,
      },
    ]}
  />
);
const Auth = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button onClick={(e) => e.preventDefault()}>
        <Space>
          <span className="bg-gray-500 rounded-[3px] px-6 py-4 text-white font-bold">
            <span className="text-[18px] mr-2">{user.username}</span>
            <DownOutlined />
          </span>
        </Space>
      </button>
    </Dropdown>
  );
};

export default Auth;
