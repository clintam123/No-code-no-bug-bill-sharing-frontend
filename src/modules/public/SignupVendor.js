import React from 'react';
import { useParams } from 'react-router-dom';
import { postVendorApi } from '../../shared/services/api/manageVendorApi';

const SignupVendor = () => {
  const userId = useParams().id;

  const addVendorInfoForm = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await postVendorApi({
              intro: e.target.intro.value,
              profile: e.target.profile.value,
              address: e.target.address.value,
              district: e.target.district.value,
              province: e.target.province.value,
              opening_time: e.target.opening_time.value,
              closing_time: e.target.closing_time.value,
              phone: e.target.phone.value,
              user_id: userId,
            });
            window.location.href = 'http://localhost:3000';
          }}
        >
          Tên: <input type="text" name="intro" /> <br />
          Mô tả chi tiêt: <input type="text" name="profile" />
          <br />
          Địa chỉ:
          <input type="text" name="address" />
          <br />
          Quận: <input type="text" name="district" />
          <br />
          Tỉnh: <input type="text" name="province" />
          <br />
          Giờ mở cửa: <input type="text" name="opening_time" />
          <br />
          Giờ đóng cửa: <input type="text" name="closing_time" />
          <br />
          Số điện thoại: <input type="text" name="phone" />
          <br />
          <button type="submit" className="btn btn-primary">
            Signup Vendor
          </button>
        </form>
      </div>
    );
  };

  return <div>{addVendorInfoForm()}</div>;
};

export default SignupVendor;
