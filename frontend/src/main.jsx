import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login                from './pages/Login.jsx'
import CreateAccount        from './pages/CreateAccount.jsx'

import './styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/"                 element={<Login />} />
            <Route path="/create-account"   element={<CreateAccount />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
