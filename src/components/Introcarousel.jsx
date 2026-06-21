import { HeroCarousel } from './HeroCarousel/HeroCarousel'
import './Introcarousel.css'
import { useEffect, useState } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { useNavigate } from 'react-router-dom'


export const Introcarousel = () => {

    const Imagenes = [
        { _id: 0, src: `film2.jpeg`, alt: `Film1` },
        { _id: 1, src: `film1.jpeg`, alt: `Film2` },
        { _id: 2, src: `film3.jpeg`, alt: `Film3` },
    ]

    const infoCarousel = [
        {
            _id: 0,
            platformLogo: `/PrimeBlueLogo.png`,
            filmLogo: `/filmLogo1.png`,
            spanIcon: `#`,
            spanText: `#Nº1 en `,
            description: `Josh Safdie firma su primer trabajo en solitario como director de este apasionante filme sobre Marty Mauser (Timothée Chalamet), un joven con una ambición desmesurada, que está dispuesto a todo para cumplir su sueño. Con ayuda, entre otros, de la estrella de cine Carol Dunne (Gwyneth Paltrow) demostrará al mundo entero su grandeza.`,
            aPlay: true,
            aAdd: true,
            buttonInfo: true,
            infoLink: `https://www.primevideo.com/detail/0RPZS61STQAPSIGK74KNMJAYHK`
        },
        {
            _id: 1,
            platformLogo: `/PrimeBlueLogo.png`,
            filmLogo: `/filmLogo2.png`,
            spanIcon: `#`,
            spanText: `Nº1 en películas de drama`,
            description: `Josh Safdie firma su primer trabajo en solitario como director de este apasionante filme sobre Marty Mauser (Timothée Chalamet), un joven con una ambición desmesurada, que está dispuesto a todo para cumplir su sueño. Con ayuda, entre otros, de la estrella de cine Carol Dunne (Gwyneth Paltrow) demostrará al mundo entero su grandeza.`,
            aPlay: true,
            aAdd: true,
            buttonInfo: true,
            infoLink: `https://www.primevideo.com/detail/0RPZS61STQAPSIGK74KNMJAYHK`
        },
        {
            _id: 2,
            platformLogo: `/PrimeBlueLogo.png`,
            filmLogo: `/filmLogo2.png`,
            spanIcon: `#`,
            spanText: `Nº1 en películas de drama`,
            description: `Josh Safdie firma su primer trabajo en solitario como director de este apasionante filme sobre Marty Mauser (Timothée Chalamet), un joven con una ambición desmesurada, que está dispuesto a todo para cumplir su sueño. Con ayuda, entre otros, de la estrella de cine Carol Dunne (Gwyneth Paltrow) demostrará al mundo entero su grandeza.`,
            aPlay: true,
            aAdd: true,
            buttonInfo: true,
            infoLink: `https://www.primevideo.com/detail/0RPZS61STQAPSIGK74KNMJAYHK`
        }
    ]

    const [info, setInfo] = useState(0)


    const [imagen, setImg] = useState(0)

    const changeInfo = (index) => {

        setImg(index)
    }

    const nextImg = () => {
        setImg(current =>
            current >= Imagenes.length - 1
                ? 0
                : current + 1
        )
    }

    const prevImg = () => {
        setImg(current =>
            current <= 0
                ? Imagenes.length - 1
                : current - 1
        )
    }

    const navigate = useNavigate()

    const buscar = JSON.parse(localStorage.getItem('user')) || {}

    useEffect(() => {


        if (!buscar.password) {
            navigate("/LoginPasswordPage")
        }
    }, [navigate, buscar.password])

    return (
        <>
            <Header />
            <Searchbar />

            <div className="Intro-carousel">

                <div
                    className="Intro-carousel-wrapper"
                    style={{
                        width: `calc(${Imagenes.length} * 100%)`,
                        gridTemplateColumns: `repeat(${Imagenes.length}, 1fr)`,
                        transform: `translateX(calc((-100% / ${Imagenes.length}) * ${imagen}))`
                    }}
                >
                    {Imagenes.map((img, index) => (
                        <div key={img._id}>
                            <Imagen  {...img} />

                            <Infocarousel {...infoCarousel[index]} current={imagen} />

                        </div>

                    ))}




                </div>

                <div className="Intro-buttons">
                    <button onClick={nextImg} className="Button-next">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Back</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.578 3.099 C 15.424 3.176,14.455 4.124,11.255 7.329 C 7.474 11.115,7.124 11.476,7.065 11.657 C 6.983 11.906,6.983 12.094,7.065 12.343 C 7.124 12.524,7.474 12.885,11.255 16.671 C 14.023 19.443,15.433 20.827,15.540 20.879 C 15.790 21.000,15.999 21.018,16.265 20.940 C 16.581 20.849,16.844 20.590,16.936 20.283 C 17.016 20.013,17.016 19.949,16.937 19.677 C 16.875 19.466,16.775 19.362,13.147 15.730 L 9.421 12.000 13.129 8.290 C 16.006 5.411,16.855 4.540,16.917 4.400 C 17.022 4.168,17.025 3.799,16.925 3.578 C 16.834 3.377,16.518 3.094,16.325 3.041 C 16.070 2.970,15.793 2.992,15.578 3.099 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                    <button onClick={prevImg} className="Button-prev">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 3.054 C 7.416 3.147,7.160 3.395,7.061 3.729 C 6.985 3.987,6.985 4.053,7.063 4.323 C 7.125 4.534,7.225 4.638,10.853 8.270 L 14.579 12.000 10.871 15.710 C 7.994 18.589,7.145 19.460,7.083 19.600 C 6.984 19.819,6.975 20.182,7.062 20.391 C 7.144 20.587,7.381 20.831,7.580 20.924 C 7.818 21.034,8.175 21.025,8.422 20.901 C 8.576 20.824,9.545 19.876,12.745 16.671 C 16.526 12.885,16.876 12.524,16.935 12.343 C 17.017 12.094,17.017 11.906,16.935 11.657 C 16.876 11.476,16.528 11.117,12.768 7.353 C 9.951 4.532,8.609 3.214,8.483 3.147 C 8.252 3.024,7.992 2.990,7.758 3.054 " fill="white" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                </div>

            </div>

            <HeroCarousel />


        </>
    )
}

const Imagen = (props) => {

    const { src, alt } = props

    return (
        <img
            src={src}
            alt={alt}
            className="Intro-carousel-img"
        />
    )
}

const Infocarousel = (props) => {

    const {
        _id,
        current,
        platformLogo,
        filmLogo,
        spanIcon,
        spanText,
        description,
        aPlay,
        aAdd,
        buttonInfo,
        infoLink,

    } = props

    return (

        <div className={`Intro-carousel-info ${current === _id && 'isActive'}`}>

            <img
                src={platformLogo}
                alt="PlatLogo"
                className="Intro-platform-logo"
            />

            <img
                src={filmLogo}
                alt="FilmLogo"
                className="Intro-film-logo"
            />

            <div className="Intro-carousel-span">
                <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="50" role="img" aria-hidden="true"><title>Trending</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M13.218 4.099 C 16.677 4.634,19.365 7.335,19.907 10.820 C 20.001 11.424,20.001 12.586,19.908 13.186 C 19.500 15.808,17.827 18.074,15.469 19.200 C 12.651 20.546,9.381 20.165,6.956 18.209 C 6.318 17.694,5.515 16.768,5.150 16.126 L 5.040 15.933 5.986 15.145 L 6.933 14.356 7.936 15.352 C 9.009 16.417,9.121 16.499,9.500 16.499 C 9.917 16.499,9.865 16.544,12.530 13.886 L 15.000 11.421 15.000 12.281 C 15.000 12.753,15.019 13.207,15.042 13.289 C 15.103 13.509,15.315 13.762,15.531 13.874 C 15.932 14.080,16.390 14.012,16.700 13.702 C 17.003 13.399,17.000 13.429,17.000 11.000 C 17.000 8.573,17.003 8.601,16.701 8.299 C 16.399 7.997,16.428 8.000,13.998 8.000 C 11.670 8.000,11.664 8.000,11.374 8.222 C 11.301 8.277,11.192 8.408,11.131 8.511 C 11.036 8.672,11.020 8.744,11.020 9.000 C 11.020 9.256,11.036 9.328,11.131 9.489 C 11.192 9.592,11.301 9.723,11.374 9.778 C 11.633 9.975,11.781 10.000,12.715 10.000 L 13.580 10.000 11.541 12.039 L 9.502 14.078 8.521 13.105 C 7.668 12.259,7.514 12.123,7.343 12.066 C 7.234 12.030,7.080 12.000,7.000 12.000 C 6.673 12.000,6.526 12.095,5.384 13.046 C 4.775 13.554,4.267 13.960,4.256 13.949 C 4.245 13.938,4.201 13.760,4.160 13.554 C 3.646 11.005,4.426 8.346,6.240 6.465 C 7.605 5.049,9.374 4.206,11.360 4.025 C 11.705 3.993,12.823 4.038,13.218 4.099 " fill="#37f1a3" stroke="none" fillRule="evenodd"></path></svg></svg>

                <div className="Intro-carousel-span-text">
                    {spanText}
                </div>
            </div>

            <p className="Intro-description">
                {description}
            </p>

            <div className="Intro-carousel-buttons">

                {aPlay && (
                    <button className="Intro-button Intro-button--play">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Play</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.643 3.069 C 6.546 3.103,6.392 3.206,6.300 3.298 C 5.973 3.624,6.000 2.855,6.000 12.000 C 6.000 21.144,5.974 20.376,6.299 20.701 C 6.568 20.970,6.964 21.065,7.308 20.944 C 7.580 20.848,20.606 12.815,20.748 12.656 C 21.074 12.289,21.074 11.710,20.748 11.345 C 20.607 11.188,7.572 3.150,7.305 3.055 C 7.107 2.985,6.867 2.990,6.643 3.069 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                )}

                {aAdd && (
                    <button className="Intro-button Intro-button--add">
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Add</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </button>
                )}

                {buttonInfo && (
                    <a
                        href={infoLink}
                        className="Intro-a-info"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg className="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Info</title><svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M12.740 4.041 C 15.525 4.302,17.953 5.983,19.182 8.500 C 20.655 11.514,20.091 15.104,17.765 17.530 C 16.248 19.111,14.175 19.999,12.000 19.999 C 8.235 19.999,4.948 17.331,4.177 13.648 C 3.426 10.057,5.201 6.431,8.501 4.817 C 9.822 4.170,11.277 3.904,12.740 4.041 M11.000 8.000 L 11.000 9.000 12.000 9.000 L 13.000 9.000 13.000 8.000 L 13.000 7.000 12.000 7.000 L 11.000 7.000 11.000 8.000 M11.000 13.570 C 11.000 15.217,11.015 16.194,11.042 16.289 C 11.103 16.509,11.315 16.762,11.531 16.874 C 11.932 17.080,12.390 17.012,12.700 16.702 C 13.008 16.394,13.000 16.478,13.000 13.573 L 13.000 11.000 12.000 11.000 L 11.000 11.000 11.000 13.570 " fill="currentColor" stroke="none" fillRule="evenodd"></path></svg></svg>
                    </a>
                )}

            </div>

        </div>
    )
}



const Searchbar = () => {

    return (
        <div className="Search-bar-container">

            <form className="Search-bar-wrapper">

                <span className="Search-icon">
                <svg fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M9.360 2.025 C 7.466 2.198,5.790 2.960,4.446 4.259 C 3.730 4.951,3.257 5.602,2.817 6.500 C 1.479 9.228,1.809 12.458,3.674 14.900 C 3.949 15.260,4.616 15.933,5.000 16.239 C 6.430 17.378,8.196 17.999,10.000 17.999 C 11.567 17.999,13.170 17.508,14.465 16.632 L 14.911 16.331 17.645 19.066 C 19.449 20.870,20.434 21.828,20.540 21.879 C 20.942 22.074,21.370 22.002,21.686 21.686 C 22.002 21.370,22.074 20.942,21.879 20.540 C 21.828 20.434,20.870 19.449,19.066 17.645 L 16.331 14.911 16.632 14.465 C 18.219 12.120,18.436 9.087,17.200 6.529 C 16.809 5.718,16.392 5.120,15.761 4.464 C 14.541 3.195,12.996 2.388,11.240 2.100 C 10.865 2.039,9.711 1.992,9.360 2.025 M11.041 4.097 C 12.371 4.333,13.638 5.046,14.506 6.045 C 15.229 6.879,15.707 7.879,15.909 8.980 C 15.999 9.468,15.999 10.532,15.909 11.020 C 15.805 11.587,15.653 12.064,15.423 12.545 C 14.584 14.296,13.102 15.462,11.174 15.887 C 10.603 16.013,9.397 16.013,8.826 15.887 C 6.341 15.339,4.548 13.496,4.090 11.020 C 4.000 10.531,4.000 9.469,4.090 8.980 C 4.394 7.335,5.309 5.928,6.660 5.025 C 7.725 4.313,8.873 3.981,10.140 4.019 C 10.448 4.029,10.853 4.063,11.041 4.097 " fill="white" stroke="none" fillRule="evenodd"></path></svg>
                </span>
                <input type="search" id='Search-bar' placeholder='Buscar' />
                <button type='reset' className='Search-reset-button'> Borrar </button>

            </form>

        </div>
    )
}