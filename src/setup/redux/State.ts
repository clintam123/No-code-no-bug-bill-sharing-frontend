export interface IUser {
    id?: number;
    username: string;
    fullName: string;
    role: string;
    accessToken: string
  }
  
  export interface ICategory {
      id?: number;
      title: string;
      content: string;
      code: string;
      user_id: number;
      image_url: string
    }
  
    export interface IVendor {
      id?: number,
      intro: string,
      profile: string,
      address: string,
      district: string,
      province: string,
      phone: string,
      logo: string,
      user_id: number,
      opening_time?: object,
      closing_time?: object
    }
  
  
    
  