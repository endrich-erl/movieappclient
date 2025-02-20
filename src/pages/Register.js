import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';
 

export default function Register() {
    const notyf = new Notyf();

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);


    console.log(email);
    console.log(password);
    console.log(confirmPassword)

    useEffect(()=> {
        if(( email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)) {

            setIsActive(true)

        } else {

            setIsActive(false)
        }
    }, [email,password,confirmPassword])


    function registerUser(e) {

        e.preventDefault();

        fetch(`https://movieapp-api-lms1.onrender.com/users/register`, {


        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:email,
            password: password
        })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.message === "Registered Successfully"){
                setEmail('');
                setPassword('')
                setConfirmPassword('')

                notyf.success('Registered Successfully');
                navigate("/login");

            } else if (data.message === "Email invalid"){

                notyf.error('Email invalid');

            } else if (data.message === "Password must be atleast 8 charachers long") {

                notyf.error('Password must be atleast 8 charachers long');

            } else {

                notyf.error('Something went wrong. Try Again');
            }
        })
    }

    return (
        (user.id !== null) ?
        <Navigate to="/" />
        :
        <Form onSubmit={(e)=> registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Email" 
                    required
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />
            </Form.Group>
          
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    required 
                    value={password}
                     onChange={e => {setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    required 
                    value={confirmPassword}
                     onChange={e => {setConfirmPassword(e.target.value)}}
                />
            </Form.Group>

            {isActive? 
                <div className="d-flex justify-content-center">
                <Button  variant="primary" type="submit" id="submitBtn">
                        Submit
                </Button>
                </div>
                :
                <div className="d-flex justify-content-center">
                <Button variant="danger" type="submit" id="submitBtn" disabled>
                        Submit
                </Button>
                </div>
            }   
        </Form>
    )

}