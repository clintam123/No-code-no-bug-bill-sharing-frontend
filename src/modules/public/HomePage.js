import React, { useState, useEffect } from 'react';
import homePageService from '../../shared/services/api/homePageApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getCategories();
    getVendors();
    getLocation();
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    function showPosition(position) {
      localStorage.setItem('latitude', position.coords.latitude);
      localStorage.setItem('longitude', position.coords.longitude);
    }
  };

  const getCategories = async () => {
    try {
      const data = await homePageService.getCategories();
      setCategories([...data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVendors = async () => {
    try {
      const data = await homePageService.getVendors();
      setVendors([...data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const displayCategories = (categories) => {
    const listCategories = categories.map((category, index) => (
      <div key={index} className="px-3 col-2">
        <a
          className="text-decoration-none text-black"
          href={`/product/category/${category.title}`}
        >
          <div className=" ">
            <img
              src={category.image_url}
              alt="Category"
              className=""
              width="70%"
            />
            <div className="card-body">
              <h5 className="card-title">{category.title}</h5>
              <p className="card-text">{category.content}</p>
            </div>
          </div>
        </a>
      </div>
    ));
    return listCategories;
  };

  const displayVendors = (vendors) => {
    const listVendors = vendors.map((vendor, index) => (
      <div key={index} className="px-3 col-3">
        <div className=" ">
          <div className="px-3">
            <div>
              ????<span className="fw-bold">T??n: </span> {vendor.intro}
            </div>
            <div className="fw-bold"> ?????????????{vendor.profile}</div>

            <div>
              ???????<span className="fw-bold">?????a ch???: </span>
              {vendor.address + ' ' + vendor.district + ' ' + vendor.province}
            </div>
            <div>
              ???? <span className="fw-bold">S??T: </span> {vendor.phone}
            </div>
            <img src={vendor.logo} alt="Logo" className="" width="70%" />
            <div className="card-body">
              <div>
                {' '}
                ????<span className="fw-bold">M??? c???a: </span>
                {vendor.opening_time}
              </div>
              <div>
                ????<span className="fw-bold">????ng c???a: </span>
                {vendor.closing_time}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return listVendors;
  };

  return (
    <div>
      <Navbar />
      <div class=" ">
        <img
          className="card-img"
          src="https://loship.vn/dist/images/home-banner-18062021.jpg"
          alt="banner"
        ></img>
        <div className="row">
          <div className="col-3"></div>
          <center className="col-6">
            <div class="input-group">
              <a href="/product/search">
                <button className="btn btn-primary">T??m m??n ??n</button>
              </a>
            </div>
          </center>
          <div className="col-3"></div>
        </div>
      </div>

      <div className="container mt-4">
        <p className="fs-5 fw-bold">CH???N THEO TH??? LO???I</p>
        <div className="row">{displayCategories(categories)}'</div>
        <a href="/category">
          <button className="btn btn-primary">Xem t???t c??? th??? lo???i</button>
        </a>
      </div>
      <div className="px-3  container">
        <hr className="text-danger" />
      </div>
      <div className="container">
        <p className="fs-5 fw-bold">QU??N ??N</p>
        <div className="row">{displayVendors(vendors)}</div>
      </div>
    </div>
  );
};

export default HomePage;
