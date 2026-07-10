import { Link } from 'react-router-dom'
import './SearchResultsList.css'


export const SearchResultsList = ({ filteredMovies }) => {

    return (
        <>
            <div className="Search-results-container">
                {filteredMovies.map(movie => (
                    <Link
                        key={movie._id} className='Search-bar-results'>

                        <div className="Search-bar-img-results">
                            <img className='Movie-result' src={movie.poster} alt={movie.title} />
                        </div>

                        <span>{movie.title} </span>

                        <span className='Search-bar-results-time'>{movie.year} {movie.duration}</span>
                    </Link>

                ))
                }
            </div>
        </>
    )
}