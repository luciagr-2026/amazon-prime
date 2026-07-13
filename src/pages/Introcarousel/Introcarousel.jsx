import { HeroCarousel } from '../HeroCarousel/HeroCarousel'
import './Introcarousel.css'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { getMovies } from '../../api/movies'
import { SearchBar } from '../../components/SearchBar/SearchBar'
//import { Footer } from './Footer/Footer'
import { useNavigate } from 'react-router-dom'


export const Introcarousel = () => {

    const navigate = useNavigate()


    const buscar = JSON.parse(localStorage.getItem('user')) || {}

    const toggleSearchBar = () => {
        setSearchBar(prev => !prev)
    }



    const [searchBar, setSearchBar] = useState(false)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)

    const carouselMovies = movies.filter(
        movie => movie.backdrop && movie.backdrop !== "/backdrops/default.jpg"
    )

    const nextImg = () => {
        setIndex(prev => (prev + 1) % carouselMovies.length);
    }

    const prevImg = () => {
        setIndex(prev => (prev - 1 + carouselMovies.length) % carouselMovies.length);
    }

    useEffect(() => {
        if (!buscar.password) {
            navigate("/LoginPasswordPage")
        }
    }, [navigate, buscar.password])




    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await getMovies()
                setMovies(data)

            } catch (error) {
                (error)
            } finally {
                setLoading(false)
            }
        }
        loadMovies()

    }, [])

    if (loading) return <p>Loading movies...</p>



    return (
        <>
            <Header toggleSearchBar={toggleSearchBar} />

            {searchBar && <SearchBar />}


            <div className="Intro-carousel">

                <div
                    className="Intro-carousel-wrapper"
                    style={{
                        width: `calc(${movies.length} * 100%)`,
                        gridTemplateColumns: `repeat(${movies.length}, 1fr)`,
                        transform: `translateX(calc((-100% / ${movies.length}) * ${index}))`
                    }}
                >
                    {carouselMovies.map(movie => (
                        <Slide
                            key={movie._id}
                            movie={movie}
                        />
                    ))}

                </div>


                <button onClick={prevImg} className="Button Button--next">
                    <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Back</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>
                <button onClick={nextImg} className="Button Button--prev">
                    <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>
            </div>




            <HeroCarousel />


        </>
    )
}

const Slide = ({ movie }) => {

    const [showTrailer, setShowTrailer] = useState(false)

    return (
        <div className="Intro-slide">

            <Imagen
                movie={movie}
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
            />

            <Infocarousel
                movie={movie}
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
            />

        </div>
    );
};

const Imagen = ({ movie, showTrailer, setShowTrailer }) => {

  
    if(showTrailer) {
        return(
               <div className="Intro-trailer">
                <svg className='Intro-trailer-exit' 
                onClick={() => setShowTrailer(false)}
                xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="-5 -5 31 31" id="dismissable-close" y="849"><path d="M18.97 2L2 18.97M2 2l16.97 16.97" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="square"/></svg>
                <iframe
                    src={movie.trailer}
                    title={movie.title}
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                />
            </div>
        )
    }

  return (

        movie.backdrop ? (
            <img
                src={movie.backdrop}
                alt={movie.title}
                className="Intro-carousel-img"
            />
        ) : null


    )
}

const Infocarousel = ({ movie, setShowTrailer }) => {

    const [hovered, setHovered] = useState(false)



    return (
        <div className="Intro-carousel-info"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {movie.platform.includes("Prime") || movie.featured ? (
                <div className="Intro-film-text">
                    <img
                        src="/PrimeBlueLogo.png"
                        alt="Prime"
                        className="Intro-prime-logo"
                    />

                    <img
                        src={movie.logo}
                        alt={movie.title}
                        className="Intro-film-logo"
                    />
                    <div className="Info-film-play" onClick={() => setShowTrailer(true)} >
                        <svg className='Info-film-play-svg' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="play-arrow" y="1585"><path d="M4.576 2.452C3.71 1.953 3 2.364 3 3.364v17.272c0 1 .71 1.41 1.576.912l15.03-8.642c.867-.498.867-1.314 0-1.812L4.576 2.452z" fill="black" fill-rule="evenodd" /></svg>
                        <span className="Info-play-span" > Ver ahora </span>
                    </div>

                    <p className={hovered ? "Info-film-description Active" : "Info-film-description"} >

                        {movie.description}
                    </p>

                    <div className="Intro-film-span">

                        <svg className='Intro-film-svg'
                            viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Entitled</title><svg fill="#0070f0" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="#0070f0" stroke="none" fillRule="evenodd"></path></svg></svg>

                        <span className="Intro-film-platform-name">
                            Se incluye con Prime
                        </span>
                    </div>
                </div>
            ) : (
                <div className="Intro-film-text"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <img
                        src="/HBO-logo.jpg"
                        alt="HBO"
                        className="Intro-hbo-logo"
                    />


                    <img
                        src={movie.logo}
                        alt={movie.title}
                        className="Intro-film-logo"
                    />

                     <div className="Info-film-play" onClick={() => setShowTrailer(true)} >
                        <svg className='Info-film-play-svg' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="-5 -5 34 34" id="play-arrow" y="1585"><path d="M4.576 2.452C3.71 1.953 3 2.364 3 3.364v17.272c0 1 .71 1.41 1.576.912l15.03-8.642c.867-.498.867-1.314 0-1.812L4.576 2.452z" fill="black" fill-rule="evenodd" /></svg>
                        <span className="Info-play-span" > Ver ahora </span>
                    </div>

                    <p className={hovered ? "Info-film-description Active" : "Info-film-description"} >

                        {movie.description}
                    </p>


                    <div className="Intro-film-span">

                        <svg viewBox="0 0 24 24" height="15" width="15" role="img" aria-hidden="true"><title>Store Filled</title><svg fill="#ffd814" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 16.000 7.000 L 17.000 7.000 17.000 9.573 C 17.000 12.477,17.008 12.394,16.701 12.701 C 16.521 12.881,16.242 13.000,16.000 13.000 C 15.758 13.000,15.479 12.881,15.299 12.701 C 14.992 12.394,15.000 12.477,15.000 9.573 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 9.573 C 9.000 12.477,9.008 12.394,8.701 12.701 C 8.310 13.092,7.690 13.092,7.299 12.701 C 6.992 12.394,7.000 12.477,7.000 9.573 L 7.000 7.000 8.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 " fill="ffd814" stroke="none" fillRule="evenodd"></path></svg></svg>

                        <span>Disponible para comprar.</span>
                    </div>
                </div>
            )}
        </div>
    );
};


