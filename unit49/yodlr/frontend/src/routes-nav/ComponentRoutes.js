import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Admin from '../components/Admin';
import Main from '../components/Main';
import SignupForm from '../components/SignupForm';
import UserEdit from '../components/UserEdit';
import NewUser from '../components/NewUser';

const ComponentRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/users/:id' element={<UserEdit />} />
        <Route path='/admin/newuser' element={<NewUser />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;