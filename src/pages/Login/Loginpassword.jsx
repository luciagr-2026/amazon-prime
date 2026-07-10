import { useLocation, useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"
import './Loginpassword.css'


export const LoginPasswordPage = () => {

    return <LoginPassword />

}

export const LoginPassword = () => {


    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    const [openHelp, setOpenHelp] = useState(false)
    const [remember, setRemember] = useState(false)

    function changeArrow() {
        setOpenHelp(prev => !prev)
    }

    const location = useLocation()
    const email = location.state?.email; // State : Permite enviar datos entre páginas. 


    const [password, setPassword] = useState('')



    async function verifyPassword(e) {
        e.preventDefault()

        try {

            let options =

            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }

            const response = await fetch(`${API_URL}/users/login/password`, options)


            const data = await response.json()

            console.log(data)



            if (data.user) {
                navigate("/home")
                localStorage.setItem('user', JSON.stringify({ email, password: true }))
            } else {
                navigate("/login/email")
                console.log("Login incorrect")
            }

        }

        catch (error) {

            console.log(error)

        }
    }

    /* const goToIntroCarousel = () => {
         navigate("/Introcarousel")
     }*/




    return (


        <div className="Login-page-password">
            <div className="Login-block">
                <NavLink to="/home">  <img src="/BlackPrimeLogo.png" alt="Prime Logo" className="Login-logo-password" /> </NavLink>
                <form className="Login-form" onSubmit={verifyPassword}>
                    <h1 className="Login-password-h1"> Iniciar sesión </h1>

                    <div className="Login-chance-email">
                        <div className='Login-email-choice'> {email || "No email provided"} </div>

                        <NavLink to={"/login/email"} className="Login-email-change"> Cambiar </NavLink>

                    </div>



                    <div className="Login-span Login-span--row">
                        <div className="Login-span Login-span--word"> Contraseña </div>
                        <a href="#" className="Login-pass-a"> ¿Has olvidado la contraseña?</a>
                    </div>

                    <input type="password" name="user-password" className='Login-password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className="Login-button"> Iniciar sesión </button>

                    <div className="Login-check">

                        <div className="Login-checkbox">
                            <input type="checkbox" name='user-password' className='Login-checkbox' />
                            <label className='Login-label'>Recuérdame</label>
                        </div>

                        <div className="Login-fq">
                            <div className="Login-help">
                                <a href="#" className="Login-helping-a" onClick={() => setRemember(true)}>Detalles</a>

                                <img src="/UpArrow.png"
                                    alt="arrow"
                                    className={openHelp ? "Login-arrow Login-arrow--up Open" : "Login-arrow Login-arrow--up"}
                                    onClick={changeArrow}
                                    style={{ width: `1.125rem` }}
                                />

                                <img src="/DownArrow.png"
                                    alt="arrow"
                                    className={openHelp ? "Login-arrow Login-arrow--down Close" : "Login-arrow Login-arrow--down"}
                                    onClick={() => {changeArrow(), setRemember(true)}}
                                    style={{ width: `1.0625rem` }} />

                            </div>
                            <a href="#" className="Login-helping-pass">¿Has olvidado la contraseña?</a>

                        </div>


                    </div>

                    <button className="Login-new-account-button"> Iniciar sesión con una passkey </button>

                    <div className={`Login-remember-checkbox ${remember ? `Open` : ''}`}>
                        <div className="Login-remember-info">
                            <h3 className="Login-remember-h3">Casilla "Recuérdame"</h3>
                            <div className="Login-remember-exit" onClick={() => setRemember(false)} >X</div>
                        </div>
                        <p className="Login-remember-p">
                            Si seleccionas "Recuérdame", se reduce el número de veces que se te pedirá que te identifiques en este dispositivo.
                            <br />
                            Para mantener la seguridad de tu cuenta, utiliza esta opción sólo en tus dispositivos personales.</p>

                    </div>




                </form>





            </div>


            <div className="Login-footer-password">

                <div className="Login-terms">
                    <a href="https://www.primevideo.com/help/ref=av_auth_ter?nodeId=202064890" className="Login-terms-a">Términos y Aviso de privacidad</a>
                    <a href="https://www.amazon.es/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Feu.primevideo.com%2Fauth%2Freturn%2Fref%3Dav_auth_ap%3F_t%3D1sg4T4NPnipV0p4FTO8ElzklY7-piZZtceEcJMmtye300WAAAAAQAAAABqKWA4cmF3AAAAAPgWC9WfHH8iB-olH_E9xQ%26location%3D%2Fhelp%2Fcontact-us%3Fref_%253Datv_auth_red_aft&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_prime_video_sso_es&openid.mode=checkid_setup&countryCode=ES&siteState=260-4271467-9148958&language=es_ES&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0" className="Login-terms-a">Envíanos tus comentarios</a>
                    <a href="https://www.primevideo.com/help/ref=av_auth_hp" className="Login-terms-a">Ayuda</a>
                </div>

                <div className="Login-footer-span">© 1996-2026, Amazon.com, Inc. o sus afiliados</div>
            </div>

        </div>

    )

}