import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react";

import { Footer } from '../../components/Footer/Footer'
import './Addmovie.css'

export const AddMovie = () => {

 

    const [movie, setMovie] = useState({
        title: "",
        year: "",
        duration: "",
        type: "",
        genres: "",
        description: "",
        actors: "",
        director: "",
        country: "",
        ageRating: "",
        languages: "",
        tags: "",
        poster: "",
        featured: false,
        platform: ""
    })

    const postMovie = async (e) => {

        const API_URL = import.meta.env.VITE_API_URL;

        e.preventDefault()

        const response = await fetch(`${API_URL}/movies`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: movie.title,
                    year: Number(movie.year),
                    duration: movie.duration,
                    type: movie.type,
                    genres: 
                        movie.genres
                        .split(",")
                        .map(g => g.trim()),
                    description: movie.description,
                    actors:
                     movie.actors
                     .split(",")
                     .map(g => g.trim()),
                    director: movie.director,
                    country: movie.country,
                    ageRating: movie.ageRating,
                    languages: 
                    movie.languages
                    .split(",")
                    .map(g => g.trim()),
                    tags: 
                    movie.tags
                    .split(",")
                    .map(g => g.trim()),
                    poster: movie.poster,
                    featured: movie.featured,
                    platform: 
                    movie.platform
                    .split(",")
                    .map(g => g.trim())
                })
            })

        const data = await response.json()

        console.log(data)
    }

    return (


        <div className="Add-movie-page">
            <div className="Add-movie-block">
                <NavLink to="/home">  <img src="/BlackPrimeLogo.png" alt="Prime Logo" className="Add-movie-logo" /> </NavLink>
                <form
                    onSubmit={postMovie}
                    className="Add-movie-form"
                >
                    <h1 className="Add-movie-h1"> Become a creator </h1>
                    <div className="Add-movie-span"> Introduce los datos de tu película. </div>

                    <label htmlFor="#"> El primer paso, ponle nombre a tu película: </label>
                    <input
                        type="text"
                        value={movie.title}
                        onChange={(e) =>
                            setMovie({
                                ...movie,
                                title: e.target.value
                            })
                        }
                    />

                    <label htmlFor="#"> Dale la información necesaria: </label>
                    <input
                        type="text"
                        value={movie.year}
                        name="movie year"
                        className="Post-movie-year"
                        placeholder='year'
                        onChange={(e) =>
                            setMovie({
                                ...movie,
                                year: e.target.value
                            })
                        }

                    />


                    <input
                        type="text"
                        value={movie.duration}
                        name="movie title"
                        className="Post-movie-duration"
                        placeholder="duration: 1h 46m"
                        onChange={(e) =>
                            setMovie({
                                ...movie,
                                duration: e.target.value
                            })
                        }

                    />

                    <input
                        type="text"
                        value={movie.type}
                        name="movie or show"
                        className="Post-movie-type"
                        placeholder="movie or show"
                        onChange={(e) =>
                            setMovie({
                                ...movie,
                                type: e.target.value
                            })
                        }

                    />

                    <input
                        type="text"
                        value={movie.genres}
                        name="genre"
                        className="Post-movie-genres"
                        placeholder='genres: "Drama,Romance"'
                        onChange={(e) => setMovie({
                            ...movie,
                            genres: e.target.value
                        })}

                    />

                    <input
                        type="text"
                        value={movie.description}
                        name="movie or serie"
                        className="Post-movie-description"
                        placeholder='Description'
                        onChange={(e) => setMovie({
                            ...movie,
                            description: e.target.value
                        })}

                    />

                    <input
                        type="text"
                        value={movie.actors}
                        name="actors"
                        className="Post-movie-actors"
                        placeholder='Actors'
                        onChange={(e) => setMovie({
                            ...movie,
                            actors: e.target.value
                        })}

                    />

                    <input
                        type="text"
                        value={movie.director}
                        name="director"
                        className="Post-movie-director"
                        placeholder='Director'
                        onChange={(e) => setMovie({
                            ...movie,
                            director: e.target.value
                        })}

                    />


                    <input
                        type="text"
                        value={movie.country}
                        name="country"
                        className="Post-movie-country"
                        placeholder='Country'
                        onChange={(e) => setMovie({
                            ...movie,
                            country: e.target.value
                        })}

                    />

                    <input
                        type="text"
                        value={movie.ageRating}
                        name="age rating"
                        className="Post-movie-age"
                        placeholder='Age rating'
                        onChange={(e) => setMovie({
                            ...movie,
                            ageRating: e.target.value
                        })}


                    />

                    <input
                        type="text"
                        value={movie.languages}
                        name="movie languages"
                        className="Post-movie-age"
                        placeholder='Languages: "English, Spanish"'
                        onChange={(e) => setMovie({
                            ...movie,
                            languages: e.target.value
                        })}


                    />

                    <input
                        type="text"
                        value={movie.tags}
                        name="movie tags"
                        className="Post-movie-tags"
                        placeholder='Tags: "Romance, drama, friendship, destiny, love...'
                        onChange={(e) => setMovie({
                            ...movie,
                            tags: e.target.value
                        })}


                    />

                    <input
                        type="text" //should I put "file"?
                        value={movie.poster}
                        name="movie poster"
                        className="Post-movie-poster"
                        placeholder='Debe llamarse: "/posters/default.jpg'
                        onChange={(e) => setMovie({
                            ...movie,
                            poster: e.target.value
                        })}


                    />

                    <div className="Add-movie-checkbox">

                        <input
                            type="checkbox"
                            checked={movie.featured}

                            onChange={(e) =>
                                setMovie({
                                    ...movie,
                                    featured: e.target.checked
                                })
                            }
                        />

                        <label htmlFor="#"> true </label>
                    </div>

                    <input
                        type="text"
                        value={movie.platform}
                        name="movie platform"
                        className="Post-movie-platform"
                        placeholder='Example: "Prime Video, Disney"'
                        onChange={(e) => setMovie({
                            ...movie,
                            platform: e.target.value
                        })}


                    />




                    <button
                        type="submit"
                        className="Add-movie-button Add-movie-button--continue"
                    >
                        Añadela a la plataforma
                    </button>


                    <div className="Add-movie-p">
                        Al continuar, aceptas las <a href="#" className="Add-movie-conditions">Condiciones de uso</a> de Amazon. Consulta
                        <a href="#" className="Add-movie-privacy"> Aviso de privacidad, Aviso de cookies y Anuncios por intereses</a>
                    </div>


                    <div className="Add-movie-fq">
                        <div className="Add-movie-help">
                            <a href="#" className="Add-movie-helping-a">¿Necesitas ayuda?</a>
                            <img src="/UpArrow.png" alt="arrow" />
                            <img src="/DownArrow.png" alt="arrow" />

                        </div>

                    </div>



                </form>


                <div className="Add-movie-new-account-span">¿Eres nuevo en Amazon?</div>
                <button className="Add-movie-new-account-button"> Crea tu cuenta de Amazon </button>

            </div>


            <Footer />

        </div>

    )
}