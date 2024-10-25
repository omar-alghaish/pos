import React from 'react';
import { Outlet } from 'react-router-dom';

const MyAccount = () => {
  return (
    <div>
      {/* <h1>My Account</h1> */}
      <Outlet /> {/* Renders the profile or other nested child routes */}
    </div>
  );
};

export default MyAccount;
