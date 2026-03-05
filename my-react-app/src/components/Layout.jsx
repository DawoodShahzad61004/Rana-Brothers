import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BackToTopButton from './BackToTopButton.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

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
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
    </div>
  )
}

export default Layout

