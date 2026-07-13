import { useEffect, useState, Fragment, useRef, useLayoutEffect } from "react";
import { NavLink } from 'react-router-dom'
import { SearchBar } from "../../components/SearchBar/SearchBar";
import './HeroCarousel.css'
import { getMovies } from '../../api/movies';






export const HeroCarousel = () => {

    const [movies, setMovies] = useState([])
 

    const [showSearchBar, setShowSearchBar] = useState(false)

    const toggleSearchBar = () => {
        setShowSearchBar(prev => !prev)
    }

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
           
           {showSearchBar && <SearchBar/>}
            <FloatingHeader toggleSearchBar={toggleSearchBar}  />

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
                                {movie.platform.includes("Prime") || movie.featured ? (
                                    <>
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="Hero-film-img"
                                            width="258"
                                            height="145"
                                            onClick={() => handleMovieClick(movie)}
                                        />

                                        <IsPrime hoveredMovie={hoveredMovie} />

                                    </>
                                ) :

                                    (
                                        <>
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                className="Hero-film-img"
                                                width="258"
                                                height="145"
                                                onClick={() => handleMovieClick(movie)}
                                            />

                                            <NotPrime hoveredMovie={hoveredMovie} />

                                        </>
                                    )

                                }


                                {movie.platform.includes("Prime") || movie.featured ? (
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


                                        <IsPrime />

                                        <div className="Hero-film-icons">

                                            <svg onClick={() => handleMovieClick(movie)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="play-arrow" y="1585"><path d="M4.576 2.452C3.71 1.953 3 2.364 3 3.364v17.272c0 1 .71 1.41 1.576.912l15.03-8.642c.867-.498.867-1.314 0-1.812L4.576 2.452z" fill="#FFF" fillRule="evenodd" /></svg>
                                            <NavLink to={`/edit/movie/${movie._id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="edit" y="914"><g fill="none" fillRule="evenodd" stroke="#F2F4F6" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.87 3L3 17v4h4L22 7.09z" /><path d="M15 7l3 3" /></g></svg> </NavLink>
                                            <svg onClick={(e) => {
                                                e.stopPropagation();
                                                deleteMovies(movie._id);
                                            }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="alert-prime-close" y="238"><path d="M4.874 4.874l14.252 14.252m-14.252 0L19.126 4.874" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" /></svg>
                                            <NavLink to='/add/movie' > <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="add" y="0"><path d="M3 12h18m-9 9V3" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" /></svg> </NavLink>
                                            {isContinueWatching && (
                                                <svg onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeMovie(movie)
                                                }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25" height="25" viewBox="-5 -5 34 34" id="start-over" y="1942"><defs><path id="a" d="M0 0h17.719v18.538H0z" /></defs><g transform="translate(3 3)" fill="#fff" fillRule="evenodd"><mask id="b" fill="#fff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#a" /></mask><path d="M14.093 2.319C10.8-.134 6.37.014 3.257 2.39l.028-1.37a1 1 0 1 0-2-.042l-.08 3.895a.997.997 0 0 0 .978 1.02l3.895.08a.997.997 0 0 0 1.02-.978 1 1 0 0 0-.98-1.02l-1.603-.033c2.419-1.815 5.839-1.916 8.384-.02a6.956 6.956 0 0 1 2.745 4.6 6.956 6.956 0 0 1-1.313 5.195 6.954 6.954 0 0 1-4.6 2.745 6.962 6.962 0 0 1-5.195-1.312 6.932 6.932 0 0 1-2.57-3.79 1 1 0 0 0-1.931.52 8.9 8.9 0 0 0 3.307 4.874 8.946 8.946 0 0 0 6.678 1.687 8.934 8.934 0 0 0 5.915-3.53 8.943 8.943 0 0 0 1.688-6.678 8.943 8.943 0 0 0-3.53-5.915" fill="#FFF" mask="url(#b)" /></g></svg>

                                            )}
                                        </div>

                                        <p className="Hero-film-description">{movie.description}</p>
                                    </div>
                                ) :

                                    (
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


                                            <NotPrime />

                                            <div className="Hero-film-icons">

                                                <svg onClick={() => handleMovieClick(movie)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="play-arrow" y="1585"><path d="M4.576 2.452C3.71 1.953 3 2.364 3 3.364v17.272c0 1 .71 1.41 1.576.912l15.03-8.642c.867-.498.867-1.314 0-1.812L4.576 2.452z" fill="#FFF" fillRule="evenodd" /></svg>
                                                <NavLink to={`/edit/movie/${movie._id}`}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="edit" y="914"><g fill="none" fillRule="evenodd" stroke="#F2F4F6" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.87 3L3 17v4h4L22 7.09z" /><path d="M15 7l3 3" /></g></svg> </NavLink>
                                                <svg onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteMovies(movie._id);
                                                }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="alert-prime-close" y="238"><path d="M4.874 4.874l14.252 14.252m-14.252 0L19.126 4.874" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" /></svg>
                                                <NavLink to='/add/movie' > <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="-5 -5 34 34" id="add" y="0"><path d="M3 12h18m-9 9V3" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" /></svg> </NavLink>
                                                {isContinueWatching && (
                                                    <svg onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeMovie(movie)
                                                    }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="25" height="25" viewBox="-5 -5 34 34" id="start-over" y="1942"><defs><path id="a" d="M0 0h17.719v18.538H0z" /></defs><g transform="translate(3 3)" fill="#fff" fillRule="evenodd"><mask id="b" fill="#fff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#a" /></mask><path d="M14.093 2.319C10.8-.134 6.37.014 3.257 2.39l.028-1.37a1 1 0 1 0-2-.042l-.08 3.895a.997.997 0 0 0 .978 1.02l3.895.08a.997.997 0 0 0 1.02-.978 1 1 0 0 0-.98-1.02l-1.603-.033c2.419-1.815 5.839-1.916 8.384-.02a6.956 6.956 0 0 1 2.745 4.6 6.956 6.956 0 0 1-1.313 5.195 6.954 6.954 0 0 1-4.6 2.745 6.962 6.962 0 0 1-5.195-1.312 6.932 6.932 0 0 1-2.57-3.79 1 1 0 0 0-1.931.52 8.9 8.9 0 0 0 3.307 4.874 8.946 8.946 0 0 0 6.678 1.687 8.934 8.934 0 0 0 5.915-3.53 8.943 8.943 0 0 0 1.688-6.678 8.943 8.943 0 0 0-3.53-5.915" fill="#FFF" mask="url(#b)" /></g></svg>

                                                )}
                                            </div>

                                            <p className="Hero-film-description">{movie.description}</p>
                                        </div>
                                    )

                                }


                            </div>

                        </Fragment>
                    )
                })}


            </div>

            <button
                onClick={prev}
                className="Hero-button Hero-button--next"
            >
                <svg className="Arrow Arrow--next" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Back</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
            </button>

            <button onClick={next}
                className="Hero-button Hero-button--prev">
                <svg className="Arrow Arrow--prev" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
            </button>


        </div>

    )
}


const IsPrime = ({ hoveredMovie }) => {
    return (
        <div className={hoveredMovie ? "Hero-film-platform Close" : "Hero-film-platform"}>

            <svg
                viewBox="0 0 24 24" height="12" width="12" role="img" aria-hidden="true"><title>Entitled</title><svg fill="#0070f0" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="#0070f0" stroke="none" fillRule="evenodd"></path></svg></svg>

            <span className="Hero-film-platform-name">
                Se incluye con Prime.
            </span>

        </div>

    )
}

const NotPrime = ({ hoveredMovie }) => {

    return (
        <div className={hoveredMovie ? "Hero-film-platform Close" : "Hero-film-platform"}>

            <svg
                className='Hero-film-svg'
                viewBox="0 0 24 24" height="12" width="12" role="img" aria-hidden="true"><title>Store Filled</title><svg fill="#ffd814" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 16.000 7.000 L 17.000 7.000 17.000 9.573 C 17.000 12.477,17.008 12.394,16.701 12.701 C 16.521 12.881,16.242 13.000,16.000 13.000 C 15.758 13.000,15.479 12.881,15.299 12.701 C 14.992 12.394,15.000 12.477,15.000 9.573 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 9.573 C 9.000 12.477,9.008 12.394,8.701 12.701 C 8.310 13.092,7.690 13.092,7.299 12.701 C 6.992 12.394,7.000 12.477,7.000 9.573 L 7.000 7.000 8.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 " fill="ffd814" stroke="none" fillRule="evenodd"></path></svg></svg>

            <span className="Hero-film-platform-name">
                Suscribirse.
            </span>

        </div>

    )
}

const FloatingHeader = ({ toggleSearchBar}) => {



    return (
         
        <div className="Hero-floating-header">
            <div className="Hero-floating-header-icons">
                <svg onClick={toggleSearchBar} className="Hero-floating-header-icon" viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Search</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.360 2.025 C 7.466 2.198,5.790 2.960,4.446 4.259 C 3.730 4.951,3.257 5.602,2.817 6.500 C 1.479 9.228,1.809 12.458,3.674 14.900 C 3.949 15.260,4.616 15.933,5.000 16.239 C 6.430 17.378,8.196 17.999,10.000 17.999 C 11.567 17.999,13.170 17.508,14.465 16.632 L 14.911 16.331 17.645 19.066 C 19.449 20.870,20.434 21.828,20.540 21.879 C 20.942 22.074,21.370 22.002,21.686 21.686 C 22.002 21.370,22.074 20.942,21.879 20.540 C 21.828 20.434,20.870 19.449,19.066 17.645 L 16.331 14.911 16.632 14.465 C 18.219 12.120,18.436 9.087,17.200 6.529 C 16.809 5.718,16.392 5.120,15.761 4.464 C 14.541 3.195,12.996 2.388,11.240 2.100 C 10.865 2.039,9.711 1.992,9.360 2.025 M11.041 4.097 C 12.371 4.333,13.638 5.046,14.506 6.045 C 15.229 6.879,15.707 7.879,15.909 8.980 C 15.999 9.468,15.999 10.532,15.909 11.020 C 15.805 11.587,15.653 12.064,15.423 12.545 C 14.584 14.296,13.102 15.462,11.174 15.887 C 10.603 16.013,9.397 16.013,8.826 15.887 C 6.341 15.339,4.548 13.496,4.090 11.020 C 4.000 10.531,4.000 9.469,4.090 8.980 C 4.394 7.335,5.309 5.928,6.660 5.025 C 7.725 4.313,8.873 3.981,10.140 4.019 C 10.448 4.029,10.853 4.063,11.041 4.097 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                <svg className="Hero-floating-header-icon" viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Categories Remaster</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.580 3.047 C 3.859 3.185,3.199 3.848,3.044 4.592 C 2.905 5.257,3.105 5.912,3.596 6.404 C 4.393 7.200,5.607 7.200,6.404 6.404 C 7.200 5.607,7.200 4.393,6.404 3.596 C 5.913 3.106,5.277 2.914,4.580 3.047 M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M18.580 3.047 C 17.859 3.185,17.199 3.848,17.044 4.592 C 16.789 5.816,17.751 7.000,19.000 7.000 C 19.920 7.000,20.768 6.310,20.956 5.408 C 21.095 4.743,20.895 4.088,20.404 3.596 C 19.913 3.106,19.277 2.914,18.580 3.047 M4.580 10.047 C 4.236 10.113,3.883 10.310,3.596 10.596 C 2.800 11.393,2.800 12.607,3.596 13.404 C 4.393 14.200,5.607 14.200,6.404 13.404 C 7.200 12.607,7.200 11.393,6.404 10.596 C 5.913 10.106,5.277 9.914,4.580 10.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M18.580 10.047 C 17.707 10.214,17.000 11.087,17.000 12.000 C 17.000 12.920,17.690 13.768,18.592 13.956 C 19.816 14.211,21.000 13.249,21.000 12.000 C 21.000 11.477,20.790 10.983,20.404 10.596 C 19.913 10.106,19.277 9.914,18.580 10.047 M4.580 17.047 C 3.859 17.185,3.199 17.848,3.044 18.592 C 2.789 19.816,3.751 21.000,5.000 21.000 C 5.920 21.000,6.768 20.310,6.956 19.408 C 7.095 18.743,6.895 18.088,6.404 17.596 C 5.913 17.106,5.277 16.914,4.580 17.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 M18.580 17.047 C 17.859 17.185,17.199 17.848,17.044 18.592 C 16.789 19.816,17.751 21.000,19.000 21.000 C 20.080 21.000,21.000 20.080,21.000 19.000 C 21.000 18.477,20.790 17.983,20.404 17.596 C 19.913 17.106,19.277 16.914,18.580 17.047 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                <svg className="Hero-floating-header-icon" viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Bookmark</title><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.120 2.060 C 5.795 2.140,5.568 2.248,5.300 2.452 C 4.948 2.720,4.755 2.990,4.593 3.440 L 4.500 3.700 4.489 12.237 C 4.482 17.760,4.493 20.850,4.518 20.989 C 4.626 21.574,5.032 21.943,5.620 21.990 C 5.817 22.006,5.910 21.991,6.102 21.913 C 6.233 21.860,7.613 21.103,9.170 20.230 L 12.000 18.645 14.830 20.230 C 16.386 21.103,17.767 21.860,17.898 21.913 C 18.090 21.991,18.183 22.006,18.380 21.990 C 18.968 21.943,19.374 21.574,19.482 20.989 C 19.507 20.850,19.518 17.760,19.511 12.237 L 19.500 3.700 19.407 3.442 C 19.171 2.789,18.725 2.342,18.080 2.113 L 17.820 2.020 12.080 2.013 C 7.380 2.007,6.300 2.016,6.120 2.060 M17.120 11.560 C 17.120 15.542,17.109 18.800,17.097 18.800 C 17.084 18.800,16.071 18.239,14.847 17.553 C 13.622 16.868,12.542 16.272,12.446 16.230 C 12.208 16.125,11.789 16.126,11.547 16.233 C 11.447 16.277,10.367 16.872,9.146 17.556 C 7.926 18.240,6.916 18.800,6.903 18.800 C 6.891 18.800,6.880 15.542,6.880 11.560 L 6.880 4.320 12.000 4.320 L 17.120 4.320 17.120 11.560 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                <NavLink to="/add/movie"> <svg className="Hero-floating-header-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-5 -5 34 34" id="add" y="0"><path d="M3 12h18m-9 9V3" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" /></svg> </NavLink>
                <NavLink to="/login/email"> <img src="/LoginIcon.svg" alt="login" className="Hero-floating-header-login-icon" /></NavLink>

            </div>
        </div>
    )
}