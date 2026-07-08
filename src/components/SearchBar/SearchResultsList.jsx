
import './SearchResultsList.css'


export const SearchResultsList = ({results}) => {
    return (
        <>
            <div className="Search-bar-results">SearchResultsList
             {results.map((result, id) => {
                return <ul key={result.id} className='Search-bar-results-ul'>
                   <li className="Search-bar-results-ul">{result.name}</li>
                </ul>
             })}
            </div>
        </>
    )
}