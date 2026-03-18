import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { products, seo } from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'

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
      { threshold: 0.12, ...options }
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

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useScrollReveal()
  const transforms = {
    up:    visible ? 'translateY(0)' : 'translateY(48px)',
    down:  visible ? 'translateY(0)' : 'translateY(-48px)',
    left:  visible ? 'translateX(0)' : 'translateX(-52px)',
    right: visible ? 'translateX(0)' : 'translateX(52px)',
    fade:  'none',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Vegetables() {
  return (
    <>
      <Helmet>
        <title>{seo.products.title}</title>
        <meta name="description" content={seo.products.description} />
      </Helmet>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900">
        {/* Animated floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${40 + (i * 19) % 90}px`,
                height: `${40 + (i * 19) % 90}px`,
                left: `${(i * 27 + 5) % 100}%`,
                top: `${(i * 33 + 8) % 100}%`,
                animation: `floatOrb ${5 + (i % 4)}s ease-in-out infinite alternate`,
                animationDelay: `${(i * 0.4) % 3}s`,
              }}
            />
          ))}
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
          <Reveal direction="down" delay={0}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-300 mb-3">
              Products · Category
            </p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight">
              Vegetables
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-5 max-w-2xl text-base text-white/70 leading-relaxed">
              Onion, Tomatoes, Potato, Ginger, and Garlic managed for daily wholesale supply and
              export requirements with flexible lots and packing.
            </p>
          </Reveal>

          {/* Stat chips */}
          <Reveal direction="up" delay={300}>
            <div className="mt-10 flex flex-wrap gap-5">
              {[
                { value: 5,   suffix: '',   label: 'Vegetable Varieties' },
                { value: 365, suffix: '',   label: 'Days Available' },
                { value: 20,  suffix: '+',  label: 'Years Experience' },
                { value: 100, suffix: '%',  label: 'Quality Graded' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm px-5 py-4 text-center min-w-[110px]"
                >
                  <p className="text-2xl font-black text-white">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] text-white/55 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Wavy bottom edge */}
        <div className="relative">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="white" fillOpacity="0.05" />
            <path d="M0,40 C360,10 1080,50 1440,20 L1440,56 L0,56 Z" fill="rgb(248,250,252)" />
          </svg>
        </div>

        <style>{`
          @keyframes floatOrb {
            from { transform: translateY(0px) rotate(0deg); }
            to   { transform: translateY(-24px) rotate(8deg); }
          }
        `}</style>
      </div>

      <main className="bg-slate-50">

        {/* ── HIGHLIGHTS STRIP ── */}
        <section aria-label="Vegetable highlights" className="border-b border-emerald-50 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 md:justify-between">
              {[
                { icon: '🧅', label: 'Year-Round Supply',  desc: 'Consistent daily mandi-based stock' },
                { icon: '📦', label: 'Flexible Packing',   desc: 'Mesh bags, jute, crates & bulk lots' },
                { icon: '🌿', label: 'Fresh Grading',      desc: 'Sorted by size, freshness & quality' },
                { icon: '🚚', label: 'Wholesale & Export', desc: 'Local dispatch and export coordination' },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 90} direction="up">
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-xl shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS GRID ── */}
        <section
          aria-labelledby="vegetables-list-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <Reveal direction="up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              What We Handle
            </p>
            <h2
              id="vegetables-list-heading"
              className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Our Vegetable Catalog
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              Each vegetable is sourced, graded, and packed to meet daily wholesale and export buyer
              requirements. Request a quote for any item below.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.vegetables.map((product, i) => (
              <Reveal key={product.id} delay={i * 100} direction="up">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-700 px-8 py-10 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/5" />
              <div className="absolute right-32 bottom-4 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    Need a specific vegetable lot?
                  </h2>
                  <p className="mt-2 text-sm text-teal-100 max-w-md">
                    Get in touch with Rana Brothers for commission-based wholesale and export quotes
                    on all vegetables — with flexible lot sizes and packing options.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-800 shadow-md hover:bg-teal-50 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="https://wa.me/+923018424686"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 justify-center rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    ☎ WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
    </>
  )
}

export default Vegetables