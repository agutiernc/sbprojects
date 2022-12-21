import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute from '../routes-nav/PrivateRoute'

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
        <Route path="/companies" element={
            <PrivateRoute>
              <CompanyList />
            </PrivateRoute>
          }
        />
        
        <Route path='/companies/:handle'element={
            <PrivateRoute>
              <CompanyDetails />
            </PrivateRoute>
          }
        />

        <Route path='/jobs' element={
          <PrivateRoute>
            <JobList />
          </PrivateRoute>
          }
        />

        <Route path='/profile' element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
          }
        />
        
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='/signup' element={<SignupForm signup={signup} />} />
        
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default ComponentRoutes;