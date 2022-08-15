import client from '.';
import { notify } from '../../config/notify';

export const getListProductGroupApi = async (param: any) => {
  try {
    const res = await client.get(`product-group/${param}`);
    return res.data;
  } catch (error) {
    notify('error', 'Group Product', 'Get List Product-Group Failed!');
  }
};

export const getProductGroupByIdApi = async (param: any) => {
  try {
    const res = await client.get(`product-group/${param}`);
    return res.data;
  } catch (error) {
    notify('error', 'Group Product', 'Get List Product-Group Failed!');
  }
};

export const postProductGroupApi = async (param: any) => {
  try {
    const res = await client.post('product-group', param);
    // notify('success', 'Group Product', 'Create successfully!')
    return res.data;
  } catch (error) {
    console.log(error);
    // notify('error', 'Group Product', 'Create failed!')
  }
};

export const putProductGroupApi = async (param: any) => {
  try {
    const res = await client.put(`product-group/${param.id}`, param.data);
    return res.data;
  } catch (error) {}
};

export const deleteProductGroupApi = async (id: any) => {
  try {
    const res = await client.delete(`product-group/${id}`);
    return res.data;
  } catch (error) {}
};

export const addProductApi = async (param: any) => {
  try {
    const res = await client.post('product', param);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductApi = async (param: any) => {
  try {
    const res = await client.put(`product/${param.id}`, param.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductApi = async (id: any) => {
  try {
    const res = await client.delete(`product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductByCategoryApi = async (title: any) => {
  try {
    const res = await client.get(
      `product/category?category_title=${title}&page=0&page_size=50`
    );
    return res.data;
  } catch (error) {
    notify('error', 'Group Product', 'Get List Product-Group Failed!');
  }
};

export const seachProductApi = async (param: any) => {
  try {
    const res = await client.post(`product/filter?page=0&page_size=50`, param);
    return res.data;
  } catch (error) {
    notify('error', 'Group Product', 'Get List Product-Group Failed!');
  }
};

export const updateProductImage = async (id:any, file: any) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      }
  }
    const res = await client.post('product/update-image/'  + id, file, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getProductReviewApi = async (id: any) => {
  try {
    const res = await client.get(`product-review/product/${id}?page=0&page_size=50`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const postProductReviewApi = async (id: any, param: any) => {
  try {
    const res = await client.post(`product-review/product/${id}`, param);
    return res.data;
  } catch (error) {
    console.error(error);
  } 
}

export const putProductReviewApi = async (id: any, param: any) => {
  try {
    const res = await client.put(`product-review/${id}`, param);
    return res.data;
  } catch (error) {
    console.error(error);
  } 
}

export const deleteProductReviewApi = async (id: any) => {
  try {
    const res = await client.delete(`product-review/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  } 
}
