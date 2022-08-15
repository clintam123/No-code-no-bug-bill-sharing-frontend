import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  changePassword,
  getUserByIdApi,
  updateUserApi,
  updateUserImage,
} from '../../../shared/services/api/manageUserApi';

import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUserImage(user.id, {
              file: e.target.userImage.files[0],
            });
            window.location.reload();
          }}
        >
          <label for="userImage">Select User Image:</label>
          <input type="file" id="userImage" name="userImage" />
          <br />
          <input type="submit" className="btn btn-primary" />{' '}
        </form>
      </div>
    );
  };

  const displayUser = () => {
    return (
      <div>
        <div>Username: {user.username}</div>
        <div>First name: {user.first_name}</div>
        <div>Last name: {user.last_name}</div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
        <img src={user.image_url} alt="User" width="200px" />
      </div>
    );
  };

  const updateInfo = () => {
    return (
      <div>
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
          First name: <input type="text" name="first_name" /> <br />
          Last name: <input type="text" name="last_name" />
          <br />
          Phone: <input type="text" name="phone" />
          <br />
          Email: <input type="text" name="email" />
          <br />
          <input type="submit" className="btn btn-primary" />
          <br />
        </form>
      </div>
    );
  };

  const changePasswordForm = () => {
    return (
      <div>
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
          Current Password: <input type="password" name="currentPassword" />
          <br />
          New Password: <input type="password" name="newPassword" />
          <br />
          New Password Confirm:{' '}
          <input type="password" name="newPasswordConfirm" />
          <br />
          <input type="submit" className="btn btn-primary" />
          <br />
        </form>
      </div>
    );
  };

  return (
    <div>
      {user != null && displayUser()}
      {updateUserImageForm()}
      {updateInfo()}
      {changePasswordForm()}
    </div>
  );
};

export default CustomerAccount;
