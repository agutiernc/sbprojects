import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import YoplyApi from "../api/api";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState()

  useEffect(() => {
    const userInfo = async () => {
      let user = await YoplyApi.getUser(id)
  
      setFormData(user)
    }

    userInfo()
  }, [id])

  if (!formData) return null

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await YoplyApi.updateUser(id, formData);
     
      if (res) {
        // if updated, redirect to admin page
        navigate('/admin');
      } else {
        return;
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault()

    try {
      await YoplyApi.deleteUser(id, formData)

      // if deleted, redirect to admin page
      navigate('/admin');
    } catch (err) {
      console.log('User does not exist')
    }
  }

  return (
    <div>
      <Heading as='h2' textAlign='center' my='10' color='#048FC7'>
        Update User
      </Heading>

      <Box maxWidth="sm" ml="5">
        <Link to="/admin">
          <ArrowBackIcon boxSize={8} color='#048FC7'></ArrowBackIcon>
        </Link>
      </Box>

      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box my={4}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl>
                <FormLabel fontSize="sm">Email:</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  mb="4"
                />

                <FormLabel fontSize="sm">First Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  mb="4"
                />

                <FormLabel fontSize="sm">Last Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  mb="4"
                />

                <FormLabel as='legend' fontSize="sm">State:</FormLabel> 
                <RadioGroup name="state" defaultValue={formData.state}>
                  <Stack spacing={4} direction='row'>
                    <Radio value="active" onChange={handleChange}>active</Radio>
                    <Radio value="pending" onChange={handleChange}>pending</Radio>
                  </Stack>
                </RadioGroup>

                <Button
                  type="submit"
                  mt='4'
                  width='full'
                  colorScheme='blue'
                >
                  Update
                </Button>
                
              </FormControl>
            </form>

            <form onSubmit={handleDeleteUser}>
              <Button
                type="submit"
                mt='4'
                width='full'
                colorScheme='red'
              >
                Delete user?
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
      
    </div>
  )
}

export default UserEdit;