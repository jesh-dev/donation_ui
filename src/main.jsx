import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext.jsx'
import { MessageProvider } from './Components/MessageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <MessageProvider>

      <App />
      </MessageProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
