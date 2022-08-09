import { IUser } from '../../../setup/redux/State';
import { notify } from '../../config/notify';
import client from ".";

export const getListUserApi = async() => {
    
    try {
        const res = await client.get('user/get-all?page=0&page_size=10')
        return res.data
    } catch (error) {
        console.log(error);    
    }
}

export const getUserByIdApi = async(id: any) => {
    try {
        const res = await client.get(`user/get-user/${id}`)
        return res.data
    } catch (error) {
        console.log(error);    
    }
}

export const deleteUserApi = async(id: number) => {
    
    try {
        const res = await client.delete(`user/delete-user/${id}`)
        notify('success', 'User', 'Delete successfully!')
        return res.data
    } catch (error) {
        notify('error', 'User', 'Delete Failed!')
    }
}