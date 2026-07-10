import { NavLink, useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'
import { Cookies } from './Cookies'
import './Previouspage.css'


export const PreviousPage = () => {

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login/email')
    }

    /*const [flex, setFlex] = useState(true)

    const toggleFlex = () => {
        setFlex(prev => !prev)
    }*/

    const heroMiniGrid = [
        {
            id: 0,
            title: `Añade tus canales preferidos`,
            description: `Con Prime Video Channels, los suscriptores pueden suscribirse a canales premium y canales temáticos sin compromisos a largo plazo y sin necesidad de descargar aplicaciones. 
            La suscripción comienza con un periodo de prueba gratis. Puedes cancelar en cualquier momento.`,
            images: [
                `/PREMIUMplatform.jpg`,
                `/DAZNplatform.jpg`,
                `/MGCplatform.jpg`,
                `/MEZZOplatform.jpg`,
                `/OUTTVplatform.jpg`,
                `/HBOplatform.jpg`,
                `/FLIXplatform.jpg`,
                `/MUBIplatform.jpg`,
                `/AMCplatform.jpg`

            ],
            layout: "grid"
        },

        {
            id: 1, title: `Tienda de Prime Video`, description: `Aún más películas disponibles para alquilar o comprar, sin necesidad de suscribirse a Prime.`,
            images: [

                `/HeroMiniImg.jpg`

            ],
            layout: "single",
            button: `Comprar o alquilar películas`
        },

        {
            id: 2, title: `Descarga y disfruta`, description: `Disfruta de contenido sin conexión con la aplicación Prime Video cuando descargues títulos en tu iPhone, iPad, tablet o dispositivo Android..`,
            images: [

                `/Herominigrid2.jpg`

            ],
            layout: "single",
            button: `Empieza tu periodo de prueba de 30 días gratis*`
        }
    ]

    const heroBenefits = [
        {
            id: 0, img: `/HeroBenefitImg0.png`, title: `Ver en cualquier parte `, description: `Disfruta desde la web o con la aplicación de Prime Video en tu teléfono, 
        tablet o ciertos Smart TV en hasta 3 dispositivos al mismo tiempo.`},
        { id: 1, img: `/HeroBenefits1.png`, title: `X-Ray para disfrutar más`, description: `Usa X-Ray para películas y series. Podrás identificar actores y canciones, explorar biografías, ver curiosidades y mucho más.` },
        { id: 2, img: `/HeroBenefits2.png`, title: `Ahorro de datos`, description: `Controla el uso de datos mientras descargas y ves videos en ciertos teléfonos y tablets.` }
    ]



    return (
        <>

            <Header />
            <div className="Hero" style={{ position: `relative` }}>
                <HeroMaingrid goToLogin={goToLogin} />

            </div>
            <Herominigrid heroMiniGrid={heroMiniGrid} />
            <HeroBenefits heroBenefits={heroBenefits} />
            <Cookies />
            <Footer showLogo={true} className="Footer-dark" linkClassName='Footer-links' />

        </>
    )
}

const HeroMaingrid = () => {

    return (
        <div className="Hero-grid">

            <div className="Hero-grid-columns">

                <div className="Hero-column Hero-column--left">
                    <img src="/GridImgs.jpg" alt="films img" className='Hero-grid-img' />
                </div>
                <div className="Hero-column Hero-column--right">

                    <div className="Hero-column-info">
                        <h1 className="Hero-grid-h1"> Ve películas y series </h1>

                        <button className="Hero-button Hero-button--login">¿Eres cliente de Amazon? Identifícate </button>

                        <p className="Hero-column-p">
                            Suscríbete a Amazon Prime para ver películas y series populares,
                            incluidos títulos Amazon Original galardonados. Amazon Prime también
                            incluye la entrega rápida y gratis de millones de productos y más.
                        </p>

                        <button className="Hero-button Hero-button--sub">Empieza tu periodo de prueba de 30 días gratis* </button>

                        <div className="Hero-price-span">
                            *€ 49,90/año o € 4,99/mes una vez que finalice el periodo de prueba gratis.
                            <NavLink className="Hero-student-link" to="https://www.amazon.es/amazonprime?_encoding=UTF8&primeCampaignId=studentWlpPrimeRedir&ref=dvm_es_gc_mlp_st_unreclink">¿Eres estudiante?</NavLink>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

const Herominigrid = ({ heroMiniGrid }) => {

    return (
        <div className="Heromini-grid">
            {heroMiniGrid.map(hero => (
                <div className="Heromini-columns" key={hero.id}>

                    <div className="Heromini-column Heromini-column--left">
                        <h2 className="Heromini-h2"> {hero.title}</h2>
                        <p className="Heromini-p">{hero.description}</p>

                        {hero.button && (
                            <button className="Mini-grid-button"> {hero.button}</button>
                        )}
                    </div>

                    <div className="Heromini-column Heromini-column--right">
                        {hero.layout === "grid" ? (
                            <div className="Heromini-grid-images">
                                {hero.images.map((image, i) => (
                                    <img key={i} src={image} alt="platform img" className='Heromini-img' />
                                ))}
                            </div>
                        ) : (
                            <img src={hero.images[0]}
                                alt="platform"
                                className="Heromini-img-single" />
                        )}
                    </div>

                </div>
            ))}
        </div>
    )
}

const HeroBenefits = ({ heroBenefits }) => {

    return (

        <div className="Herobenefits">

            {heroBenefits.map(herobenefit =>

                <div className="Herobenefits-container" key={herobenefit.id}>

                    <div className="Herobenefits-info">
                        <img src={herobenefit.img} alt=" benefit img" className="Herobenefits-img" />
                        <h3 className="Herobenefits-h3"> {herobenefit.title}</h3>
                        <p className="Herobenefits-p">{herobenefit.description}</p>

                    </div>
                </div>
            )}
           
        </div>
    )
}

