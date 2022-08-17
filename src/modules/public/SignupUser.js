import React from 'react';
import { signup } from '../../shared/services/api/authApi';

const SignupUser = () => {
  return (
    <div className="container mt-3">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await signup({
            username: e.target.username.value,
            password: e.target.password.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            role: e.target.role.value,
          });
          console.log(data);
          if (e.target.role.value == 'ROLE_CUSTOMER') {
            window.location.href = 'http://localhost:3000';
          } else if (e.target.role.value == 'ROLE_VENDOR') {
            window.location.href = `http://localhost:3000/signup/vendor/${data.data.id}`;
          }
        }}
      >
        <div class="mb-2 col-5">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" name="username" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">Password</label>
          <input type="text" class="form-control" name="password" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">Password</label>
          <input type="text" class="form-control" name="password" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">First name</label>
          <input type="text" class="form-control" name="first_name" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">Last name</label>
          <input type="text" class="form-control" name="last_name" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">Phone</label>
          <input type="text" class="form-control" name="phone" />
        </div>
        <div class="mb-2 col-5">
          <label class="form-label">Email</label>
          <input type="text" class="form-control" name="email" />
        </div>
        Role:{' '}
        <select name="role">
          <option value="ROLE_CUSTOMER">CUSTOMER</option>
          <option value="ROLE_VENDOR">VENDOR</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>
        <br />
        <button type="submit" className="btn btn-success mt-3">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupUser;
