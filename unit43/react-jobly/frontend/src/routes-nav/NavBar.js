import React, { useContext } from "react";
import UserContext from '../users/UserContext'
import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext)

  const loggedIn = () => {
    return (
      <>
        <Nav.Link href="/profile" className="text-white">
          :: Welcome, {currentUser.username} ::
        </Nav.Link>
        
        <Nav.Link href="/companies">Companies</Nav.Link>
        <Nav.Link href="/jobs">Jobs</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/" onClick={logout}>
          Log Out
        </Nav.Link>
      </>
    )
  }

  const loggedOut = () => {
    return (
      <>
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </>
    )
  }
  
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jobly</Navbar.Brand>
        <Nav className="justify-content-end">
          {currentUser ? loggedIn() : loggedOut()}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;