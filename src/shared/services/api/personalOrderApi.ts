import client from ".";

export const postOrder = async (order: any) => {
  const res = await client.post("order", order);
  return res.data;
}

export const getDistance = async (origin: string, vendorId: number) => {
  const res = await client.get(`get-distance-length?origin=${origin}&vendorId=${vendorId}`)
  return res.data.data;
}