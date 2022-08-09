import { notify } from './../../config/notify';
import client from ".";
import { ICategory } from "../../../setup/redux/State";

const getToken = () => {
    return localStorage.getItem("accessToken");
};

export const getListCategoryApi = async() => {
    
    try {
        const res = await client.get('category?page=0&page_size=10')
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

export const postCategoryApi = async(param: ICategory) => {
    try {
        const res = await client.post('category', param)
        notify('success', 'Category', 'Create category successfully!')
        return res.data
    } catch (error) {
        console.log(error);
        notify('error', 'Category', 'Create category failed!')
    }
}

export const deleteCategoryApi = async(id: number) => {
    
    try {
        const res = await client.delete(`category/${id}`)
        notify('success', 'res', 'Delete successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Category', 'Delete Failed!')
    }
}

export const updateCategoryApi = async(param: any) => {
    try {
        const res = await client.put(`category/${param.id}`, param,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        notify('success', 'res', 'Update successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Category', 'Update Failed!')
        
    }
}

export const uploadImageCategoryApi = async(param: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        const res = await client.post(`category/update-image/${param.id}`, param.file, config)
        notify('success', 'Upload Image Category', 'Upload successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Upload Image Category', 'Upload Failed!')
    }
}