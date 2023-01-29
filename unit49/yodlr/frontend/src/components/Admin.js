import React, { useState, useEffect } from "react";
import YoplyApi from "../api/api";
import { Heading } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./DataTable";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersList = async (name) => {
      let users = await YoplyApi.getUsers(name)

      setUsers(users);
    }

    usersList()
  }, []);

  // console.log('users: ', users)

  if (!users) return null;

  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID"
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email"
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: "First Name"
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: "Last Name"
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.getValue(),
      header: "State"
    })
  ];

  return (
    <div>
      <Heading as='h2'>Admin Page</Heading>

      <DataTable columns={columns} data={users} />
    </div>
  )
}

// const Admin = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const usersList = async (name) => {
//       // let users = await getUsers(name);
//       let users = await YoplyApi.getUsers(name)

//       setUsers(users);
//     }

//     usersList()
//   }, []);

//   console.log('users: ', users)

//   if (!users) return null;

//   // add a table for each field and a button to handle pending/active user
//   // admin also needs a form to add users

//   return (
//     <div>
//       <h1>Admin Page</h1>

//       <div>
//         <ul>
//           {
//             users.map(u =>
//               <li key={u.id}>
//                 {u.firstName}
//               </li>  
//             )
//           }
//         </ul>
//       </div>
//     </div>
//   )
// }

export default Admin;