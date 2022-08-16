import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  changePassword,
  getUserByIdApi,
  updateUserApi,
  updateUserImage,
} from '../../../shared/services/api/manageUserApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../public/Navbar';

const CustomerAccount = () => {
  const userRedux = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await getUserByIdApi(userRedux.id);
    console.log(data);
    setUser(data.data);
  };

  const updateUserImageForm = () => {
    return (
      <div className="col-5 mt-5">
        <img src={user.image_url} alt="User" width="200px" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateUserImage(user.id, {
              file: e.target.userImage.files[0],
            });
            window.location.reload();
          }}
        >
          <div className="mb-3 mt-4">
            <label for="formFile" className="form-label">
              Select User Image:
            </label>
            <input
              type="file"
              className="form-control text-success"
              id="userImage"
              name="userImage"
            />
          </div>
          <br />
          <input type="submit" className="btn btn-success" />{' '}
        </form>
      </div>
    );
  };

  const displayUser = () => {
    return (
      <div className="col-5 mt-4">
        <img src={user.image_url} alt="User" width="200px" />
        <div className="form-group mb-3">
          <label>Username</label>
          <div className="form-control mt-2">{user.username} </div>
        </div>

        <div className="form-group mb-3">
          <label>Username</label>
          <div className="form-control mt-2">{user.username} </div>
        </div>

        <div className="form-group mb-3">
          <label>Firstname</label>
          <div className="form-control mt-2">{user.first_name} </div>
        </div>
        <div className="form-group mb-3">
          <label>Lastname</label>
          <div className="form-control mt-2">{user.last_name} </div>
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <div className="form-control mt-2">{user.phone} </div>
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <div className="form-control mt-2">{user.email} </div>
        </div>
      </div>
    );
  };

  const updateInfo = () => {
    return (
      <div className="col-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUserApi(user.id, {
              first_name: e.target.first_name.value,
              last_name: e.target.last_name.value,
              phone: e.target.phone.value,
              email: e.target.email.value,
            });
            window.location.reload();
          }}
        >
          <div className="form-group mb-3 mt-3">
            <label>Username: </label>
            <input
              type="text"
              className="form-control mt-2"
              name="username"
              defaultValue={user.username}
              disabled
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>Firstname: </label>
            <input
              type="text"
              className="form-control mt-2"
              name="first_name"
              defaultValue={user.first_name}
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>Lastname: </label>
            <input
              type="text"
              className="form-control mt-2"
              name="last_name"
              defaultValue={user.last_name}
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control mt-2"
              name="phone"
              defaultValue={user.phone}
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>Email: </label>
            <input
              type="text"
              className="form-control mt-2"
              name="email"
              defaultValue={user.email}
            />
          </div>

          <input type="submit" className="btn btn-success mb-5" />
          <br />
        </form>
      </div>
    );
  };

  const changePasswordForm = () => {
    return (
      <div className="mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({
              currentPassword: e.target.currentPassword.value,
              newPassword: e.target.newPassword.value,
              newPasswordConfirm: e.target.newPasswordConfirm.value,
            });
            alert('Đổi mật khẩu thành công');
          }}
        >
          <div className="form-group mb-3 mt-3">
            <label>Current Password: </label>
            <input
              type="password"
              className="form-control mt-2"
              name="currentPassword"
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>New Password: </label>
            <input
              type="password"
              className="form-control mt-2"
              name="newPassword"
            />
          </div>

          <div className="form-group mb-3 mt-3">
            <label>New Password Confirm: : </label>
            <input
              type="password"
              className="form-control mt-2"
              name="newPasswordConfirm"
            />
          </div>
          <input type="submit" className="btn btn-success" />
          <br />
        </form>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="card mt-3">
            <div className="row">
              <h5 className="card-header text-center bg-success text-white">
                Cập Nhật thông tin tài khoản
              </h5>
              <div className="col-1"></div>
              {user != null && updateInfo()}
              {user != null && updateUserImageForm()}
              <div className="col-1"></div>
            </div>
          </div>
        </div>
        <div className="row mb-5 mt-5">
          <div className="card">
            <div className="row">
              <h5 className="card-header bg-success text-white text-center">
                Cập nhật mật khẩu
              </h5>
              {changePasswordForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
