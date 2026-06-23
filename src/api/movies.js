const API_URL = import.meta.env.VITE_API_URL

export const getMovies = async () => {
    const res = await fetch(`${API_URL}/movies`)
    const data = await res.json()
    return data.data
}