import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Movies from './pages/Movies';

export default function App() {

  //Update the codes relating to global users states. We don't need isAdmin in this context.

      const [user, setUser] = useState({
            id: null
       });

    // Function for clearing localStorage on logout
    function unsetUser(){
        localStorage.clear();
    };

    useEffect(() => {
        fetch(`https://fitnessapp-api-ln8u.onrender.com/users/details`, {
        headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
        })
        .then(res => res.json())
        .then(data => {

        // Set the user states values with the user details upon successful login.
        if (typeof data !== "undefined") {

            setUser({
            id: data._id
            });

        // Else set the user states to the initial values
        } else {

            setUser({
            id: null
            });

        }

        })
    }, [])

    // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
    useEffect(() => {
        console.log(user);
        console.log(localStorage);
    }, [user])


    /* ... */


  //Update the routes. Remove all other pages except login.
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  )
}
