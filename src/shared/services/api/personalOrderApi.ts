import client from ".";

export const postOrder = async (order: any) => {
  const res = await client.post("order", order);
  return res.data;
}