import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { services, seo } from '../data/siteData.js'

function Services() {
  const navigate = useNavigate()

  const handleInquiry = (title) => {
    navigate('/contact', { state: { subject: `Inquiry about ${title}` } })
  }

  return (
    <>
      <Helmet>
        <title>{seo.services.title}</title>
        <meta name="description" content={seo.services.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Services
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Rana Brothers supports buyers with export & import coordination, logistics planning, and
            packaging solutions built around fruits and vegetables supply.
          </p>
        </header>

        <section
          aria-labelledby="services-list-heading"
          className="mt-8"
        >
          <h2
            id="services-list-heading"
            className="sr-only"
          >
            Services list
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="flex h-full flex-col justify-between rounded-2xl border border-emerald-50 bg-white/90 p-4 shadow-sm"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => handleInquiry(service.title)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Inquiry
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Services

