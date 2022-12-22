import React, { useState, useContext } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import UserContext from './UserContext'
import { Form, Button } from 'react-bootstrap'

import Notify from '../common/Notify'

const LoginForm = ({ login }) => {
  const navigate = useNavigate()
  const { currentUser, message, setMessage } = useContext(UserContext)
  const initialValue = {
    username: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialValue)

  if (currentUser) {
    return <Navigate to='/' />
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

    const res = await login(formData)
    
    if (res.success) {
      navigate('/')
    } else {
      setMessage({ msg: 'Incorrect Username or Password', type: 'error' })
        
      return;
    }
  }

  return (
    <div className="d-flex mt-5 flex-column align-items-center col-3 mx-auto justify-content-center w-50">
      <Notify message={message} />

      <div className="my-5">
        <h1>Login</h1>
      </div>

      <Form onSubmit={handleSubmit} className="border border-3 p-4 rounded-2">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
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
        </Form.Group>

        <Button variant="outline-secondary" type="submit" size="lg">
          Submit
        </Button>
      </Form>

      <div className='mt-3 text-muted text-center'>
        Don't have an account?
        
        <div>
          <NavLink to="/signup" className="text-decoration-none text-info">
            Signup Here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;