import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { services, seo } from '../data/siteData.js'

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

/* ─── Service icons map ─── */
const SERVICE_META = {
  'export-import':      { icon: '🌍', color: 'from-emerald-500 to-teal-500' },
  'logistics-support':  { icon: '🚚', color: 'from-teal-500 to-green-500' },
  'packaging-services': { icon: '📦', color: 'from-green-500 to-emerald-500' },
}

/* ─── Animated service card ─── */
function ServiceCard({ service, onInquiry, delay }) {
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useScrollReveal()
  const meta = SERVICE_META[service.id] || { icon: '⭐', color: 'from-emerald-500 to-teal-500' }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-full flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm"
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

        {/* Icon */}
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-2xl shadow-md`}
          style={{
            transform: hovered ? 'scale(1.15) rotate(-6deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          {meta.icon}
        </div>

        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900">{service.title}</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.description}</p>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => onInquiry(service.title)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Make an Inquiry
            <span
              style={{
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
                display: 'inline-block',
              }}
            >
              →
            </span>
          </button>
        </div>
      </article>
    </div>
  )
}

function Services() {
  const navigate = useNavigate()

  const handleInquiry = (title) => {
    navigate('/contact', { state: { subject: `Inquiry about ${title}` } })
  }

  const whyUs = [
    { icon: '🤝', title: 'Commission-Based',  desc: 'Transparent fees with no hidden charges on any transaction.' },
    { icon: '⚡', title: 'Fast Turnaround',   desc: 'Quick responses and time-bound dispatches from Sabzi Mandi.' },
    { icon: '🌿', title: 'Quality First',     desc: 'Strict grading and freshness checks at every stage.' },
    { icon: '🌍', title: 'Global Network',    desc: 'Established connections with buyers across export markets.' },
  ]

  return (
    <>
      <Helmet>
        <title>{seo.services.title}</title>
        <meta name="description" content={seo.services.description} />
      </Helmet>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900">
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
              Rana Brothers
            </p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight">
              Our Services
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-5 max-w-2xl text-base text-white/70 leading-relaxed">
              Rana Brothers supports buyers with export & import coordination, logistics planning,
              and packaging solutions built around fruits and vegetables supply.
            </p>
          </Reveal>

          {/* Stat chips */}
          <Reveal direction="up" delay={300}>
            <div className="mt-10 flex flex-wrap gap-5">
              {[
                { value: 3,  suffix: '',  label: 'Core Services' },
                { value: 20, suffix: '+', label: 'Years Experience' },
                { value: 15, suffix: '+', label: 'Export Markets' },
                { value: 100, suffix: '%', label: 'Client Focused' },
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

        {/* ── SERVICES GRID ── */}
        <section
          aria-labelledby="services-list-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <Reveal direction="up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              What We Offer
            </p>
            <h2
              id="services-list-heading"
              className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
            >
              End-to-End Agri Solutions
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              From sourcing at Sabzi Mandi Badami Bagh to international delivery — every step
              coordinated by our experienced team.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                onInquiry={handleInquiry}
                delay={i * 120}
              />
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          aria-labelledby="how-it-works-heading"
          className="border-t border-slate-100 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Our Process
                </p>
                <h2
                  id="how-it-works-heading"
                  className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
                >
                  How It Works
                </h2>
                <p className="mt-3 mx-auto max-w-xl text-sm text-slate-600">
                  A simple, transparent process from first inquiry to final delivery.
                </p>
              </div>
            </Reveal>

            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="absolute top-8 left-0 right-0 hidden h-0.5 bg-emerald-100 md:block" style={{ zIndex: 0 }} />

              <div className="relative grid gap-8 md:grid-cols-4" style={{ zIndex: 1 }}>
                {[
                  { step: '01', title: 'Inquiry',    desc: 'Contact us with your product requirements and quantity.',       icon: '💬' },
                  { step: '02', title: 'Sourcing',   desc: 'We source and grade from Sabzi Mandi and trusted growers.',     icon: '🌿' },
                  { step: '03', title: 'Packing',    desc: 'Packed to your spec — cartons, bags, or export-ready boxes.',   icon: '📦' },
                  { step: '04', title: 'Dispatch',   desc: 'Time-bound delivery to local or international destinations.',   icon: '🚚' },
                ].map((item, i) => (
                  <Reveal key={item.step} delay={i * 130} direction="up">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-100 bg-white shadow-md text-2xl">
                        {item.icon}
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-black text-white shadow">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-[160px]">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section aria-labelledby="why-us-heading" className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Why Rana Brothers
              </p>
              <h2
                id="why-us-heading"
                className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
              >
                What Sets Us Apart
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 100} direction="up">
                <WhyCard icon={item.icon} title={item.title} desc={item.desc} />
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
                    Ready to get started?
                  </h2>
                  <p className="mt-2 text-sm text-teal-100 max-w-md">
                    Reach out to Rana Brothers for any export, import, logistics, or packaging
                    inquiry. Our team responds quickly with a transparent, commission-based plan.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-800 shadow-md hover:bg-teal-50 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Contact Us
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

/* ─── Why card with hover ─── */
function WhyCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border bg-white p-5 cursor-default"
      style={{
        borderColor: hovered ? '#6ee7b7' : '#f0fdf4',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(16,185,129,0.12)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl"
        style={{
          transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
      >
        {icon}
      </div>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

export default Services