import { useEffect, useState } from 'react'
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

                acc[genre].imagenes.push({
                    _id: movie._id,
                    title: movie.title,
                    src: movie.poster,
                });

            });

            return acc;
        }, {})
    );




    useEffect(() => {

        const loadMovies = async () => {

            const movies = await getMovies()

            console.log(movies[0]);

            setMovies(movies)
        }

        loadMovies()

    }, [])


    return (
        <>



            {heroSectionsCategory.map(hero =>
                <HeroSections
                    key={hero._id}
                    {...hero}
                />
            )}



        </>
    )
}

const HeroSections = ({ title, imagenes }) => {


    return (
        <>
            <div className="Hero-carousel">

                <h1 className='Hero-carousel-h3'>{title}</h1>

                <div
                    className="Hero-carousel-wrapper"
                    /*style={{
                        transform: `translateX(-${page * 16.875}rem)`
                    }}*/
                >
                    {imagenes.map((img) => {

                        console.log(img)

                        const imageSrc = img.src.startsWith("/posters")
                            ? `http://localhost:3000${img.src}`
                            : img.src;

                        console.log(imageSrc)

                        return (
                            <img
                                key={img._id}
                                src={img.src}
                                alt={img.title}
                                className="Hero-film-img"
                            />
                        );
                    })}
                </div>



            </div>

        </>

    )
}