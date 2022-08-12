import client from '.';

const getCategories = async () => {
    const response = await client.get('category?page=0&page_size=12');
    return response.data;
}

const getVendors = async () => {
    const response = await client.get('vendor?page=0&page_size=12');
    return response.data;
}

const obj = {getCategories, getVendors};
export default obj;