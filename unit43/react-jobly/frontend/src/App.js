import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { decodeToken } from 'react-jwt'
import JoblyApi from "./api/api";
import UserContext from './users/UserContext'
import useLocalStorage from "./hooks/useLocalStorage";

import ComponentRoutes from "./routes-nav/ComponentRoutes";
import NavBar from "./routes-nav/NavBar";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  
  // console.log('currUser: ', currentUser)
  // console.log('token: ', token)

  useEffect(() => {
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

    getCurrentUser()
  }, [token])

  const signup = async (data) => {
    try {
      let token = await JoblyApi.signup(data)
  
      setToken(token)

      return { success: true }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  // const login = async (data) => {
  //   try {
  //     let token = await JoblyApi.login(data)

  //     setToken(token)

  //     return { success: true }
  //   } catch (errors) {
  //     return { success: false, errors}
  //   }
  // }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />

        <Container>
          <ComponentRoutes signup={signup} login={login} />
        </Container>
      </UserContext.Provider>
    </Router>
  )
}
export default App;
