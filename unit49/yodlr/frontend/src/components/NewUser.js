import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const NewUser = () => {
  const navigate = useNavigate();
  const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    state: ''
  }

  const [formData, setFormData] = useState(initialState)

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
      const res = await YoplyApi.signup(formData);
     
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

  return (
    <div>
      <Heading as='h2' textAlign='center' my='10' color='#048FC7'>
        Add New User
      </Heading>

      <Box maxWidth="100%" ml="60">
        <Link to="/admin">
          <ArrowBackIcon boxSize={8} color='#048FC7'></ArrowBackIcon>
        </Link>
      </Box>

      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box my={4}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl isRequired>
                <FormLabel fontSize="sm">Email:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  mb="4"
                />

                <FormLabel fontSize="sm">First Name:</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  mb="4"
                />

                <FormLabel fontSize="sm">Last Name:</FormLabel>
                <Input
                  type="text"
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
                  Add User
                </Button>
                
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
      
    </div>
  )
}

export default NewUser;