import { Navigate } from 'react-router-dom'
import {PreviousPage} from '../src/pages/PreviousPage/Previouspage'
import {Introcarousel} from '../src/pages/Introcarousel/Introcarousel'

import { LoginUsers } from './pages/Login/Loginusers'
import { Registerusers } from './pages/Register/Registerusers'
import {LoginPasswordPage} from '../src/pages/Login/Loginpassword'
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
