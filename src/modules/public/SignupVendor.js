import React from 'react';
import { useParams } from 'react-router-dom';
import { postVendorApi } from '../../shared/services/api/manageVendorApi';

const SignupVendor = () => {
  const userId = useParams().id;

  const addVendorInfoForm = () => {
    return (
      <div>
        <form
          className="container mt-3 px-5"
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
          <div class="mb-2 col-5">
            <label class="form-label">Tên</label>
            <input type="text" class="form-control col-3" name="intro" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Mô tả chi tiêt</label>
            <input type="text" class="form-control" name="profile" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" name="address" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Quận</label>
            <input type="text" class="form-control" name="district" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Tỉnh</label>
            <input type="text" class="form-control" name="province" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Giờ mở cửa</label>
            <input type="text" class="form-control" name="opening_time" />
          </div>
          <div class="mb-2 col-5">
            <label class="form-label">Giờ đóng cửa</label>
            <input type="text" class="form-control" name="closing_time" />
          </div>
          <div class="mb-3 col-5">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" name="phone" />
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Signup Vendor
          </button>
        </form>
      </div>
    );
  };

  return <div>{addVendorInfoForm()}</div>;
};

export default SignupVendor;
