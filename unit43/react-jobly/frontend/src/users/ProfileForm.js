import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../users/UserContext'
import JoblyApi from '../api/api'
import { Form, Button } from 'react-bootstrap'

import Notify from '../common/Notify'

const ProfileForm = () => {
  const { currentUser, setCurrentUser, message, setMessage } = useContext(UserContext)
  const initialValue = {
    password: '',
    email: currentUser.email,
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName
  }

  const [formData, setFormData] = useState(initialValue)
  
  // redirect user if not logged in and not current user
  if (!currentUser) {
    return <Navigate to='/login' />
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let profileData = {
      password: formData.password,
      email: formData.email,
    }

    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(currentUser.username, profileData)

      setMessage({ msg: 'User profile updated!', type: 'success' })
    } catch (error) {
      setMessage({ msg: 'Unable to update profile!', type: 'error' })
      
      return
    }

    setFormData(f => ({ ...f, password: '' }))
    setCurrentUser(updatedUser)
  }

  return (
    <div className="d-flex mt-5 flex-column align-items-center col-3 mx-auto justify-content-center w-50">
      <Notify message={message} />

      <div className="my-5">
        <h1>Profile Update</h1>
      </div>

      <Form onSubmit={handleSubmit} className="border border-3 p-4 rounded-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Update Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Label className='mt-3'>
            <small>Confirm Change or Update Password</small>
          </Form.Label>
        </Form.Group>

        <Button variant="outline-secondary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ProfileForm;