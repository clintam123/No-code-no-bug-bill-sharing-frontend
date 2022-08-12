import "antd/dist/antd.css";
import "../css/index.css";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import {
  ShopOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Login from "../../auth/component/Login";
import Auth from "../../auth/component/Auth";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  { icon: UserOutlined, route: "/manage-user", name: "Manage User" },
  {
    icon: TeamOutlined,
    route: "/manage-category",
    name: "Manage Category",
  },
  { icon: ShopOutlined, route: "/manage-vendor", name: "Manage Vendor" },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: <Link to={item.route}>{item.name}</Link>,
}));

const AdminHomePage = () => {
  const token = localStorage.getItem('accessToken') || null
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" >
          <Link to="/manage-user">Logo</Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background pb-[40px]"
          style={{
            padding: 0,
          }}
        >
          <div className="flex justify-end mr-[50px] my-2">
            {!token ? <Login />:<Auth />}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminHomePage;
