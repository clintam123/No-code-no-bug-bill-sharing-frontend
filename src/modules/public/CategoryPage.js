import React, { useState, useEffect } from "react";
import client from "../../shared/services/api";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

useEffect(() => {
    getCategories();
  }, []);

const getCategories = async () => {

    try {
      const response = await client.get("category?page=0&page_size=100");
      setCategories([...response.data.data]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
    ));
    return listCategories;
  };

return (
    <div>
      <div className="container mt-4">
        <p className="fs-5 fw-bold" >CHỌN THEO THỂ LOẠI</p>
        <div className="row">
          {displayCategories(categories)}
        </div>
      </div>
    </div>
    );
};

export default CategoryPage;

