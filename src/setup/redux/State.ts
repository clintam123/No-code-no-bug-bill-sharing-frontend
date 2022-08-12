export interface IUser {
  id?: number;
  username: string;
  fullName: string;
  role: string;
  accessToken: string;
  vendor_id: number;
}

export interface ICategory {
  id?: number;
  title: string;
  content: string;
  code: string;
  user_id: number;
  image_url: string;
}

export interface IVendor {
  id?: number;
  intro: string;
  profile: string;
  address: string;
  district: string;
  province: string;
  phone: string;
  logo: string;
  user_id: number;
  opening_time?: object;
  closing_time?: object;
}

export interface IProductGroup {
  id?: number;
  name: string;
  description?: string;
  vendor_id: number;
}

export interface IProduct {
  id?: number;
  title: string;
  description?: string;
  sku: string;
  price: number;
  discount: number;
  quantity: number;
  category_id: number;
  product_group_id: number;
  image_url: string;
}
