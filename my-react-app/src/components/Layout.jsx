import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BackToTopButton from './BackToTopButton.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { applyLanguageToDocument } from '../i18n/languageUtils.js'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()

  useEffect(() => {
    // Wait until route content has been painted before scanning text nodes.
    const frame = window.requestAnimationFrame(() => applyLanguageToDocument(language))
    return () => window.cancelAnimationFrame(frame)
  }, [language, location.pathname])

  const handleGetStarted = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('home-contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate('/contact')
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900">
      <Navbar onGetStarted={handleGetStarted} />
      <main className="flex-1" key={language}>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
    </div>
  )
}

export default Layout

