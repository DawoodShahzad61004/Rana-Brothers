import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  branding,
  homeContent,
  leadership,
  products,
  seo,
} from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'
import ceoImage from '../assets/ceo.jpeg'

/* ─── Scroll-reveal hook ─── */
function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useScrollReveal()
  const started = useRef(false)
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Hero Slider ─── */
const SLIDES = [
  {
    heading: 'Fresh From the Mandi',
    sub: 'Commission-based wholesale of all kinds of fruits & vegetables',
    bg: 'from-emerald-900 via-emerald-800 to-teal-900',
    accent: 'text-emerald-300',
  },
  {
    heading: 'Export-Ready Produce',
    sub: 'Grading, packing and international shipping coordination from Lahore',
    bg: 'from-teal-900 via-emerald-800 to-green-900',
    accent: 'text-teal-300',
  },
  {
    heading: 'Trusted Wholesale Partners',
    sub: '20+ years connecting growers, Sabzi Mandi, and global buyers',
    bg: 'from-green-900 via-teal-800 to-emerald-900',
    accent: 'text-green-300',
  },
]

function HeroSlider({ onExplore, onQuote }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 400)
  }, [animating])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % SLIDES.length
        setAnimating(true)
        setTimeout(() => setAnimating(false), 400)
        return next
      })
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = SLIDES[current]

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      style={{ minHeight: '520px' }}>

      {/* Animated background dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${30 + (i * 17) % 80}px`,
              height: `${30 + (i * 17) % 80}px`,
              left: `${(i * 23 + 5) % 100}%`,
              top: `${(i * 31 + 10) % 100}%`,
              animation: `floatDot ${4 + (i % 4)}s ease-in-out infinite alternate`,
              animationDelay: `${(i * 0.3) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal decorative lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div
        className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-10"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(16px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="md:w-3/5">
          <p className={`text-xs font-bold uppercase tracking-[0.25em] ${slide.accent} mb-3`}>
            Rana Brothers · Agri-supply & Commission Agents
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {slide.heading}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl leading-relaxed">
            {slide.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-900 shadow-lg hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Explore Products
              <span className="text-base">↓</span>
            </button>
            <button
              type="button"
              onClick={onQuote}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 hover:border-white/70 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Stats card */}
        <div className="md:w-2/5">
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm p-6 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">At a Glance</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years Active', value: 20, suffix: '+' },
                { label: 'Products Handled', value: 10, suffix: '+' },
                { label: 'Export Markets', value: 15, suffix: '+' },
                { label: 'Daily Tons', value: 50, suffix: 't+' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 p-4 text-center">
                  <p className="text-2xl font-black text-white">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] text-white/60 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" fillOpacity="0.04"/>
          <path d="M0,45 C480,15 960,55 1440,25 L1440,60 L0,60 Z" fill="white" fillOpacity="0.06"/>
        </svg>
      </div>

      <style>{`
        @keyframes floatDot {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useScrollReveal()
  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(48px)',
    left: visible ? 'translateX(0)' : 'translateX(-48px)',
    right: visible ? 'translateX(0)' : 'translateX(48px)',
    fade: 'none',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Home ─── */
function Home() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [filterAnim, setFilterAnim] = useState(false)
  const brandName = branding.useAlternate ? branding.alternateName : branding.primaryName
  const companyVideoSrc = `${import.meta.env.BASE_URL}video.mp4`

  const allProducts = [...products.fruits, ...products.vegetables]
  const filtered = activeFilter === 'all'
    ? allProducts.slice(0, 6)
    : activeFilter === 'fruits'
    ? products.fruits.slice(0, 6)
    : products.vegetables.slice(0, 6)

  const handleFilter = (f) => {
    if (f === activeFilter) return
    setFilterAnim(true)
    setTimeout(() => {
      setActiveFilter(f)
      setFilterAnim(false)
    }, 250)
  }

  const handleExploreProducts = () => {
    const el = document.getElementById('home-products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetQuote = () => navigate('/contact')

  return (
    <>
      <Helmet>
        <title>{seo.home.title}</title>
        <meta name="description" content={seo.home.description} />
      </Helmet>

      {/* ── HERO SLIDER ── */}
      <HeroSlider onExplore={handleExploreProducts} onQuote={handleGetQuote} />

      {/* ── CREDIBILITY STRIP ── */}
      <section className="border-b border-emerald-50 bg-emerald-700">
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-between">
            {homeContent.credibility.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} direction="up">
                <div className="flex items-center gap-3 text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">✓</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-white">{item.title}</p>
                    <p className="text-[11px] text-emerald-200 max-w-[160px]">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & VIDEO ── */}
      <section aria-labelledby="home-vision-heading"
        className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Our Vision</p>
            <h2 id="home-vision-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {homeContent.vision.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{homeContent.vision.body}</p>
            <div className="mt-6 flex gap-4">
              <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-center">
                <p className="text-2xl font-black text-emerald-700">
                  <AnimatedCounter target={20} suffix="+" />
                </p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wide">Years</p>
              </div>
              <div className="rounded-2xl bg-teal-50 px-5 py-4 text-center">
                <p className="text-2xl font-black text-teal-700">
                  <AnimatedCounter target={10} suffix="+" />
                </p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wide">Products</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-center">
                <p className="text-2xl font-black text-emerald-700">
                  <AnimatedCounter target={15} suffix="+" />
                </p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wide">Markets</p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-emerald-100/40 blur-xl" />
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                <video className="h-full w-full object-cover" controls preload="metadata">
                  <source src={companyVideoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CEO SECTION ── */}
      <section aria-labelledby="home-ceo-heading"
        className="bg-gradient-to-br from-slate-50 to-emerald-50/30 border-y border-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1fr,2fr] md:items-center">
            <Reveal direction="left">
              <figure className="mx-auto w-full max-w-xs">
                <div className="relative mx-auto w-40 h-40">
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-20" />
                  <div className="absolute -inset-2 rounded-full border-2 border-dashed border-emerald-300 animate-spin"
                    style={{ animationDuration: '12s' }} />
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl">
                    <img 
                      src={ceoImage} 
                      alt="CEO – Rana Imran" 
                      className="h-full w-full object-cover" 
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                </div>
                <figcaption className="mt-4 text-center">
                  <p className="font-bold text-slate-900">Rana Imran</p>
                  <p className="text-xs text-emerald-700 font-medium">Chief Executive</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">CEO Message</p>
              <h2 id="home-ceo-heading"
                className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">Leadership & Vision</h2>
              <blockquote className="mt-4 border-l-4 border-emerald-400 pl-5 text-sm leading-relaxed text-slate-700 italic">
                "{leadership.ceo.message}"
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MOTTO ── */}
      <Reveal direction="up">
        <section aria-labelledby="home-motto-heading"
          className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Company Motto</p>
          <h2 id="home-motto-heading" className="mt-2 text-xl font-bold text-slate-900">Our Guiding Principles</h2>
          <p className="mt-4 mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">{homeContent.mottos}</p>
        </section>
      </Reveal>

      {/* ── FEATURED PRODUCTS with filter tabs ── */}
      <section
        id="home-products"
        aria-labelledby="home-products-heading"
        className="mx-auto max-w-6xl px-4 pb-14 md:px-6 lg:px-8"
      >
        <Reveal direction="up">
          <div className="flex flex-col items-center text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">What We Handle</p>
            <h2 id="home-products-heading"
              className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Featured Products</h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl">
              Commission-based handling of key fruits and vegetables for wholesale and export buyers.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {[
              { key: 'all', label: 'All Products' },
              { key: 'fruits', label: 'Fruits' },
              { key: 'vegetables', label: 'Vegetables' },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => handleFilter(f.key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  activeFilter === f.key
                    ? 'bg-emerald-700 text-white shadow-md scale-105'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:border-emerald-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid with fade-swap animation */}
        <div
          style={{
            opacity: filterAnim ? 0 : 1,
            transform: filterAnim ? 'scale(0.97)' : 'scale(1)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 80} direction="up">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={200}>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-700 px-6 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              View Full Catalog →
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section aria-labelledby="home-testimonials-heading"
        className="bg-gradient-to-br from-emerald-700 to-teal-800 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">What Partners Say</p>
              <h2 id="home-testimonials-heading"
                className="mt-2 text-2xl font-bold text-white md:text-3xl">Testimonials</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {homeContent.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120} direction="up">
                <figure className="flex h-full flex-col justify-between rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm p-6 hover:bg-white/15 transition-colors duration-200">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <blockquote className="text-sm text-white/85 leading-relaxed flex-1">
                    "{t.message}"
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-400/30 flex items-center justify-center text-xs font-bold text-white">
                      {t.name[0]}
                    </div>
                    <span className="text-xs font-semibold text-emerald-200">{t.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section aria-labelledby="home-location-heading"
        className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.8fr)] md:items-start">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Find Us</p>
            <h2 id="home-location-heading"
              className="mt-2 text-2xl font-bold text-slate-900">Our Location</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Rana Brothers operates from Sabzi Mandi Badami Bagh, Ravi Link Road, Lahore. Use the map to
              confirm the exact market location and plan your visit or logistics.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { icon: '📍', text: 'Shop# 23 Sabzi Mandi Badami Bagh, Ravi Link Road, Lahore' },
                { icon: '📞', text: '03018424686 · 04237701368' },
                { icon: '✉️', text: 'ranabrothers323@gmail.com' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <iframe
                title="Rana Brothers location on Google Maps"
                src="https://www.google.com/maps?q=31.600778,74.308250&hl=en&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        id="home-contact"
        aria-labelledby="home-final-cta-heading"
        className="mx-auto max-w-6xl px-4 pb-14 md:px-6 lg:px-8"
      >
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 px-8 py-10 text-white shadow-xl">
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/5" />
            <div className="absolute right-32 bottom-4 h-20 w-20 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 id="home-final-cta-heading"
                  className="text-xl font-bold tracking-tight md:text-2xl">
                  Ready to work with Rana Brothers?
                </h2>
                <p className="mt-2 text-sm text-emerald-100 max-w-md">
                  Share your fruits and vegetables requirements, and our team will respond with a
                  commission-based quote and schedule.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleGetQuote}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-md hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-700"
                >
                  Contact Us
                </button>
                <a
                  href="https://wa.me/+923018424686"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 justify-center rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
                >
                  ☎ WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export default Home