import './Footer.css'


export const Footer = ({showLogo = false, className="", linkClassName=""}) => {
    



    return (



        <div className={`Login-footer ${className}`}>

            {showLogo && (
                <img src="/FooterLogo.png" alt="prime logo" className="Footer-logo" />

            )}


            <div className="Login-terms">
                <a href="https://www.primevideo.com/help/ref=av_auth_ter?nodeId=202064890" className={`Login-terms-a ${linkClassName}`}>Términos y Aviso de privacidad</a>
                <a href="https://www.amazon.es/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Feu.primevideo.com%2Fauth%2Freturn%2Fref%3Dav_auth_ap%3F_t%3D1sg4T4NPnipV0p4FTO8ElzklY7-piZZtceEcJMmtye300WAAAAAQAAAABqKWA4cmF3AAAAAPgWC9WfHH8iB-olH_E9xQ%26location%3D%2Fhelp%2Fcontact-us%3Fref_%253Datv_auth_red_aft&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_prime_video_sso_es&openid.mode=checkid_setup&countryCode=ES&siteState=260-4271467-9148958&language=es_ES&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0" className={`Login-terms-a ${linkClassName}`}>Envíanos tus comentarios</a>
                <a href="https://www.primevideo.com/help/ref=av_auth_hp" className={`Login-terms-a ${linkClassName}`}>Ayuda</a>
            </div>

            <div className="Login-footer-span">© 1996-2026, Amazon.com, Inc. o sus afiliados</div>
        </div>


    )
}