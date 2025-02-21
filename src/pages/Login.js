import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();

        fetch('https://movieapp-api-lms1.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                console.log("Login successful! Token:", data.access); 
                console.log("email:", email);

                // Store token & email
                localStorage.setItem('token', data.access);
                localStorage.setItem('email', email);

                // Determine admin status based on email
                const isAdmin = email === "admin@mail.com";

                // Update user state
                setUser({
                    id: "placeholder-id", // No user details route, so this is a placeholder
                    email: email,
                    isAdmin: isAdmin
                });

                // Clear inputs
                setEmail('');
                setPassword('');

                notyf.success('Successful Login');
            } else {
                notyf.error(data.message || 'Login failed. Try again.');
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            notyf.error('Something went wrong, try again.');
        });
    }

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        user.id !== null ? (
            <Navigate to="/" />
        ) : (
            <Form onSubmit={authenticate}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant={isActive ? "primary" : "danger"} type="submit" id="loginBtn" disabled={!isActive}>
                    Login
                </Button>
            </Form>       
        )
    );
}
