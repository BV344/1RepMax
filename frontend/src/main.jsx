import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login                from './pages/Login.jsx'
import CreateAccount        from './pages/CreateAccount.jsx'
import Home                 from './pages/Home.jsx'
import ProtectedRoute       from './components/auth/ProtectedRoute.jsx'
import { AuthProvider }     from './context/AuthContext.jsx'

import './styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/"                 element={<Login />} />
              <Route path="/create-account"   element={<CreateAccount />} />
              <Route
                path="/home"
                element={(
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                )}
              />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
