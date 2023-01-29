import React, { useState, useEffect } from "react";
// import { getUsers } from "../api/api";
import YoplyApi from '../api/api'

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersList = async (name) => {
      // let users = await getUsers(name);
      let users = await YoplyApi.getUsers(name)

      setUsers(users);
    }

    usersList()
  }, []);

  console.log('users: ', users)

  if (!users) return null;

  // add a table for each field and a button to handle pending/active user
  // admin also needs a form to add users

  return (
    <div>
      <h1>Admin Page</h1>

      <div>
        <ul>
          {
            users.map(u =>
              <li key={u.id}>
                {u.firstName}
              </li>  
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Admin;