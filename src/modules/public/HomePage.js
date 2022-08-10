import React, { useState, useEffect } from 'react';
import homePageService from '../../shared/services/api/homePageApi';

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
      <div>
        <div>{index+1}</div>
        <div>{category.title}</div>
        <div>{category.content}</div>
        <img src={category.image_url} alt="Category" width="200px"/>
      </div>
    ))
    return listCategories;
  }

  const displayVendors = (vendors) => {
    const listVendors = vendors.map((vendor, index) => (
      <div>
        <div>{vendor.intro}</div>
        <div>{vendor.profile}</div>
        <div>
          {vendor.address + ' ' + vendor.district + ' ' + vendor.province}
        </div>
        <div>{vendor.phone}</div>
        <img src={vendor.logo} alt="Logo" width="200px"/>
        <div>{vendor.opening_time}</div>
        <div>{vendor.closing_time}</div>
      </div>
    ))
    return listVendors;
  }

  return (
    <div>
      <p>Category</p>
      {displayCategories(categories)}'
      <hr/>
      <p>Vendor</p>
      {displayVendors(vendors)}
    </div>
  )
}

export default HomePage