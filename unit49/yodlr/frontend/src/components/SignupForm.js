import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YoplyApi from "../api/api";
import {
  Heading,
  Flex,
  Box,
  FormControl,
  Input,
  Button
} from "@chakra-ui/react";

const SignupForm = () => {
  const navigate = useNavigate();
  const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    state: 'active'
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await YoplyApi.signup(formData);
     
      if (res) {
        navigate('/'); // redirect to main if success
      } else {
        return;
      }

    } catch (errors) {
      console.log('error: ', errors);
    }
  }

  return (
    <div>
      <Heading as='h2' textAlign='center' my='10' color='#048FC7'>
        Register
      </Heading>

      <Flex maxWidth="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="sm" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box my={4}>
            <form onSubmit={handleSubmit} mx='auto'>
              <FormControl isRequired>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  mb="4"
                />

                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  mb="4"
                />

                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  mb="4"
                />

                <Button
                  type="submit"
                  mt='4'
                  width='full'
                  colorScheme='blue'
                >
                  Sign Up
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
      
    </div>
  )
}

export default SignupForm;