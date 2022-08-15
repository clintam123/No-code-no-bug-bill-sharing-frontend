import React from 'react';
import { signup } from '../../shared/services/api/authApi';

const SignupUser = () => {
  return (
    <div>
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
          if (e.target.role.value == 'ROLE_CUSTOMER') {
            window.location.href = 'http://localhost:3000';
          } else if (e.target.role.value == 'ROLE_VENDOR') {
            window.location.href = `http://localhost:3000/signup/vendor/${data.data.id}`;
          }
        }}
      >
        Username: <input type="text" name="username" />
        <br />
        Password: <input type="text" name="password" />
        <br />
        First name:
        <input type="text" name="first_name" />
        <br />
        Last name: <input type="text" name="last_name" />
        <br />
        Phone: <input type="text" name="phone" />
        <br />
        Email: <input type="text" name="email" />
        <br />
        Role:{' '}
        <select name="role">
          <option value="ROLE_CUSTOMER">CUSTOMER</option>
          <option value="ROLE_VENDOR">VENDOR</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupUser;
