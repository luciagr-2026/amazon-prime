import { useEffect, useState, Fragment, useRef, useLayoutEffect } from "react";
import {NavLink} from 'react-router-dom'
import './HeroCarousel.css'
import { getMovies } from '../../api/movies';






export const HeroCarousel = () => {

    const [movies, setMovies] = useState([])


    const heroSectionsCategory = Object.values(
        (Array.isArray(movies) ? movies : []).reduce((acc, movie) => {
            movie.genres.forEach((genre) => {
                if (!acc[genre]) {
                    acc[genre] = {
                        _id: genre,
                        title: genre,
                        imagenes: [],
                    };
                }
                acc[genre].imagenes.push(movie)

            });

            return acc;
        }, {})
    )


    const [continueWatching, setContinueWatching] = useState(() => {
        const stored = localStorage.getItem("continueWatching");
        return stored ? JSON.parse(stored) : [];
    });


    const handleMovieClick = (movie) => {
        const stored =
            JSON.parse(localStorage.getItem("continueWatching")) || [];

        const updated = stored.filter((m) => m._id !== movie._id);

        updated.unshift(movie);

        localStorage.setItem(
            "continueWatching",
            JSON.stringify(updated)
        );

        setContinueWatching(updated);
    };

    const removeMovie = (movie) => {
        const updated = continueWatching.filter(
            (m) => m._id !== movie._id
        );

        localStorage.setItem(
            "continueWatching",
            JSON.stringify(updated)
        );

        setContinueWatching(updated);
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const deleteMovies = async (_id) => {

        await fetch(`${API_URL}/movies/${_id}`,

            {
                method:
                    "DELETE"
            }),

            await loadMovies()
    }


    const loadMovies = async () => {

        const movies = await getMovies()

        console.log(movies[0]);

        setMovies(movies)
    }

    useEffect(() => {
        loadMovies()
    }, [])


    return (
        <>

            {continueWatching.length > 0 && (
                <HeroSections
                    title="Continue Watching"
                    imagenes={continueWatching}
                    handleMovieClick={handleMovieClick}
                    removeMovie={removeMovie}
                    isContinueWatching={true}
                />
            )}



            {heroSectionsCategory.map(hero => (
                <HeroSections
                    key={hero._id}
                    {...hero}
                    handleMovieClick={handleMovieClick}
                    removeMovie={removeMovie}
                    deleteMovies={deleteMovies}
                    isContinueWatching={false}
                />
            ))}



        </>
    )
}

const HeroSections = ({
    title,
    imagenes,
    handleMovieClick,
    removeMovie,
    deleteMovies,
    isContinueWatching
}) => {

    const [hoveredMovie, setHoveredMovie] = useState(null)

    const [currentIndex, setCurrentIndex] = useState(0)

    const wrapperRef = useRef(null);
    const firstCardRef = useRef(null);

    const [moveDistance, setMoveDistance] = useState(0);

    const next = () => {
        if (currentIndex < imagenes.length - 5) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }

    useLayoutEffect(() => {
        if (!wrapperRef.current || !firstCardRef.current) return;

        const cardWidth = firstCardRef.current.offsetWidth;

        const gap = parseFloat(
            getComputedStyle(wrapperRef.current).gap
        );

        setMoveDistance(cardWidth + gap);
    }, [imagenes]);

    return (

        <div className="Hero-carousel">

            <h1 className='Hero-carousel-h3'>{title}</h1>

            <div
                className="Hero-carousel-wrapper"
                ref={wrapperRef}
                style={{
                    transform: `translateX(-${currentIndex * moveDistance}px)`
                }}
            >
                {imagenes.map((movie) => {

                    console.log(movie)

                    return (

                        <Fragment key={movie._id} >

                            <div
                                ref={movie === imagenes[0] ? firstCardRef : null}
                                className={`Hero-img-wrapper ${hoveredMovie === movie._id ? "active" : ""
                                    }`}
                                onMouseEnter={() => setHoveredMovie(movie._id)}
                                onMouseLeave={() => setHoveredMovie(null)}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="Hero-film-img"
                                    width="258"
                                    height="145"
                                    onClick={() => handleMovieClick(movie)}
                                />

                                <div
                                    className={
                                        hoveredMovie === movie._id
                                            ? "Hero-film-info Show"
                                            : "Hero-film-info"
                                    }
                                    onMouseEnter={() => setHoveredMovie(movie._id)}
                                    onMouseLeave={() => setHoveredMovie(null)}
                                >
                                    <h2 className="Hero-film-title">{movie.title}</h2>
                                    <div className="Hero-film-platform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-5 -5 34 34" id="alert-success" y="306"><g transform="translate(2 2)" stroke="#E4FDBF" stroke-width="2" fill="none" fillRule="evenodd"><circle cx="10" cy="10" r="9" vector-effect="non-scaling-stroke" /><path stroke-linecap="round" stroke-linejoin="round" d="M5 9.571L8.15 13 14 7" /></g></svg>
                                        <div className="Hero-film-platform-name"> Se incluye con {movie.platform.join(",")}</div>
                                    </div>

                                    <div className="Hero-film-icons">

                                        <svg onClick={() => handleMovieClick(movie)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="play-arrow" y="1585"><path d="M4.576 2.452C3.71 1.953 3 2.364 3 3.364v17.272c0 1 .71 1.41 1.576.912l15.03-8.642c.867-.498.867-1.314 0-1.812L4.576 2.452z" fill="#FFF" fillRule="evenodd" /></svg>
                                       <NavLink to={`/edit/movie/${movie._id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="edit" y="914"><g fill="none" fillRule="evenodd" stroke="#F2F4F6" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.87 3L3 17v4h4L22 7.09z" /><path d="M15 7l3 3" /></g></svg> </NavLink>
                                        <svg onClick={(e) => {
                                            e.stopPropagation();
                                            deleteMovies(movie._id);
                                        }} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="alert-prime-close" y="238"><path d="M4.874 4.874l14.252 14.252m-14.252 0L19.126 4.874" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" /></svg>
                                       <NavLink to='/add/movie' > <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="add" y="0"><path d="M3 12h18m-9 9V3" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" /></svg> </NavLink> 
                                        {isContinueWatching && (
                                            <svg onClick={(e) => {
                                                e.stopPropagation()
                                                removeMovie(movie)
                                            }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34" height="34" viewBox="-5 -5 34 34" id="start-over" y="1942"><defs><path id="a" d="M0 0h17.719v18.538H0z" /></defs><g transform="translate(3 3)" fill="#fff" fillRule="evenodd"><mask id="b" fill="#fff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#a" /></mask><path d="M14.093 2.319C10.8-.134 6.37.014 3.257 2.39l.028-1.37a1 1 0 1 0-2-.042l-.08 3.895a.997.997 0 0 0 .978 1.02l3.895.08a.997.997 0 0 0 1.02-.978 1 1 0 0 0-.98-1.02l-1.603-.033c2.419-1.815 5.839-1.916 8.384-.02a6.956 6.956 0 0 1 2.745 4.6 6.956 6.956 0 0 1-1.313 5.195 6.954 6.954 0 0 1-4.6 2.745 6.962 6.962 0 0 1-5.195-1.312 6.932 6.932 0 0 1-2.57-3.79 1 1 0 0 0-1.931.52 8.9 8.9 0 0 0 3.307 4.874 8.946 8.946 0 0 0 6.678 1.687 8.934 8.934 0 0 0 5.915-3.53 8.943 8.943 0 0 0 1.688-6.678 8.943 8.943 0 0 0-3.53-5.915" fill="#FFF" mask="url(#b)" /></g></svg>

                                        )}
                                    </div>

                                    <p className="Hero-film-description">{movie.description}</p>
                                </div>




                            </div>

                        </Fragment>
                    )
                })}


            </div>
          
                <button onClick={prev} className="Hero-button Hero-button--next">
                    <svg className="Arrow Arrow--next" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Back</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>

                <button onClick={next} className="Hero-button Hero-button--prev">
                    <svg className="Arrow Arrow--prev" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>

            
        </div>

    )
}