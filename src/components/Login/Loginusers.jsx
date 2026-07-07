import { NavLink, useNavigate } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
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


            const data = await response //response.json()?
            console.log(data)

            if (data.user) {
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
                        <div className="Login-help" onClick={() => { setOpenHelp(!openHelp)}}>
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


          <Footer/>

        </div>
    )


}

