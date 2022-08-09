import { IUser } from './../../../setup/redux/State';
import client from '.'
import { notify } from '../../config/notify';

export const login = async (username: string, password: string) => {
    try {
        const res = await client.post('auth/login', {username, password});
        localStorage.setItem('accessToken', res.data.accessToken)
        notify('success', 'Login', 'Login successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Login', 'Login failed!')
    }
}

export const signup = async (param: IUser) => {
    
    try {
        const res = await client.post('auth/login', param);
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

export const logoutApi = async () => {
    try {
        const res = await client.post('auth/logout');
        notify('success', 'Login', 'Logout successfully!')
        localStorage.clear()
        return res.data
    } catch (error) {
        notify('error', 'Login', 'Logout failed!')
    }
}

export const changeAvatarApi = async(param: any) => {
    
    
    try {
        const res = await client.post(`user/change-avatar/${param.id}`, param.state)
        console.log(res.data);
        
        notify('success', 'User', 'Upload Image successfully!')
        return res.data
    } catch (error) {
        console.log(error);
        notify('error', 'User', 'Upload Image failed!')
    }
}