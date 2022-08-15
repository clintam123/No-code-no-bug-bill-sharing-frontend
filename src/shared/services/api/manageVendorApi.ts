import client from '.';

export const getListVendorApi = async () => {
  try {
    const res = await client.get('vendor/?page=0&page_size=50');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateVendorImage = async (id: any, file: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await client.post('vendor/update-image/' + id, file, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
