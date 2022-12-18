import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'react-bootstrap'

import ComponentRoutes from "./routes-nav/ComponentRoutes";
import NavBar from "./routes-nav/NavBar";

// import joblyApi from './api/api'

const App = () => {

  return (
    <Router>
      <NavBar />
      <Container>
        <ComponentRoutes />
      </Container>
    </Router>
  )
}
export default App;
