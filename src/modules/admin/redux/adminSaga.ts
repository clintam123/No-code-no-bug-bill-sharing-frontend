import {
  actionGetListCategorySuccess,
  AdminType,
  actionGetListUserSuccess,
  actionUserByIdSuccess,
  actionGetListVendorSuccess,
} from './adminAction';
import {
  deleteCategoryApi,
  getListCategoryApi,
  postCategoryApi,
  updateCategoryApi,
  uploadImageCategoryApi,
} from './../../../shared/services/api/manageCategoryApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteUserApi,
  getListUserApi,
  getUserByIdApi,
} from '../../../shared/services/api/manageUserApi';

import { getListVendorApi } from '../../../shared/services/api/manageVendorApi';

// ======================Category===========================
function* getListCategory(): Generator<any, void, string> {
  try {
    const res: any = yield call(getListCategoryApi);
    yield put(actionGetListCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* createCategory({ payload }: any): Generator<any, void, string> {
  try {
    yield call(postCategoryApi, payload);
    payload.onsuccess();
    yield call(getListCategory);
  } catch (error: any) {
    console.log(error);
  }
}

function* deleteCategory({ payload }: any): Generator<any, void, string> {
  try {
    yield call(deleteCategoryApi, payload);
    payload.onsuccess();
    yield call(getListCategory);
  } catch (error: any) {
    console.log(error);
  }
}

function* updateCategory({ payload }: any): Generator<any, void, string> {
  console.log(payload);

  try {
    yield call(updateCategoryApi, payload);
    // payload.onsuccess();
    yield call(getListCategory);
  } catch (error: any) {
    console.log(error);
  }
}

function* uploadImage({ payload }: any): Generator<any, void, string> {
  try {
    yield call(uploadImageCategoryApi, payload);

    yield call(getListCategory);
  } catch (error: any) {
    console.log(error);
  }
}

// ========================User================================

function* getListUser(): Generator<any, void, string> {
  try {
    const res: any = yield call(getListUserApi);
    yield put(actionGetListUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* getUserById({ payload }: any): Generator<any, void, string> {
  try {
    const res: any = yield call(getUserByIdApi, payload);
    yield put(actionUserByIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

// function* changeAvatar({ payload }: any): Generator<any, void, string> {
//   console.log(payload);

//   try {
//     const res: any = yield call(changeAvatarApi, payload);
//     yield put(actionChangeAvatarSuccess(res.data));
//   } catch (error) {
//     console.log(error);

//   }
// }

function* deleteUser({ payload }: any): Generator<any, void, string> {
  try {
    yield call(deleteUserApi, payload);
    payload.onsuccess();
    yield call(getListUser);
  } catch (error: any) {
    console.log(error);
  }
}

// ====================VENDOR================//
function* getListVendor(): Generator<any, void, string> {
  try {
    const res: any = yield call(getListVendorApi);
    yield put(actionGetListVendorSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* AdminSaga() {
  // saga Category
  yield takeLatest(AdminType.GET_LIST_CATEGORY, getListCategory);
  yield takeLatest(AdminType.CREATE_CATEGORY, createCategory);
  yield takeLatest(AdminType.DELETE_CATEGORY, deleteCategory);
  yield takeLatest(AdminType.UPDATE_CATEGORY, updateCategory);
  yield takeLatest(AdminType.UPLOAD_IMAGE_CATEGORY, uploadImage);

  //======================USER========================//
  yield takeLatest(AdminType.GET_LIST_USER, getListUser);
  yield takeLatest(AdminType.GET_USER_BY_ID, getUserById);
  yield takeLatest(AdminType.DELETE_USER, deleteUser);

  //======================VENDOR========================//
  yield takeLatest(AdminType.GET_LIST_VENDOR, getListVendor);
}
