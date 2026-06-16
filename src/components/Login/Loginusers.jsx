import { NavLink, useNavigate } from 'react-router-dom'
import './Loginusers.css'
import { useState, createContext, useContext } from 'react'

export const LoginUsersContext = createContext()

export const LoginUsers = () => {

    const navigate = useNavigate()

    const { VITE_EXPRESS } = import.meta.env

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const goToRegister = () => {

        navigate('/Register')


    }



    async function verifyEmail(e) {
        
        e.preventDefault()

        try {

            let options =
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            }

            const response = await fetch(`${VITE_EXPRESS}/login/email`, options)


            const data = await response.json()

            console.log( data.user )

            if (data.user === 'true') {
                navigate("/LoginPasswordPage", { state: { email} })
                localStorage.setItem('user', JSON.stringify({ email: true }))
                console.log("Login correct")
            } else {
                navigate("/LoginUsers")
                console.log("Try a new email")
            }

        } catch (error) {

            console.log(error)

        }

    }




    return (





        <LoginUsersContext.Provider value={{ email, password, setEmail, setPassword, goToRegister }}>
            <>

                <LoginEmail
                    email={email}
                    setEmail={setEmail}
                    verifyEmail={verifyEmail}

                />


            </>

        </LoginUsersContext.Provider>
    )
}



const LoginEmail = ({ email, setEmail, verifyEmail }) => {

    const [openHelp, setOpenHelp] = useState(false)




    const { goToRegister } = useContext(LoginUsersContext)

    return (


        <div className="Login-page">
            <div className="Login-block">
                <NavLink to="/Introcarousel">  <img src="/BlackPrimeLogo.png" alt="Prime Logo" className="Login-logo" /> </NavLink>
                <form className="Login-form" onSubmit={verifyEmail}>
                    <h1 className="Login-h1"> Iniciar sesión </h1>
                    <div className="Login-span"> Introduce el número de teléfono móvil o el correo electrónico</div>


                    <input
                        type="email"
                        name="user-email"
                        className="Login-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="Login-button Login-button--continue"
                    >
                        Continuar
                    </button>


                    <div className="Login-p">
                        Al continuar, aceptas las <a href="#" className="Login-conditions">Condiciones de uso</a> de Amazon. Consulta
                        <a href="#" className="Login-privacy"> Aviso de privacidad, Aviso de cookies y Anuncios por intereses</a>
                    </div>


                    <div className="Login-fq">
                        <div className="Login-help" onClick={() => { setOpenHelp(!openHelp); setUpArrow(!upArrow) }}>
                            <a href="#" className="Login-helping-a">¿Necesitas ayuda?</a>
                            <img src="/UpArrow.png" alt="arrow" className={openHelp ? 'Login-arrow Login-arrow--up Open' : `Login-arrow Login-arrow--up `} style={{ width: `1.125rem` }} />
                            <img src="/DownArrow.png" alt="arrow" className={openHelp ? 'Login-arrow Login-arrow--down Close' : `Login-arrow Login-arrow--down`} style={{ width: `1.0625rem` }} />

                        </div>
                        <a href="#" className={`Login-helping-pass ${openHelp ? `Open` : ''}`}>¿Has olvidado la contraseña?</a>
                    </div>



                </form>


                <div className="Login-new-account-span">¿Eres nuevo en Amazon?</div>
                <button className="Login-new-account-button" onClick={goToRegister}> Crea tu cuenta de Amazon </button>

            </div>


            <div className="Login-footer">

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

