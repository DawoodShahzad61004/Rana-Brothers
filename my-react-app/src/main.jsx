import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './styles/layout.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter basename="/Rana-Brothers">
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
)
