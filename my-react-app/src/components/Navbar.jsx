import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { branding, navigation } from '../data/siteData.js'
import logo from '../assets/logo.png'

const activeClass = 'text-brand-primary'

function Navbar({ onGetStarted }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  const brandName = branding.useAlternate ? branding.alternateName : branding.primaryName

  const toggleMobile = () => setMobileOpen((open) => !open)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Rana Brothers logo"
            className="h-10 w-10 rounded-full border border-emerald-100 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {brandName}
            </span>
            <span className="text-xs text-slate-500">
              {branding.yearsOfExcellence}+ years of excellence
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleMobile}
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-primary md:hidden"
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {navigation.main.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 ${
                        isActive ? activeClass : 'hover:text-emerald-700'
                      }`
                    }
                  >
                    {item.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </NavLink>
                  {productsOpen && (
                    <div className="absolute left-0 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-lg">
                      <ul className="py-1 text-sm text-slate-700">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `block px-3 py-1.5 ${
                                  isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${isActive ? activeClass : 'hover:text-emerald-700'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm font-medium text-slate-700">
            {navigation.main.map((item) =>
              item.children ? (
                <div key={item.label} className="flex flex-col gap-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${isActive ? activeClass : 'hover:text-emerald-700'}`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                  <div className="ml-3 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.path}
                        className={({ isActive }) =>
                          `${isActive ? activeClass : 'hover:text-emerald-700'}`
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? activeClass : 'hover:text-emerald-700'}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                onGetStarted()
              }}
              className="mt-2 w-full rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

