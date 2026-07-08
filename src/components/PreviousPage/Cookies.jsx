import { useState } from "react"


export function Cookies() {

    const [closeCookies, setCloseCookies] = useState(false)

    function closingCookies() {
        setCloseCookies(true)
    }

    const handleAccept = () => {
        localStorage.setItem('cookies', 'accepted')
    }

    const handleReject = () => {
        localStorage.setItem('cookies', 'rejected')
    }
    return (

        <div className={`Cookies-container ${closeCookies ? 'isClose' : ''}`} >
            <div className="Cookies-text">
                <h2 className="Cookies-h2"> Selecciona tus preferencias de cookies </h2>
                <p className="Cookies-description">
                    Utilizamos cookies y herramientas similares que son necesarias para poder mejorar tus experiencias en servicios de video de Amazon, comprar y proporcionar nuestros servicios, como se detalla en nuestro 
                    <a
                        href="https://www.primevideo.com/help/ref=atv_hp_nd_nav?nodeId=GZVH7DTWNBGPRPDS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Cookies-a"
                    > Aviso de cookies </a>
                    También utilizamos estas cookies para comprender cómo los clientes usan nuestros servicios (por ejemplo, midiendo las visitas a nuestro servicio) para poder efectuar mejoras.

                    Si estás de acuerdo, también usaremos cookies para complementar tu experiencia de visualización en los servicios de video de Amazon, como se describe en nuestro Aviso de cookies. Es incluye el uso de cookies de anuncios propias y de terceros en este servicio. Las cookies almacenan o acceden a información estándar del dispositivo, como un identificador único.
                    <a
                        href="https://www.primevideo.com/region/eu/privacyprefs/primevideo/partners"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Cookies-a"
                    > Los 103 terceros </a> utilizan cookies en este servicio con el fin de mostrar y medir anuncios personalizados, generar información sobre los usuarios, desarrollar produchrefs y mejorarlos.

                    Para obtener más información sobre cómo y con qué fines Amazon usa la información personal (como el hishrefrial de pedidos de la tienda de Amazon y el hishrefrial de visualización de Prime Video) y las cookies con finalidades de publicidad, consulta nuestro
                    <a
                        href="https://www.primevideo.com/region/eu/help/ref=atv_hp_nd_cnt?nodeId=202064890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Cookies-a"
                    >  Aviso de privacidad</a> y nuestro 
                     <a
                        href="https://www.primevideo.com/help/ref=atv_hp_nd_nav?nodeId=GZVH7DTWNBGPRPDS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Cookies-a"
                    > Aviso de cookies. </a>

                    Haz clic en Rechazar para no aceptarlo o en Personalizar para especificar más tus opciones de anuncios u obtener más información sobre cómo cambiarlas.
                </p>

                <div className="Cookies-links">
                    <div className="Cookies-link"
                        onClick={() => {
                            closingCookies();
                            handleAccept();
                        }}
                    >Aceptar</div>
                    <div className="Cookies-link"
                        onClick={() => {
                            closingCookies();
                            handleReject();
                        }}
                    >Denegar</div>
                    <div className="Cookies-link" onClick={closingCookies} >X</div>
                </div>
            </div>
        </div>

    )
}