import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import UserDetail from '../modules/admin/pages/manageUser/UserDetail';
import Login from '../modules/auth/component/Login';
import GroupOrder from '../modules/customer/pages/groupOrder/GroupOrder.js';
import HomePage from '../modules/public/HomePage';
import CategoryPage from '../modules/public/CategoryPage';
import ProductByCategory from '../modules/public/ProductByCategory';
import SearchProduct from '../modules/public/SearchProduct';
import ManageProduct from '../modules/vendor/pages/manageProduct/ManageProduct';
import VendorHomePage from '../modules/vendor/pages/VendorHomePage';
import { USER_ROLE } from '../shared/constant';
import FallbackView from '../_metronic/partials/FallbackView';
import PersonalOrder from '../modules/customer/pages/groupOrder/PersonalOrder';
import CustomerAccount from '../modules/customer/pages/CustomerAccount';

const PrivateRoutes = () => {
  const AdminHomePage = lazy(
    () => import('../modules/admin/pages/AdminHomePage')
  );
  const AdminManageCategory = lazy(
    () => import('../modules/admin/pages/manageCategory/ManageCategory')
  );
  const AdminManageUser = lazy(
    () => import('../modules/admin/pages/manageUser/ManageUser')
  );
  const AdminManageVendor = lazy(
    () => import('../modules/admin/pages/manageVendor/ManageVendor')
  );

  const VendorHomePage = lazy(
    () => import('../modules/vendor/pages/VendorHomePage')
  );
  const ManageProduct = lazy(
    () => import('../modules/vendor/pages/manageProduct/ManageProduct')
  );

  const CustomerHomePage = lazy(
    () => import('../modules/customer/pages/CustomerHomePage')
  );
  const user: any = useSelector((state: any) => state.auth.user) || '';
  const renderByRole = () => {
    const role = user.role || '';
    switch (role) {
      case USER_ROLE.ADMIN:
        return (
          <Routes>
            <Route path="/" element={<AdminHomePage />}>
              <Route path="manage-category" element={<AdminManageCategory />} />
              <Route path="manage-vendor" element={<AdminManageVendor />} />
              <Route path="manage-user" element={<AdminManageUser />} />
              <Route path="manage-user/:id" element={<UserDetail />} />
              {/* <Route path="profile" element={<Profile />} /> */}
            </Route>
          </Routes>
        );
      // eslint-disable-next-line no-duplicate-case
      case USER_ROLE.VENDOR:
        return (
          <Routes>
            <Route path="" element={<VendorHomePage />} />
          </Routes>
        );
      case USER_ROLE.CUSTOMER:
        return (
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/account" element={<CustomerAccount />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product/search" element={<SearchProduct />} />
            <Route
              path="/product/category/:title"
              element={<ProductByCategory />}
            />
            <Route path="/group-order/vendor/:id" element={<GroupOrder />} />
            <Route path="/order/vendor/:id" element={<PersonalOrder />} />
          </Routes>
        );
      // default:
      //   return (
      //     <Routes>
      //       <Route path="/" element={<Login />} />
      //     </Routes>
      //   );
      //   default:
      //     return (
      //       <Routes>
      //         <Route path="/" element={<HomePage />} />
      //       </Routes>
      //     );
    }
  };
  return (
    <div>
      <Suspense fallback={<FallbackView />}>{renderByRole()}</Suspense>
    </div>
  );
};

export default PrivateRoutes;
