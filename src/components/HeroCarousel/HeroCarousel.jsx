import { useState } from 'react'
import './HeroCarousel.css'


export const HeroCarousel = () => {


    const heroSections = [
        {
            _id: 0,
            title: `Películas de comedia`,
            imagenes: [
                { _id: 0, alt: `Herofilm1`, src: `/Herofilm1.jpeg` },
                { _id: 1, alt: `Herofilm2`, src: `/Herofilm2.jpeg` },
                { _id: 2, alt: `Herofilm3`, src: `/Herofilm3.jpeg` },
                { _id: 3, alt: `Herofilm4`, src: `/Herofilm4.jpeg` },
                { _id: 4, alt: `Herofilm5`, src: `/Herofilm5.jpeg` },
                { _id: 5, alt: `Herofilm6`, src: `/Herofilm6.jpeg` },
                { _id: 6, alt: `Herofilm7`, src: `/Herofilm7.jpeg` },
                { _id: 7, alt: `Herofilm8`, src: `/Herofilm8.jpeg` },
            ],
            buttonPrev: `Button-prev`,
            buttonNext: `Button-next`
        },
        {
            _id: 1,
            title: `Películas de drama`,
            imagenes: [
                { _id: 8, alt: `Herofilm1`, src: `/Herofilm1.jpeg` },
                { _id: 9, alt: `Herofilm2`, src: `/Herofilm2.jpeg` },
                { _id: 10, alt: `Herofilm3`, src: `/Herofilm3.jpeg` },
                { _id: 11, alt: `Herofilm4`, src: `/Herofilm4.jpeg` },
                { _id: 12, alt: `Herofilm5`, src: `/Herofilm5.jpeg` },
                { _id: 13, alt: `Herofilm6`, src: `/Herofilm6.jpeg` },
                { _id: 14, alt: `Herofilm7`, src: `/Herofilm7.jpeg` },
                { _id: 15, alt: `Herofilm8`, src: `/Herofilm8.jpeg` },
            ],
            buttonPrev: `Button-prev`,
            buttonNext: `Button-next`,
        },
        {
            _id: 2,
            title: `Porque viste "Las cosas que decimos, las cosas que...`,
            imagenes: [
                { _id: 16, alt: `Herofilm1`, src: `/Herofilm1.jpeg` },
                { _id: 17, alt: `Herofilm2`, src: `/Herofilm2.jpeg` },
                { _id: 18, alt: `Herofilm3`, src: `/Herofilm3.jpeg` },
                { _id: 19, alt: `Herofilm4`, src: `/Herofilm4.jpeg` },
                { _id: 20, alt: `Herofilm5`, src: `/Herofilm5.jpeg` },
                { _id: 21, alt: `Herofilm6`, src: `/Herofilm6.jpeg` },
                { _id: 22, alt: `Herofilm7`, src: `/Herofilm7.jpeg` },
                { _id: 23, alt: `Herofilm8`, src: `/Herofilm8.jpeg` },],
            buttonPrev: `Button-prev`,
            buttonNext: `Button-next`
        },
        {
            _id: 3,
            title: `Dejará de estar disponible en Prime en los próximos 30 días`,
            imagenes: [
                { _id: 24, alt: `Herofilm1`, src: `/Herofilm1.jpeg` },
                { _id: 25, alt: `Herofilm2`, src: `/Herofilm2.jpeg` },
                { _id: 26, alt: `Herofilm3`, src: `/Herofilm3.jpeg` },
                { _id: 27, alt: `Herofilm4`, src: `/Herofilm4.jpeg` },
                { _id: 28, alt: `Herofilm5`, src: `/Herofilm5.jpeg` },
                { _id: 29, alt: `Herofilm6`, src: `/Herofilm6.jpeg` },
                { _id: 30, alt: `Herofilm7`, src: `/Herofilm7.jpeg` },
            ],
            buttonPrev: `Button-prev`,
            buttonNext: `Button-next`,
        },
        {
            _id: 4,
            title: `Películas románticas`,
            imagenes: [
                { _id: 31, alt: `Herofilm1`, src: `/Herofilm1.jpeg` },
                { _id: 32, alt: `Herofilm2`, src: `/Herofilm2.jpeg` },
                { _id: 33, alt: `Herofilm3`, src: `/Herofilm3.jpeg` },
                { _id: 34, alt: `Herofilm4`, src: `/Herofilm4.jpeg` },
                { _id: 35, alt: `Herofilm5`, src: `/Herofilm5.jpeg` },
                { _id: 36, alt: `Herofilm6`, src: `/Herofilm6.jpeg` },
                { _id: 37, alt: `Herofilm7`, src: `/Herofilm7.jpeg` },
            ],
            buttonPrev: `Button-prev`,
            buttonNext: `Button-next`,
        },
    ]


    const [page, setPage] = useState(0)
    const imagesPerPage = 5;

    const maxPage = 5

    const [paused, setPaused] = useState(false)
    const pausedCarousel = () => {
        if(_id === 1){
            _id
        }
    }


    const next = () => {
        setPage(prev => {
            if (prev < maxPage) {
                return prev + 1
            }
            return prev
        })
    }

    const prev = () => {
        setPage(prev => {
            if (prev > 0) {
                return prev - 1
            }
            return prev
        })
    }


    return (
        <>



            {heroSections.map(hero =>
                <HeroSections
                    key={hero._id}
                    {...hero}
                    next={next}
                    prev={prev}
                    page={page}
                />
            )}



        </>
    )
}

const HeroSections = ({ title, imagenes, buttonNext, buttonPrev,  next, prev, page }) => {


    return (
        <>
            <div className="Hero-carousel">

                <h1 className='Hero-carousel-h3'>{title}</h1>

                <div className="Hero-carousel-wrapper"
                    style={{
                        transform: `translateX(-${page * 16.875}rem)`
                    }}
                >

                    {imagenes.map(img =>
                        <img
                            key={img._id}
                            src={img.src}
                            alt={img.alt}
                            className='Hero-film-img'
                        />
                    )}
                </div>

                <button onClick={next} className={buttonNext}>
                    <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>

                <button onClick={prev} className={buttonPrev}>
                    <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                </button>

            </div>

        </>

    )
}