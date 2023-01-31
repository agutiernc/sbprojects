import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import YoplyApi from "../api/api";
import { Heading, Box, Button, Center } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "./DataTable";

const Admin = () => {
  const [users, setUsers] = useState([]);

  // get all users data
  useEffect(() => {
    const usersList = async (name) => {
      let users = await YoplyApi.getUsers(name)

      setUsers(users);
    }

    usersList()
  }, []);

  if (!users) return null;

  let userIDs; // get IDs for URL

  // Gets info for Table Columns
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => {
        userIDs = info.getValue();
        
        return <Link to={`/admin/users/${userIDs}`}>{info.getValue()}</Link>
      },
      header: "ID"
    }),
    columnHelper.accessor("email", {
      cell: (info) => <Link to={`/admin/users/${userIDs}`}>{info.getValue()}</Link>,
      header: "Email"
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => <Link to={`/admin/users/${userIDs}`}>{info.getValue()}</Link>,
      header: "First Name"
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => <Link to={`/admin/users/${userIDs}`}>{info.getValue()}</Link>,
      header: "Last Name"
    }),
    columnHelper.accessor("state", {
      cell: (info) => <Link to={`/admin/users/${userIDs}`}>{info.getValue()}</Link>,
      header: "State"
    })
  ];

  return (
    <Box maxWidth='100%'>
      <Heading as='h2' textAlign='center' mt='8' color='#048FC7'>
        Admin Page
      </Heading>

      <Center>
      <Box  my='8'>
        <Link to="/admin/newuser">
          <Button colorScheme='blue'>Add New User</Button>
        </Link>
      </Box>
      </Center>

      <DataTable columns={columns} data={users} />
    </Box>
  )
}

export default Admin;