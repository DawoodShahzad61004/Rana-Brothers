import { useMemo, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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

/* ─── Animated category card ─── */
function CategoryCard({ to, emoji, title, description, count, delay }) {
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        style={{
          borderColor: hovered ? '#6ee7b7' : '#f0fdf4',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 16px 40px rgba(16,185,129,0.15)'
            : '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Accent bar */}
        <div
          className="mb-5 h-1 rounded-full bg-emerald-400"
          style={{
            width: hovered ? '100%' : '3rem',
            transition: 'width 0.5s ease',
          }}
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Category
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">{title}</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
          </div>
          <span
            className="text-4xl shrink-0"
            style={{
              transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.3s ease',
              display: 'inline-block',
            }}
          >
            {emoji}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {count} varieties
          </span>
          <span
            className="text-sm font-bold text-emerald-700"
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
              display: 'inline-block',
            }}
          >
            View {title} →
          </span>
        </div>
      </Link>
    </div>
  )
}

function Products() {
  const [query, setQuery] = useState('')
  const [filterAnim, setFilterAnim] = useState(false)
  const prevQuery = useRef('')

  const allProducts = useMemo(
    () => [...products.fruits, ...products.vegetables],
    [],
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts
    const q = query.toLowerCase()
    return allProducts.filter((p) => p.name.toLowerCase().includes(q))
  }, [allProducts, query])

  const handleSearch = (e) => {
    const val = e.target.value
    if (val !== prevQuery.current) {
      setFilterAnim(true)
      setTimeout(() => {
        setQuery(val)
        prevQuery.current = val
        setFilterAnim(false)
      }, 200)
    }
  }

  return (
    <>
      <Helmet>
        <title>{seo.products.title}</title>
        <meta name="description" content={seo.products.description} />
      </Helmet>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900">
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 mb-3">
              Rana Brothers
            </p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight">
              Products Catalog
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-5 max-w-2xl text-base text-white/70 leading-relaxed">
              Commission-based handling of all kinds of fruits and vegetables, with flexible lot
              sizes for wholesale and export buyers.
            </p>
          </Reveal>

          {/* Stat chips */}
          <Reveal direction="up" delay={300}>
            <div className="mt-10 flex flex-wrap gap-5">
              {[
                { value: 10,  suffix: '+', label: 'Total Products' },
                { value: 2,   suffix: '',  label: 'Categories' },
                { value: 15,  suffix: '+', label: 'Export Markets' },
                { value: 20,  suffix: '+', label: 'Years Experience' },
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

        {/* ── CATEGORY CARDS ── */}
        <section
          aria-labelledby="product-categories-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <Reveal direction="up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Browse by Category
            </p>
            <h2
              id="product-categories-heading"
              className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Two Categories, One Trusted Source
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              Select a category to explore individual product details, grading options, and packaging.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <CategoryCard
              to="/products/fruits"
              emoji="🍎"
              title="Fruits"
              description="Apple, Mango, Melon, Banana, Oranges – selected for both export and local markets."
              count={products.fruits.length}
              delay={100}
            />
            <CategoryCard
              to="/products/vegetables"
              emoji="🧅"
              title="Vegetables"
              description="Onion, Tomatoes, Potato, Ginger, Garlic – handled for wholesale and export lots."
              count={products.vegetables.length}
              delay={200}
            />
          </div>
        </section>

        {/* ── SEARCH & ALL PRODUCTS ── */}
        <section
          aria-labelledby="product-search-heading"
          className="border-t border-slate-100 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Full Catalog
                  </p>
                  <h2
                    id="product-search-heading"
                    className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
                  >
                    Search Products
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Filter fruits and vegetables by name and request a commission-based quote.
                  </p>
                </div>
                <div className="w-full max-w-xs shrink-0">
                  <label htmlFor="product-search" className="sr-only">
                    Search products by name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      🔍
                    </span>
                    <input
                      id="product-search"
                      type="search"
                      placeholder="Search by product name…"
                      defaultValue={query}
                      onChange={handleSearch}
                      className="w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Product grid with search fade-swap */}
            <div
              className="mt-10"
              style={{
                opacity: filterAnim ? 0 : 1,
                transform: filterAnim ? 'scale(0.98)' : 'scale(1)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {filtered.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((product, i) => (
                    <Reveal key={product.id} delay={i * 80} direction="up">
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal direction="up">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                    <span className="text-4xl mb-4">🔍</span>
                    <p className="text-sm font-semibold text-slate-700">No products found</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Try a different name such as Apple, Mango, Onion, or Potato.
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 px-8 py-10 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/5" />
              <div className="absolute right-32 bottom-4 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    Can't find what you're looking for?
                  </h2>
                  <p className="mt-2 text-sm text-emerald-100 max-w-md">
                    Rana Brothers handles a wide range of agri produce beyond this catalog. Get in
                    touch and our team will source, grade, and dispatch as per your requirements.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-md hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200"
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

export default Products