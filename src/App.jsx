import { Navigate } from 'react-router-dom'
import { PreviousPage } from '../src/pages/PreviousPage/Previouspage'
import { Introcarousel } from '../src/pages/Introcarousel/Introcarousel'

import { LoginUsers } from './pages/Login/Loginusers'
import { Registerusers } from './pages/Register/Registerusers'
import { LoginPasswordPage } from '../src/pages/Login/Loginpassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (


    <BrowserRouter>

      <main>

        <Routes>

          <Route path="/" element={<Navigate to="/home_signout" />} />
          <Route path='/home_signout' element={<PreviousPage />} />
          <Route path='/register' element={<Registerusers />} />
          <Route path='/login/email' element={<LoginUsers />} />
          <Route path='/login/password' element={<LoginPasswordPage />} />
          <Route path='/home' element={<Introcarousel />} />
        </Routes>


      </main>



    </BrowserRouter>

  )
}

export default App
