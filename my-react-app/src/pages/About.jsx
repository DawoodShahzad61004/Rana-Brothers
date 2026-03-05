import { Helmet } from 'react-helmet-async'
import { leadership, proofSections, seo } from '../data/siteData.js'
import ceoImage from '../assets/ceo.jpg'

function About() {
  return (
    <>
      <Helmet>
        <title>{seo.about.title}</title>
        <meta name="description" content={seo.about.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            About Rana Brothers
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Rana Brothers is a commission-based agri-supply and wholesale trading business focused on
            fruits and vegetables. Operating from Sabzi Mandi Badami Bagh, Lahore, the team manages
            sourcing, grading, packing, and dispatch for local and international buyers, ensuring
            transparent pricing and dependable execution.
          </p>
        </header>

        <section
          aria-labelledby="about-leadership-heading"
          className="mt-10 grid gap-8 md:grid-cols-[1fr,2fr] md:items-center"
        >
          <div className="flex justify-center">
            <figure className="w-full max-w-xs rounded-3xl border border-emerald-100 bg-white/80 p-4 shadow-soft">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-emerald-100 bg-slate-100">
                <img
                  src={ceoImage}
                  alt="CEO – Rana Imran"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <p className="text-sm font-semibold text-slate-900">
                  CEO – Rana Imran
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Chief Executive Officer, leading worldwide export of all kinds of fruits & vegetables.
                </p>
              </figcaption>
            </figure>
          </div>
          <div>
            <h2
              id="about-leadership-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Leadership Profile
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {leadership.ceo.message}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="about-chachu-heading"
          className="mt-12 grid gap-8 md:grid-cols-[3fr,2fr]"
        >
          <div>
            <h2
              id="about-chachu-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {leadership.chachuProfile.title}
            </h2>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              {leadership.chachuProfile.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {leadership.chachuProfile.body}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {leadership.chachuProfile.interviewNote}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Interview Video
            </h3>
            <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5">
              <iframe
                title="About Us – Interview Video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-proofs-heading"
          className="mt-12 border-t border-slate-100 pt-8"
        >
          <h2
            id="about-proofs-heading"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Titles & Proof of Roles
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Formal roles and representations that support market credibility and governance alignment.
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {proofSections.map((section) => (
              <article
                key={section.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-emerald-50 bg-white/90 p-4 shadow-sm"
              >
                <header>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="mt-1 text-xs text-slate-600">{section.subtitle}</p>
                  )}
                </header>
                <p className="mt-3 text-xs leading-relaxed text-slate-700">
                  {section.description}
                </p>
                <div className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-3 py-4 text-[11px] text-slate-500">
                  {section.imageAlt}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default About

