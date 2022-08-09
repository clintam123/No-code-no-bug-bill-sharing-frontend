import { IUser } from './../../../setup/redux/State';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { EAuthType } from './AuthActions';

interface IAuthState {
    user?: IUser,
    accessToken?: string
}

export const initialAuthState: IAuthState = {
    user: undefined,
    accessToken: undefined,
  }

const AuthReducer = persistReducer(
    {storage, key: 'auth', whitelist: ['user']},
    (state: IAuthState = initialAuthState, action: any) => {
        switch (action.type) {
            case EAuthType.LOIGN_SUCCESS: {
              const user = action.payload
              console.log(user);
              
              return { ...state, user }
            }
            default:
              return state
          }
    }
)

export default AuthReducer;