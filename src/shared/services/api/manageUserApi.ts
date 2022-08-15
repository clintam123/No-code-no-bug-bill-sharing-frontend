import { IUser } from '../../../setup/redux/State';
import { notify } from '../../config/notify';
import client from '.';

export const getListUserApi = async () => {
  try {
    const res = await client.get('user/?page=0&page_size=50');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByIdApi = async (id: any) => {
  try {
    const res = await client.get(`user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    const res = await client.delete(`user/${id}`);
    return res.data;
  } catch (error) {
  }
};

export const updateUserApi = async (id: number, param: any) => {
  try {
    const res = await client.put(`user/${id}`, param);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserImage = async (id: number, file: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await client.post('user/change-avatar/' + id, file, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = async (param: string) => {
  try {
    const res = await client.post(`auth/change-password`, param);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
