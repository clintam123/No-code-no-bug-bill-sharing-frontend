import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light container">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a
                class="nav-link active"
                aria-current="page"
                href="http://localhost:3000/"
              >
                Home
              </a>
              <a class="nav-link" href="/account">
                | Quản lí tài khoản
              </a>
              <div class="float-end">
                <a class="nav-link float-end" href="/login">
                  {' '}
                  | Login
                </a>
                <a class="nav-link float-end" href="/login">
                  | Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
