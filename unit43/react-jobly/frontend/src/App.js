import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { decodeToken } from 'react-jwt'

import ComponentRoutes from "./routes-nav/ComponentRoutes";
import NavBar from "./routes-nav/NavBar";

import JoblyApi from "./api/api";
import UserContext from './users/UserContext'
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  

  const getCurrentUser = async () => {
    if (token) {
      try {
        let { username } = decodeToken(token)

        JoblyApi.token = token

        let currentUser = await JoblyApi.getCurrentUser(username)

        setCurrentUser(currentUser)
        
      } catch (err) {
        setCurrentUser(null)
      }
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [token])

  const singup = async (data) => {
    try {
      let token = await JoblyApi.signup(data)
  
      setToken(token)

      return { success: true }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  const login = async (data) => {
    try {
      let token = await JoblyApi.login(data)

      setToken(token)

      return { success: true }
    } catch (errors) {
      return { success: false, errors}
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />

        <Container>
          <ComponentRoutes />
        </Container>
      </UserContext.Provider>
    </Router>
  )
}
export default App;
