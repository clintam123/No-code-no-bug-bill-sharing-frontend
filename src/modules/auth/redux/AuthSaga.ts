import { EAuthType } from './AuthActions';
import { call, takeLatest } from "redux-saga/effects";
import { logoutApi } from "../../../shared/services/api/authApi";

function* logout({payload}: any): Generator<any, void, string> {
    try {
      yield call(logoutApi);
    } catch (error: any) {
      console.log(error);
      
    }
  }
export default function* authSaga() {
  takeLatest(EAuthType.LOGOUT, logout)
};