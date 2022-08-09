import React from 'react'
import { useDispatch } from 'react-redux'
import { actionLogout } from '../redux/AuthActions';

const Logout = () => {
  const dispatch = useDispatch();
  const logout = (e: any) => {
    dispatch(actionLogout())
    localStorage.clear();
    document.location.reload()
  }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout