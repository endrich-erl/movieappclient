import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
 
export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-dark text-light navbar-dark">
      <Container>
        <Navbar.Brand href="/">Movie Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Ensure full width and correct alignment */}

          <Nav className="ms-auto">
            {user.id !== null ? (
                <>
                  <Nav.Link as={NavLink} to="/movies" exact="true">Movies</Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
