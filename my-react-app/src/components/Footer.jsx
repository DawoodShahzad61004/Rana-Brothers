import { Link } from 'react-router-dom'
import { branding, navigation, contactInfo } from '../data/siteData.js'

function Footer() {
  const brandName = branding.useAlternate ? branding.alternateName : branding.primaryName

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:justify-between md:px-6 lg:px-8">
        <div className="max-w-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            {brandName}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{branding.tagline}</p>
          <p className="mt-3 text-xs text-slate-500">
            Based in Sabzi Mandi Badami Bagh, Lahore – serving wholesale and export buyers with
            commission-based fruits and vegetables trading.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap gap-8 text-sm">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sitemap
            </h3>
            <ul className="mt-3 space-y-1.5">
              {navigation.main.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-slate-600 hover:text-emerald-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contact
            </h3>
            <ul className="mt-3 space-y-1.5 text-slate-600">
              <li className="space-y-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-semibold">Phone:</span>
                  <span className="font-semibold text-slate-900">Rana Imran</span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="font-medium text-emerald-800 hover:text-emerald-900"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pl-[3.15rem]">
                  <span className="font-semibold text-slate-900">Azmat Hussain</span>
                  <a
                    href="tel:03003304300"
                    className="font-medium text-emerald-800 hover:text-emerald-900"
                  >
                    03003304300
                  </a>
                </div>
              </li>
              <li>
                <span className="font-semibold">PTCL:</span> {contactInfo.ptcl}
              </li>
              <li>
                <span className="font-semibold">Email:</span> {contactInfo.email}
              </li>
              <li>
                <span className="font-semibold">Address:</span> {contactInfo.address}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 md:px-6 lg:px-8">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

