import React, { useState, useEffect } from 'react';
import homePageService from '../../shared/services/api/homePageApi';
import 'bootstrap/dist/css/bootstrap.min.css';
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getCategories();
    getVendors();
  }, [])

  const getCategories = async () => {
    try {
      const data = await homePageService.getCategories();
      setCategories([...data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getVendors = async () => {
    try {
      const data = await homePageService.getVendors();
      setVendors([...data.data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const displayCategories = (categories) => {

    const listCategories = categories.map((category, index) => (
      <div className="px-3 col-2">
        <div className=" " >
          <img src={category.image_url} alt="Category" className="" width="70%" />
          <div className="card-body">
            <h5 className="card-title">{category.title}</h5>
            <p className="card-text">{category.content}</p>
          </div>
        </div>
      </div>
    ))
    return listCategories;
  }

  const displayVendors = (vendors) => {
    const listVendors = vendors.map((vendor, index) => (
      <div className="px-3 col-3">
        <div className=" " >
        <div className="px-3"><div>🏬<span className="fw-bold">Tên:  </span> {vendor.intro}</div>
          <div className="fw-bold"> 🧟‍♀️{vendor.profile}</div>


          <div>🗺️<span className="fw-bold">Địa chỉ:  </span>
            {vendor.address + ' ' + vendor.district + ' ' + vendor.province}
          </div>
          <div>📞 <span className="fw-bold">SĐT: </span> {vendor.phone}</div>
          <img src={vendor.logo} alt="Logo" className="" width="70%" />
          <div className="card-body">
            <div> 🔓<span className="fw-bold">Mở cửa:  </span>{vendor.opening_time}</div>
            <div>🔒<span className="fw-bold">Đóng cửa: </span>{vendor.closing_time}</div>
            
          </div>
        </div>
      </div>
      </div>
    ))
    return listVendors;
  }

  return (
    <div>
      <div class=" ">
        <img className="card-img" src="https://loship.vn/dist/images/home-banner-18062021.jpg"></img>
        <div class="row">
             <div className="col-3"></div>
                <center className="col-6">
                <div class="input-group">     
                    <input type="text" class="form-control rounded-pill" placeholder="Tìm quán ăn, trà sữa yêu thích " aria-label="search" aria-describedby="basic-addon1" />
                    </div>
                    </center>
          <div className="col-3"></div>

        </div>
      </div>

      <div className="container mt-4">
        <p className="fs-5 fw-bold" >CHỌN THEO THỂ LOẠI</p>
        <div className="row">
          {displayCategories(categories)}'
        </div>
      </div>
      <div className="px-3  container"><hr className="text-danger" /></div>
      <div className="container">
        <p className="fs-5 fw-bold" >QUÁN ĂN</p>
        <div className="row">
          {displayVendors(vendors)}
        </div>
      </div>
    </div>
  )
}

export default HomePage