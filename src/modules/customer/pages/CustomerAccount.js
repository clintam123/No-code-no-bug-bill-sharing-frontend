import React from 'react';
import { useSelector } from 'react-redux';

const CustomerAccount = () => {
  const user = useSelector((state) => state.auth.user);

  const displayUser = () => {
    return (
      <div>
        <div>{user.username}</div>
        <div>{user.fullName}</div>
        <div>{user.phone}</div>
        <div>{user.email}</div>
        <img src={user.imageUrl} alt="Product" width="200px" />
      </div>
    )
  }

  return (
    <div>
      {displayUser()}
    </div>
  )
}

export default CustomerAccount;