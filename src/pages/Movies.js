import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    const fetchData = () => {
        let fetchUrl = "https://movieapp-api-lms1.onrender.com/movies/getMovies";

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data);

            if (Array.isArray(data)) {
                setMovies(data);
            } else if (Array.isArray(data.movies)) {
                setMovies(data.movies);
            } else {
                console.error('Unexpected API response format:', data);
                setMovies([]);
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            setMovies([]);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return user.isAdmin ? <AdminView moviesData={movies} fetchData={fetchData} /> : <UserView moviesData={movies} fetchData={fetchData} />;
}
