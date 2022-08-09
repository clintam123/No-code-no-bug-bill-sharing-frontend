
import { ICategory, IVendor } from "../../../setup/redux/State"

export enum AdminType {
// ====================CATEGORY TYPES======================= //

  GET_LIST_CATEGORY = "[Admin] GET_LIST_CATEGORY",
  GET_LIST_CATEGORY_SUCCESS = "[Admin] GET_LIST_CATEGORY_SUCCESS",
  CREATE_CATEGORY = "[Admin] CREATE_CATEGORY",
  DELETE_CATEGORY = "[Admin] DELETE_CATEGORY",
  UPDATE_CATEGORY = "[Admin] UPDATE_CATEGORY",
  UPLOAD_IMAGE_CATEGORY = "[Admin] UPLOAD_IMAGE_CATEGORY",
// ====================VENDOR TYPES======================= //

  GET_LIST_VENDOR = "[Admin] GET_LIST_VENDOR",
  GET_LIST_VENDOR_SUCCESS = "[Admin] GET_LIST_VENDOR_SUCCESS",
  CREATE_VENDOR = "[Admin] CREATE_VENDOR",
  DELETE_VENDOR = "[Admin] DELETE_VENDOR",
  UPDATE_VENDOR = "[Admin] UPDATE_VENDOR", 

// ====================USER TYPES======================= //

  GET_LIST_USER = "[Admin] GET_LIST_USER",
  GET_LIST_USER_SUCCESS = "[Admin] GET_LIST_USER_SUCCESS",
  GET_USER_BY_ID = "[Admin] GET_USER_BY_ID",
  GET_USER_BY_ID_SUCCESS = "[Admin] GET_USER_BY_ID_SUCCESS",
  CREATE_USER = "[Admin] CREATE_USER",
  DELETE_USER = "[Admin] DELETE_USER",
  UPDATE_USER = "[Admin] UPDATE_USER",
  SEARCH_USER_BY_PHONE = "[Admin] SEARCH_USER_BY_PHONE",
  SEARCH_USER_BY_PHONE_SUCCESS = "[Admin] SEARCH_USER_BY_PHONE_SUCCESS"
}

//====================CATEGORY==========================//

export const actionGetListCategory = () => ({
  type: AdminType.GET_LIST_CATEGORY
})

export const actionGetListCategorySuccess = (data: any) => ({
  type: AdminType.GET_LIST_CATEGORY_SUCCESS,
  payload: data
})

export const actionCreateCategory = (param: ICategory) => ({
  type: AdminType.CREATE_CATEGORY,
  payload: param
})

export const actionDeleteCategory = (id: number) => ({
  type: AdminType.DELETE_CATEGORY,
  payload: id
})

export const actionUpdateCategory = (param: any) => ({
  type: AdminType.UPDATE_CATEGORY,
  payload: param
})

export const actionUploadImageCategory = (param: object) => ({
  type: AdminType.UPLOAD_IMAGE_CATEGORY,
  payload: param
})

//====================VENDOR===========================//

export const actionGetListVendor = () => ({
  type: AdminType.GET_LIST_VENDOR
})

export const actionGetListVendorSuccess = (data: any) => ({
  type: AdminType.GET_LIST_VENDOR_SUCCESS,
  payload: data
})

export const actionCreateVendor = (param: IVendor) => ({
  type: AdminType.CREATE_VENDOR,
  payload: param
})

export const actionUpdateVendor = (param: any) => ({
  type: AdminType.UPDATE_VENDOR,
  payload: param
})

export const actionDeleteVendor = (id: number) => ({
  type: AdminType.DELETE_VENDOR,
  payload: id
})

// ====================USER========================= //

export const actionGetListUser = () => ({
  type: AdminType.GET_LIST_USER
})

export const actionGetUserById = (id: any) => ({
  type: AdminType.GET_USER_BY_ID,
  payload: id
})

export const actionGetListUserSuccess = (data: any) => ({
  type: AdminType.GET_LIST_USER_SUCCESS,
  payload: data
})

export const actionUserByIdSuccess = (data: any) => ({
  type: AdminType.GET_USER_BY_ID_SUCCESS,
  payload: data
})

export const actionCreateUser = (param: IVendor) => ({
  type: AdminType.CREATE_USER,
  payload: param
})

export const actionUpdateUser = (param: any) => ({
  type: AdminType.UPDATE_USER,
  payload: param
})

export const actionDeleteUser = (id: number) => ({
  type: AdminType.DELETE_USER,
  payload: id
})

export const actionSearchUserByPhone = (param: any) => ({
  type: AdminType.SEARCH_USER_BY_PHONE,
  payload: param
})

export const actionSearchUserByPhoneSuccess = (param:any) => ({
  type: AdminType.SEARCH_USER_BY_PHONE_SUCCESS,
  payload: param
})