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

    const nextImg = () => {
        setIndex(prev => (prev + 1) % movies.length)
    }

    const prevImg = () => {
        setIndex(prev => (prev - 1 + movies.length) % movies.length)
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
               next(error)
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
                    {movies.map((movie) => (
                        <div key={movie._id}>
                            <Imagen movie={movie} />

                        </div>

                    ))}

                </div>

                <div className="Intro-buttons">
                    <button onClick={prevImg} className="Button-next">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Back</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                    <button onClick={nextImg} className="Button-prev">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                </div>

            </div>

            <HeroCarousel />


        </>
    )
}


const Imagen = ({ movie }) => {

    return (
        <img
            src={movie.poster}
            alt={movie.title}
            className="Intro-carousel-img"
        />
    )
}

/*const Infocarousel = ({ movie }) => {

  
    return (

    {hovered == className= "active" : ""

        <div className={`Intro-carousel-info ${current === _id && 'isActive'}`}>
        <h2 className="Hero-film-title">{movie.title}</h2>
        <div className="Hero-film-platform">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-5 -5 34 34" id="alert-success" y="306"><g transform="translate(2 2)" stroke="#E4FDBF" stroke-width="2" fill="none" fillRule="evenodd"><circle cx="10" cy="10" r="9" vector-effect="non-scaling-stroke" /><path stroke-linecap="round" stroke-linejoin="round" d="M5 9.571L8.15 13 14 7" /></g></svg>
        <div className="Hero-film-platform-name"> Se incluye con {movie.platform.join(",")}</div>
        </div>
        <div className="Hero-film-icons">
        <svg onClick={() => handleMovieClick(movie)} xmlns="http://www.w3.org/2000/svg" width=
        </div>

}
    )
}*/



