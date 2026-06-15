import { Navigate } from 'react-router-dom'
import { PreviousPage } from './components/PreviousPage/Previouspage'
import { Introcarousel } from './components/Introcarousel'

import { LoginUsers } from './components/Login/Loginusers'
import { Registerusers } from './components/Register/Registerusers'
import {LoginPasswordPage} from './components/Login/Loginpassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  
  return (
  

      <BrowserRouter>

          <main>

            <Routes>
              <Route path="/" element={<Navigate to="/PreviousPage" />} />
              <Route path='/PreviousPage' element={<PreviousPage/>}/>
              <Route path='/LoginUsers' element={<LoginUsers/>} />
              <Route path='/LoginPasswordPage' element={<LoginPasswordPage />} />
              <Route path='/Register' element={<Registerusers/>} />
              <Route path='/Introcarousel' element={<Introcarousel />} />
            </Routes>


          </main>


      
      </BrowserRouter>
  
  )
}

export default App
