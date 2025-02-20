import { Table } from 'react-bootstrap';
import AddMovie from "./AddMovie";

export default function AdminView({ moviesData, fetchData }) {
    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <div className="d-flex justify-content-center mb-5">
                <AddMovie fetchData={fetchData} />
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className="text-light bg-dark">ID</th>
                        <th className="text-light bg-dark">Title</th>
                        <th className="text-light bg-dark">Director</th>
                        <th className="text-light bg-dark">Year</th>
                        <th className="text-light bg-dark">Genre</th>
                        <th className="text-light bg-dark">Description</th>
                        <th className="text-light bg-dark">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {moviesData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">No movies available</td>
                        </tr>
                    ) : (
                        moviesData.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie._id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.year}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.description.substring(0, 100)}...</td>
                                <td className={movie.isActive ? "text-success" : "text-danger"}>
                                    {movie.isActive ? "Available" : "Unavailable"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
}
