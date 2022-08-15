import client from ".";

export const adminGetOrdersByDate = async (startDate, endDate) => {
  try {
    const res = await client.get(`statistics/order-vendors?start_date=${startDate}&end_date=${endDate}`)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const adminGetRevenuesByDate = async (startDate, endDate) => {
  try {
    const res = await client.get(`statistics/revenue-vendors?start_date=${startDate}&end_date=${endDate}`)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const vendorGetOrdersByDate = async (vendorId, startDate, endDate) => {
  try {
    const res = await client.get(`statistics/order-vendor/${vendorId}?start_date=${startDate}&end_date=${endDate}`)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const vendorGetRevenueByDate = async (vendorId, startDate, endDate) => {
  try {
    const res = await client.get(`statistics/revenue-vendor/${vendorId}?start_date=${startDate}&end_date=${endDate}`)
    return res.data;
  } catch (e) {
    console.error(e);
  }
}