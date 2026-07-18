import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './EditMovie.css'


export const EditMovie = () => {

    const { id } = useParams()

    console.log(id)

    const [movie, setMovie] = useState(null)

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const updateMovie = async () => {

         const response =
            await fetch(`${API_URL}/movies/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movie)
            })

        if (response.ok) {
            navigate('/home');
        } else {
            console.log("Error updating movie");
        }

    };

    useEffect(() => {
        fetch(`${API_URL}/movies/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data.data))
    }, [id, API_URL])

    if (!movie) {
        return <h2>Loading...</h2>
    }

    return (
        <form className="Put-img-wrapper">

            <img
                src={movie.poster}
                alt={movie.title}
                className="Put-film-img"
            />

            <div className="Put-film-info">

                <input className='Put-input-title'
                    value={movie.title}
                    onChange={(e) =>
                        setMovie({
                            ...movie,
                            title: e.target.value
                        })
                    }
                />

                <textarea
                    value={movie.description}
                    onChange={(e) =>
                        setMovie({
                            ...movie,
                            description: e.target.value
                        })
                    }
                />


            </div>

            <button className='Put-button' onClick={updateMovie} type='button'>
                Save changes
            </button>

        </form>
    )
}