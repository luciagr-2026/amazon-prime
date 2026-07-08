import { useState } from "react" 
import { SearchResultsList } from "./SearchResultsList"

export const SearchBar = () => {
    

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    /*const fetchData = async (value) => {
       fetch("${VITE_API_URL}/movies")
       .then((response) => response.json())
       .then((json) => {
        const results = json.filter((movie) => {
            return value && movie && movie.title.toLowerCase().includes(value)
        })
        setResults(results)
       })
        
   
    }

    /*const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }*/


    return (
        <>
        <div className="Search-bar-container">

            <form className="Search-bar-wrapper">

                <span className="Search-icon">
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M9.360 2.025 C 7.466 2.198,5.790 2.960,4.446 4.259 C 3.730 4.951,3.257 5.602,2.817 6.500 C 1.479 9.228,1.809 12.458,3.674 14.900 C 3.949 15.260,4.616 15.933,5.000 16.239 C 6.430 17.378,8.196 17.999,10.000 17.999 C 11.567 17.999,13.170 17.508,14.465 16.632 L 14.911 16.331 17.645 19.066 C 19.449 20.870,20.434 21.828,20.540 21.879 C 20.942 22.074,21.370 22.002,21.686 21.686 C 22.002 21.370,22.074 20.942,21.879 20.540 C 21.828 20.434,20.870 19.449,19.066 17.645 L 16.331 14.911 16.632 14.465 C 18.219 12.120,18.436 9.087,17.200 6.529 C 16.809 5.718,16.392 5.120,15.761 4.464 C 14.541 3.195,12.996 2.388,11.240 2.100 C 10.865 2.039,9.711 1.992,9.360 2.025 M11.041 4.097 C 12.371 4.333,13.638 5.046,14.506 6.045 C 15.229 6.879,15.707 7.879,15.909 8.980 C 15.999 9.468,15.999 10.532,15.909 11.020 C 15.805 11.587,15.653 12.064,15.423 12.545 C 14.584 14.296,13.102 15.462,11.174 15.887 C 10.603 16.013,9.397 16.013,8.826 15.887 C 6.341 15.339,4.548 13.496,4.090 11.020 C 4.000 10.531,4.000 9.469,4.090 8.980 C 4.394 7.335,5.309 5.928,6.660 5.025 C 7.725 4.313,8.873 3.981,10.140 4.019 C 10.448 4.029,10.853 4.063,11.041 4.097 " fill="white" stroke="none" fillRule="evenodd"></path></svg>
                </span>
                <input type="search" id='Search-bar' placeholder='Buscar' value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='reset' className='Search-reset-button'> Borrar </button>

            </form>

        </div>

      <SearchResultsList results={results} />   
        </>
    )
}