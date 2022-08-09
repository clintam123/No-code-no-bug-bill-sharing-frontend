import { ICategory, IVendor } from '../../../setup/redux/State';
import axios from 'axios';

const baseUrl = '/api/v1';

// authentication

const instanceAuth = axios.create({
  baseURL: `${baseUrl}/auth/`,
});

const signup = (param: any) => {
  const url = 'signup';
  return instanceAuth.post(url, param);
};

const login = (param: any) => {
  const url = 'login';
  return instanceAuth.post(url, param, {
    withCredentials: true,
  });
};

const getToken = () => {
  return localStorage.getItem('token');
};

const logout = () => {
  const url = 'logout';
  return instanceAuth.post(url);
};

// category

const instanceCategory = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}/category`,
  headers: {
    Authorization: `${getToken()}`,
  },
});

const getListCate = () => {
  const url = `?page=0&page_size=10`;
  return instanceCategory.get(url);
};

const createCate = (param: any) => {
  const url = ``;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return instanceCategory.post(url, param, config);
};

const updateCate = (id: number, param: ICategory) => {
  const url = `/${id}`;
  return instanceCategory.put(url, param);
};

const deleteCate = (id: Number) => {
  const url = `/${id}`;
  return instanceCategory.delete(url);
};

const uploadImage = (id: number, param: object) => {
  const url = `/update-image/${id}`;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return instanceCategory.post(url, param, config);
};

// manage Vendor

const instanceAdminVendor = axios.create({
  baseURL: `${baseUrl}/vendor/`,
  headers: {
    Authorization: `${getToken()}`,
  },
});

const getListProductOfVendor = () => {
  const url = `vendor-product`;
  return instanceAdminVendor.get(url);
};

const createVendorByAdmin = (param: IVendor) => {
  const url = `add-vendor`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return instanceAdminVendor.post(url, param, config);
};

const updateVendorByAdmin = (id: number, param: IVendor) => {
  const url = `update-vendor/${id}`;
  return instanceAdminVendor.put(url, param);
};

const getVendorById = (id: number) => {
  const url = `get-vendor/${id}`;
  return instanceAdminVendor.post(url);
};

const getAllVendor = () => {
  const url = `get-all?page=0&page_size=10`;
  return instanceAdminVendor.get(url);
};

const uploadLogoOfVendor = (id: number, param: any) => {
  const url = `upload-logo/${id}`;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return instanceAdminVendor.post(url, param, config);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signup,
  login,
  logout,
  getListCate,
  createCate,
  updateCate,
  deleteCate,
  uploadImage,
  getListProductOfVendor,
  createVendorByAdmin,
  updateVendorByAdmin,
  getVendorById,
  getAllVendor,
  uploadLogoOfVendor,
};
