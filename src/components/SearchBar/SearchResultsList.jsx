import './SearchResultsList.css'


export const SearchResultsList = ({ filteredMovies }) => {


    return (
        <>
            <div className="Search-results-container">
            {filteredMovies.map(movie => (
                <h2 key={movie._id} className='Search-bar-results'>
                    {movie.title}
                </h2>
            ))
            }</div>
        </>
    )
}