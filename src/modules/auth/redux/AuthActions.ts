
export enum EAuthType {
    LOGIN = '[auth] LOGIN',
    LOIGN_SUCCESS = '[auth] LOIGN_SUCCESS',
    LOGOUT = '[auth] LOGOUT',
    CHANGE_AVATAR = "[auth] CHANGE_AVATAR",
    CHANGE_AVATAR_SUCCESS = "[auth] CHANGE_AVATAR_SUCCESS",
    CHANGE_PASSWORD = "[auth] CHANGE_PASSWORD",
    CHANGE_PASSWORD_SUCCESS = "[auth] CHANGE_PASSWORD_SUCCESS",
}

export const actionLogin = (email: string, password: string) => ({
    type: EAuthType.LOGIN,
    payload: {email, password}
})

export const actionLoginSuccess = (data: any) => ({
    type: EAuthType.LOIGN_SUCCESS,
    payload: data
})

export const actionLogout = () => ({
    type: EAuthType.LOGOUT
})

export const actionChangeAvatar = (param: any) => ({
    type: EAuthType.CHANGE_AVATAR,
    payload: param
  })

  export const actionChangeAvatarSuccess = (param: any) => ({
    type: EAuthType.CHANGE_AVATAR_SUCCESS,
    payload: param
  })

  export const actionChangePassword = (param: any) => ({
    type: EAuthType.CHANGE_PASSWORD,
    payload: param
  })

  export const actionChangePasswordSuccess = (param: any) => ({
    type: EAuthType.CHANGE_PASSWORD,
    payload: param
  })
  

