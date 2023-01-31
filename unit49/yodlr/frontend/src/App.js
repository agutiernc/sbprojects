import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import ComponentRoutes from "./routes-nav/ComponentRoutes";


const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <Router>
      <Container maxW='90%'>
        <IconButton
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          isRound="true"
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
          my="5"
        />

        <ComponentRoutes />
      </Container>
    </Router>
  )
}

export default App;
