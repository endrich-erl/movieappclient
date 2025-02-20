import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({movieProp}){
  console.log(movieProp);
  
  const {_id, title, director, year, description, genre} = movieProp;

  const [count, setCount] = useState(0);
  console.log(useState(0));

  return(
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Director:</Card.Subtitle>
        <Card.Text>{director}</Card.Text>
        <Card.Subtitle>Year:</Card.Subtitle>
        <Card.Text>{year}</Card.Text>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Genre:</Card.Subtitle>
        <Card.Text>{genre}</Card.Text>
        <Link className="btn btn-primary" to={`/movies/${_id}`}>View Movie</Link>
      </Card.Body>
    </Card>
  )
}