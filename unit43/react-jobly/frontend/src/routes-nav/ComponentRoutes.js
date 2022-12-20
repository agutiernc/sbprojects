import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Homepage from '../homepage/Homepage'
import CompanyList from '../companies/CompanyList'
import CompanyDetails from '../companies/CompanyDetails'
import JobList from '../jobs/JobList'
import LoginForm from '../users/LoginForm'
import SignupForm from '../users/SignupForm'
import ProfileForm from '../users/ProfileForm'

const ComponentRoutes = ({ signup, login }) => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/companies' element={<CompanyList />} />
        <Route path='/companies/:handle' element={<CompanyDetails />} />
        <Route path='/jobs' element={<JobList />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='/signup' element={<SignupForm signup={signup} />} />
        <Route path='/profile' element={<ProfileForm />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;