import client from '.'
import { notify } from '../../config/notify';

export const getListProductGroupApi = async (param: any) => {
    try {
        const res = await client.get(`product-group/${param}`);
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Get List Product-Group Failed!')
    }
}

export const getProductGroupByIdApi = async (param: any) => {
    try {
        const res = await client.get(`product-group/${param}`);
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Get List Product-Group Failed!')
    }
}

export const getProductGroupByCategoryApi = async (param: any) => {
    try {
        const res = await client.get(`product-group/${param}`);
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Get List Product-Group Failed!')
    }
}

export const postProductGroupApi = async (param: any) => {
    try {
        const res = await client.post('product-group', param);
        notify('success', 'Group Product', 'Create successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Create failed!')
    }
}

export const putProductGroupApi = async (param: any) => {
    try {
        const res = await client.put(`product-group/${param.id}`, param.data);
        notify('success', 'Group Product', 'Update successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Update failed!')
    }
}

export const deleteProductGroupApi = async (param: any) => {
    try {
        const res = await client.put(`product-group/${param.id}`, param.data);
        notify('success', 'Group Product', 'Update successfully!')
        return res.data
    } catch (error) {
        notify('error', 'Group Product', 'Update failed!')
    }
}
