import { combineReducers } from "@reduxjs/toolkit";
import { all, fork } from 'redux-saga/effects'
import ManageAdminReducer from "../../modules/admin/redux/adminReducer";
import AdminSaga from "../../modules/admin/redux/adminSaga";
import AuthReducer from "../../modules/auth/redux/AuthReducer";
import authSaga from "../../modules/auth/redux/AuthSaga";
export const rootReducer = combineReducers({
  auth: AuthReducer,
  admin: ManageAdminReducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
    yield all([
      fork(authSaga),
      fork(AdminSaga)
    ]
    )
  }







