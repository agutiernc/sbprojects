import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from '@chakra-ui/react'

import ComponentRoutes from "./routes-nav/ComponentRoutes";


const App = () => {
  
  
  return (
    <Router>
      <Container maxW='lg'>
        <ComponentRoutes />
      </Container>
    </Router>
  )
}

export default App;
