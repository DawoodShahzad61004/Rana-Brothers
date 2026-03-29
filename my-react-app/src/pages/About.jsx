import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { leadership, proofSections, seo } from '../data/siteData.js'
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

/* ─── Lightbox ─── */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lbIn 0.25s ease' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image"
          className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg text-lg font-bold hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>
        <p className="mt-3 text-center text-sm text-white/70">{alt}</p>
      </div>
      <style>{`
        @keyframes lbIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ─── Proof card with flip-on-hover ─── */
function ProofCard({ section, delay }) {
  const [ref, visible] = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {lightboxOpen && section.imageSrc && (
        <Lightbox
          src={section.imageSrc}
          alt={section.imageAlt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-full flex-col justify-between rounded-2xl border bg-white/90 p-5 shadow-sm cursor-default"
        style={{
          borderColor: hovered ? '#6ee7b7' : '#f0fdf4',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 16px 40px rgba(16,185,129,0.15)'
            : '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Top accent bar */}
        <div
          className="mb-4 h-1 w-12 rounded-full bg-emerald-400"
          style={{
            width: hovered ? '100%' : '3rem',
            transition: 'width 0.5s ease',
          }}
        />
        <header>
          <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
          {section.subtitle && (
            <p className="mt-1 text-xs text-emerald-700 font-medium">{section.subtitle}</p>
          )}
        </header>
        <p className="mt-3 text-xs leading-relaxed text-slate-600">{section.description}</p>
        {section.imageSrc && (
          <figure className="mt-4 overflow-hidden rounded-xl border border-slate-100">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative block w-full group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-xl"
              aria-label={`View full image: ${section.imageAlt}`}
            >
              <img
                src={section.imageSrc}
                alt={section.imageAlt}
                className="h-44 w-full object-cover"
                loading="lazy"
                style={{
                  transform: hovered ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Zoom overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 group-hover:bg-black/25 transition-colors duration-300">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg text-lg">
                  🔍
                </span>
              </div>
            </button>
          </figure>
        )}
      </article>
    </div>
  )
}

/* ─── About ─── */
function About() {
  const interviewVideoSrc = `${import.meta.env.BASE_URL}interview.mp4`

  const values = [
    { icon: '🤝', label: 'Integrity', desc: 'Transparent commission-based dealings with every partner.' },
    { icon: '🌿', label: 'Freshness', desc: 'Strict grading and quality checks from sourcing to dispatch.' },
    { icon: '📦', label: 'Reliability', desc: 'On-time deliveries aligned with market schedules.' },
    { icon: '🌍', label: 'Global Reach', desc: 'Export-ready produce for international buyers.' },
  ]

  return (
    <>
      <Helmet>
        <title>{seo.about.title}</title>
        <meta name="description" content={seo.about.description} />
      </Helmet>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
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
              Who We Are
            </p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight">
              About Rana Brothers
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-5 max-w-2xl text-base text-white/70 leading-relaxed">
              A commission-based agri-supply and wholesale trading business focused on fruits and
              vegetables. Operating from Sabzi Mandi Badami Bagh, Lahore — managing sourcing,
              grading, packing, and dispatch for local and international buyers.
            </p>
          </Reveal>

          {/* Animated stat strip */}
          <Reveal direction="up" delay={300}>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { value: 20, suffix: '+', label: 'Years of Excellence' },
                { value: 10, suffix: '+', label: 'Products Handled' },
                { value: 15, suffix: '+', label: 'Export Markets' },
                { value: 3,  suffix: '',  label: 'Leadership Roles' },
              ].map((s) => (
                <div key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm px-5 py-4 text-center min-w-[110px]">
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
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="white" fillOpacity="0.05"/>
            <path d="M0,40 C360,10 1080,50 1440,20 L1440,56 L0,56 Z" fill="rgb(248,250,252)"/>
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

        {/* ── COMPANY VALUES STRIP ── */}
        <section aria-label="Company values" className="border-b border-emerald-50 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
            <Reveal direction="up">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 text-center mb-8">
                Our Core Values
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.label} delay={i * 100} direction="up">
                  <ValueCard icon={v.icon} label={v.label} desc={v.desc} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CEO / LEADERSHIP ── */}
        <section
          aria-labelledby="about-leadership-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <div className="grid gap-12 md:grid-cols-[1fr,2fr] md:items-center">
            <Reveal direction="left">
              <div className="flex flex-col items-center">
                {/* Animated CEO photo */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-20"
                    style={{ animationDuration: '2.5s' }}
                  />
                  <div
                    className="absolute -inset-4 rounded-full border-2 border-dashed border-emerald-300"
                    style={{ animation: 'spin 14s linear infinite' }}
                  />
                  <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-2xl ring-4 ring-emerald-100">
                    <img
                      src={ceoImage}
                      alt="CEO – Rana Imran"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: 'center 35%' }}
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-700 px-3 py-1 text-[10px] font-bold text-white shadow-md">
                    CEO & Founder
                  </div>
                </div>
                <p className="mt-6 text-base font-bold text-slate-900">Rana Imran</p>
                <p className="text-xs text-emerald-700 font-medium">Chief Executive Officer</p>
                <p className="mt-2 text-[11px] text-slate-500 text-center max-w-[220px]">
                  Leading worldwide export of all kinds of fruits & vegetables.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Leadership Profile
              </p>
              <h2 id="about-leadership-heading"
                className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                20+ Years of Agri Excellence
              </h2>
              <blockquote className="mt-5 border-l-4 border-emerald-400 pl-5 text-sm leading-relaxed text-slate-700 italic">
                "{leadership.ceo.message}"
              </blockquote>

              {/* Key points */}
              <ul className="mt-6 space-y-3">
                {[
                  'Commission-based trading of all kinds of fruits and vegetables',
                  'Sourcing at Sabzi Mandi Badami Bagh, Lahore',
                  'Export-ready packing and international shipping coordination',
                  'Transparent pricing and dependable market execution',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── ABOUT US + INTERVIEW VIDEO ── */}
        <section
          aria-labelledby="about-chachu-heading"
          className="border-t border-slate-100 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-start">
              <Reveal direction="left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  {leadership.chachuProfile.title}
                </p>
                <h2 id="about-chachu-heading"
                  className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                  Market Experience & Insight
                </h2>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {leadership.chachuProfile.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {leadership.chachuProfile.body}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {leadership.chachuProfile.interviewNote}
                </p>

                {/* Timeline-style highlights */}
                <div className="mt-8 relative pl-5 border-l-2 border-emerald-200 space-y-6">
                  {[
                    { year: '2000s', text: 'Founded operations at Sabzi Mandi Badami Bagh, Lahore.' },
                    { year: '2010s', text: 'Expanded to export coordination for Middle East & international buyers.' },
                    { year: '2020s', text: 'Appointed to Price Control Council & General Secretary of Anjaman Aahrtiaan.' },
                  ].map((item, i) => (
                    <Reveal key={i} delay={i * 120} direction="left">
                      <div className="relative">
                        <div className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full border-2 border-emerald-500 bg-white" />
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{item.year}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="right" delay={150}>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
                  Interview Video
                </p>
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl bg-emerald-100/40 blur-xl" />
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                    >
                      <source src={interviewVideoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Quick contact below video */}
                <div className="mt-6 rounded-2xl border border-emerald-50 bg-emerald-50/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-3">
                    Quick Contact
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <span>📞</span>
                      <a href="tel:03018424686" className="text-emerald-800 font-medium hover:underline">
                        03018424686
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✉️</span>
                      <span className="text-slate-600">ranabrothers323@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span className="text-slate-600 text-xs">Sabzi Mandi Badami Bagh, Lahore</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── TITLES & PROOF OF ROLES ── */}
        <section
          aria-labelledby="about-proofs-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <Reveal direction="up">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Credibility & Governance
              </p>
              <h2 id="about-proofs-heading"
                className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Titles & Proof of Roles
              </h2>
              <p className="mt-3 mx-auto max-w-xl text-sm text-slate-600">
                Formal roles and representations that support market credibility and governance alignment.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {proofSections.map((section, i) => (
              <ProofCard key={section.title} section={section} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 px-8 py-10 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/5" />
              <div className="absolute right-32 bottom-4 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                    Partner with Rana Brothers Today
                  </h2>
                  <p className="mt-2 text-sm text-emerald-100 max-w-md">
                    Reach out for wholesale, export, and commission-based trading inquiries. Our team
                    is ready to assist with sourcing, grading, and logistics.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-md hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Get in Touch
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

/* ─── Value card with hover ─── */
function ValueCard({ icon, label, desc }) {
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
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

export default About