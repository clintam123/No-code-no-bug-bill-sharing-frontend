import client from '.';

const getProductGroup = async (vendor_id: any) => {
  const response = await client.get(
    'product-group/vendor/' + vendor_id + '?page=0&page_size=3'
  );
  return response;
};

const getVendor = async (vendor_id: any) => {
  const response = await client.get('vendor/' + vendor_id);
  return response;
};

const getLink = async (userId: number, vendorId: number) => {
  const response = await client.post('group-order/get-group-link', {
    userId,
    vendorId,
  });
  console.log(response);
  return response.data.data;
};

const sendOrder = async (link: any) => {
  const response = await client.post('group-order/order/' + link);
  return response.data;
};

const checkLinkExist = async (link: any) => {
  const response = await client.post('group-order/check-link', { link });
  // console.log(response.status);
  console.log(response);
  return response.data.status;
};

const obj = { getLink, sendOrder, checkLinkExist, getProductGroup, getVendor };
export default obj;
