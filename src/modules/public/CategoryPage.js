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
      <div>
        <div>{index + 1}</div>
        <div>{category.title}</div>
        <div>{category.content}</div>
        <img src={category.image_url} alt="Category" width="200px" />
      </div>
    ));
    return listCategories;
  };

  return <div>{displayCategories(categories)}</div>;
};

export default CategoryPage;
