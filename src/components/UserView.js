import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
 
export default function UserView({moviesData, fetchData}) {

const [movies, setMovies] = useState([]);

    // Whenever workoutsData changes, update the local state
    useEffect(() => {
        console.log("UserView received moviesData:", moviesData);
        setMovies(moviesData);
    }, [moviesData]);

    return (
        <>  
            <h2>Movies List</h2>
            {movies.length === 0 ? <p>No movies found</p> : null}
            {movies.map(movie => (
                <MovieCard movieProp={movie} key={movie._id} />
            ))}
        </>
    );

}
