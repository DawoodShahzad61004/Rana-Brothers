import { useEffect, useState } from 'react'

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-40 rounded-full bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  )
}

export default BackToTopButton

