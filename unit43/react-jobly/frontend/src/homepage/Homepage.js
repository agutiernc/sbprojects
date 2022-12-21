import React, { useContext } from 'react'
import UserContext from '../users/UserContext'
import './Homepage.css'

const Homepage = () => {
  const { currentUser } = useContext(UserContext)
  
  // shows message when user logs in
  const showMsg = () => (
    <div className='msg'>
      <p>Welcome back, {currentUser.firstName}</p>
    </div>
  )

  return (
    <div className='Homepage text-center'>
      <h1 className='mt-5'>Jobly</h1>
      <h3 className='mt-4'>For your Job search needs</h3>

      {currentUser ? showMsg() : ''}
    </div>
  )
}

export default Homepage;