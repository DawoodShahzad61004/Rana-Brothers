import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  branding,
  homeContent,
  leadership,
  products,
  seo,
} from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'
import ceoImage from '../assets/ceo.jpeg'

function Home() {
  const navigate = useNavigate()

  const companyVideoSrc = `${import.meta.env.BASE_URL}video.mp4`

  const handleExploreProducts = () => {
    const el = document.getElementById('home-products')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetQuote = () => {
    navigate('/contact')
  }

  const brandName = branding.useAlternate ? branding.alternateName : branding.primaryName

  return (
    <>
      <Helmet>
        <title>{seo.home.title}</title>
        <meta name="description" content={seo.home.description} />
      </Helmet>

      <div className="hero-gradient border-b border-emerald-50">
        <section
          aria-labelledby="home-hero-heading"
          className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:py-16 md:px-6 lg:px-8"
        >
          <div className="md:w-3/5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Agri-supply & commission agents
            </p>
            <h1
              id="home-hero-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {brandName}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-emerald-700">
              {homeContent.hero.subheading}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              {homeContent.hero.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExploreProducts}
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                Explore Products
              </button>
              <button
                type="button"
                onClick={handleGetQuote}
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                Get Quote
              </button>
            </div>
            <dl className="mt-6 flex flex-wrap gap-6 text-xs text-slate-600">
              <div>
                <dt className="font-semibold text-slate-800">
                  {branding.yearsOfExcellence}+ years
                </dt>
                <dd className="mt-1 max-w-[12rem]">Commission-based agri-supply experience</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-800">Fruits & vegetables</dt>
                <dd className="mt-1 max-w-[12rem]">All kinds handled from Sabzi Mandi Badami Bagh</dd>
              </div>
            </dl>
          </div>
          <div className="md:w-2/5">
            <div className="rounded-3xl border border-emerald-100 bg-white/80 p-4 shadow-soft">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Commission-based wholesale trading
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Importer, exporter & commission agents, wholesale traders connecting growers,
                Sabzi Mandi, and international buyers.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                {homeContent.credibility.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-emerald-50 bg-emerald-50/40 p-3"
                  >
                    <p className="font-semibold text-emerald-800">{item.title}</p>
                    <p className="mt-1 text-[11px] text-emerald-900/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="home-vision-heading"
        className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8"
      >
        <div className="grid gap-8 md:grid-cols-[2fr,3fr] md:items-start">
          <div>
            <h2
              id="home-vision-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              {homeContent.vision.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {homeContent.vision.body}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Company Video
            </h3>
            <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5">
              <video
                className="h-full w-full object-cover"
                controls
                preload="metadata"
              >
                <source src={companyVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-motto-heading"
        className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8"
      >
        <h2
          id="home-motto-heading"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
        >
          Company Motto
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700">
          {homeContent.mottos}
        </p>
      </section>

      <section
        aria-labelledby="home-ceo-heading"
        className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8"
      >
        <div className="grid gap-8 md:grid-cols-[1fr,2fr] md:items-center">
          <div className="flex justify-center">
            <figure className="w-full max-w-xs rounded-3xl border border-emerald-100 bg-white/80 p-4 text-center shadow-soft">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-emerald-100 bg-slate-100">
                <img
                  src={ceoImage}
                  alt="CEO – Rana Imran"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-semibold text-slate-900">CEO – Rana Imran</p>
                <p className="mt-1 text-xs text-slate-600">
                  Leading worldwide exports of all kinds of fruits & vegetables.
                </p>
              </figcaption>
            </figure>
          </div>
          <div>
            <h2
              id="home-ceo-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              CEO Message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{leadership.ceo.message}</p>
          </div>
        </div>
      </section>

      <section
        id="home-products"
        aria-labelledby="home-products-heading"
        className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="home-products-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Preview of key fruits and vegetables handled under commission-based trading.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white md:mt-0"
          >
            View Full Products Catalog
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.fruits.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.vegetables.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-testimonials-heading"
        className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8"
      >
        <h2
          id="home-testimonials-heading"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
        >
          Testimonials
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Selected feedback from wholesale, export, and retail partners.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {homeContent.testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-emerald-50 bg-white/90 p-4 shadow-sm"
            >
              <blockquote className="text-sm text-slate-700">
                “{testimonial.message}”
              </blockquote>
              <figcaption className="mt-3 text-xs font-medium text-slate-600">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-location-heading"
        className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.8fr)] md:items-start">
          <div>
            <h2
              id="home-location-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Location
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Rana Brothers operates from Sabzi Mandi Badami Bagh, Ravi Link Road, Lahore. Use the
              map to confirm the exact market location and plan your visit or logistics.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <iframe
              title="Rana Brothers location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27225.754514221108!2d74.299!3d31.592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903a3f8f2c8d7%3A0x7b3a1a5ddfba5c2b!2sSabzi%20Mandi%20Badami%20Bagh!5e0!3m2!1sen!2sPK!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section
        id="home-contact"
        aria-labelledby="home-final-cta-heading"
        className="mx-auto max-w-6xl px-4 pb-12 md:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-6 text-white shadow-soft md:px-8 md:py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2
                id="home-final-cta-heading"
                className="text-base font-semibold tracking-tight md:text-lg"
              >
                Ready to work with Rana Brothers?
              </h2>
              <p className="mt-2 text-sm text-emerald-50">
                Share your fruits and vegetables requirements, and our team will respond with a
                commission-based quote and schedule.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGetQuote}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-700"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

