import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function authenticate(e) {
        e.preventDefault();

        fetch(`https://movieapp-api-lms1.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Full Login Response:", data); // Debugging the full response

            if (data.access !== undefined) {
                localStorage.setItem('token', data.access);
                
                // Check if isAdmin is in the response
                if (data.hasOwnProperty('isAdmin')) {
                    localStorage.setItem('isAdmin', data.isAdmin);
                    setUser({ id: "user", isAdmin: data.isAdmin });
                } else {
                    console.error(" Backend didn't send isAdmin! Check API response~!");
                }

                notyf.success('Successful Login!');
            } else {
                notyf.error('Incorrect Credentials. Try Again!');
            }
        })
        .catch(error => {
            console.error(" Fetch error:", error);
            notyf.error('Something went wrong!');
        });
    }
    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        user.id !== null ? <Navigate to="/" /> : 
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

            <div className="d-flex justify-content-center my-5">
                <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                    Login
                </Button>
            </div>

            <p className="text-center">
                Don't have an account? You can <Link to="/register">register</Link> here!
            </p>
        </Form>
    );
}
