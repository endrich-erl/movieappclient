import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";
 
export default function AddMovie({ fetchData }) {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [showAdd, setShowAdd] = useState(false);

    const openAdd = () => {
        setShowAdd(true);
    };

    const closeAdd = () => {
        setShowAdd(false);
        setTitle("");
        setDirector("");
        setYear("");
        setDescription("");
        setGenre("");
    };

    const addMovies = (e) => {
        e.preventDefault();

        fetch(`https://movieapp-api-lms1.onrender.com/movies/addMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title, director, year, description, genre }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    notyf.success("Movie Added");
                    closeAdd();
                    fetchData();
                } else {
                    notyf.error("Error: Something Went Wrong.");
                    closeAdd();
                    fetchData();
                }
            });
    };
 
    return user.isAdmin === true ? (
        <>
            <Button variant="primary" onClick={openAdd}>Add New Movie</Button>

            <Modal show={showAdd} onHide={closeAdd}>
                <Form onSubmit={addMovies}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Director"
                                required
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                            />
                        </Form.Group>
                          <Form.Group>
                            <Form.Label>Year:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Year"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Genre"
                                required
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </Form.Group>
                      
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAdd}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    ) : null;
}
