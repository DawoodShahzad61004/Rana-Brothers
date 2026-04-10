import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { contactInfo, products, seo } from '../data/siteData.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  product: '',
}

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

/* ─── Animated input field ─── */
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-1 text-xs text-red-600 flex items-center gap-1"
          style={{ animation: 'shakeIn 0.3s ease' }}
        >
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

function Contact() {
  const location = useLocation()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const productOptions = useMemo(
    () => [...products.fruits, ...products.vegetables],
    [],
  )

  useEffect(() => {
    const state = location.state
    const searchParams = new URLSearchParams(location.search)
    const productFromState = state && state.productName
    const productFromQuery = searchParams.get('product')
    const subjectFromState = state && state.subject
    setForm((current) => ({
      ...current,
      product: productFromState || productFromQuery || current.product,
      subject: subjectFromState || current.subject,
    }))
  }, [location])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required.'
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    if (!form.product.trim()) nextErrors.product = 'Please select a product.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitted(false)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  const inputClass = (hasError) =>
    `mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
      hasError
        ? 'border-red-400 focus:border-red-400'
        : 'border-slate-200 focus:border-emerald-500 hover:border-slate-300'
    }`

  return (
    <>
      <Helmet>
        <title>{seo.contact.title}</title>
        <meta name="description" content={seo.contact.description} />
      </Helmet>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
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
              Contact & Get Quote
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-5 max-w-2xl text-base text-white/70 leading-relaxed">
              Share your requirements for fruits and vegetables, and Rana Brothers will respond with
              a commission-based quote and dispatch plan.
            </p>
          </Reveal>

          {/* Quick contact chips */}
          <Reveal direction="up" delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200"
              >
                <span>📞</span> {contactInfo.phone}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsappNumberInternational}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200"
              >
                <span>💬</span> WhatsApp
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200"
              >
                <span>✉️</span> Email Us
              </a>
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
          @keyframes shakeIn {
            0%   { transform: translateX(0); }
            25%  { transform: translateX(-4px); }
            50%  { transform: translateX(4px); }
            75%  { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
          @keyframes successPop {
            0%   { transform: scale(0.8); opacity: 0; }
            60%  { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <main className="bg-slate-50">
        <section
          aria-labelledby="contact-form-heading"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8"
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">

            {/* ── FORM ── */}
            <Reveal direction="left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Send a Message
              </p>
              <h2
                id="contact-form-heading"
                className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Inquiry Form
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill in your details and we'll get back to you with a commission-based quote.
              </p>

              {submitted ? (
                <div
                  className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-14 text-center"
                  style={{ animation: 'successPop 0.4s ease' }}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-3xl shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">Message Submitted!</h3>
                  <p className="mt-2 text-sm text-emerald-800 max-w-sm">
                    The team at Rana Brothers will review your requirements and reach out using the
                    contact details provided.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-emerald-600 px-5 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition-colors duration-200"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5 rounded-2xl border border-emerald-50 bg-white p-6 shadow-sm"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass(errors.name)}
                        required
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass(errors.email)}
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Phone" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 03001234567"
                        className={inputClass(errors.phone)}
                        required
                      />
                    </Field>
                    <Field label="Product" error={errors.product}>
                      <select
                        id="product"
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        className={inputClass(errors.product)}
                        required
                      >
                        <option value="">Select a product</option>
                        <optgroup label="Fruits">
                          {products.fruits.map((p) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Vegetables">
                          {products.vegetables.map((p) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </optgroup>
                      </select>
                    </Field>
                  </div>

                  <Field label="Subject" error={errors.subject}>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Wholesale quote for Mangoes"
                      className={inputClass(errors.subject)}
                      required
                    />
                  </Field>

                  <Field label="Message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your requirements — quantity, packing, destination…"
                      className={inputClass(errors.message)}
                      required
                    />
                  </Field>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {submitting ? (
                        <>
                          <span
                            className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            style={{ animation: 'spin 0.7s linear infinite' }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>Submit Inquiry →</>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* ── SIDEBAR ── */}
            <aside aria-label="Contact information" className="space-y-5">

              {/* Direct contact card */}
              <Reveal direction="right" delay={100}>
                <div className="rounded-2xl border border-emerald-50 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">
                    Direct Contact
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: '📞', label: 'Rana Imran (CEO)',    value: contactInfo.phone,    href: `tel:${contactInfo.phone}` },
                      { icon: '📞', label: 'Azmat Hussain', value: '03003304300',         href: 'tel:03003304300' },
                      { icon: '☎️', label: 'Office',          value: contactInfo.ptcl,     href: `tel:${contactInfo.ptcl}` },
                    ].map((item, i) => (
                      <ContactRow key={i} icon={item.icon} label={item.label} value={item.value} href={item.href} isLink />
                    ))}
                    <ContactRow icon="✉️" label="Email"   value={contactInfo.email}   />
                    <ContactRow icon="📍" label="Address" value={contactInfo.address} />
                  </div>
                </div>
              </Reveal>

              {/* WhatsApp card */}
              <Reveal direction="right" delay={200}>
                <a
                  href={`https://wa.me/${contactInfo.whatsappNumberInternational}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500 text-2xl shadow-md group-hover:scale-110 transition-transform duration-200">
                    💬
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">WhatsApp Us</p>
                    <p className="text-xs text-slate-500 mt-0.5">Quick inquiries via WhatsApp</p>
                    <p className="text-xs font-semibold text-green-700 mt-1">Start a chat →</p>
                  </div>
                </a>
              </Reveal>

              {/* Map */}
              <Reveal direction="right" delay={400}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <iframe
                    title="Rana Brothers location on Google Maps"
                    src="https://www.google.com/maps?q=31.600778,74.308250&hl=en&z=15&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-52 w-full border-0"
                    allowFullScreen
                  />
                </div>
              </Reveal>

            </aside>
          </div>
        </section>
      </main>
    </>
  )
}

/* ─── Contact info row ─── */
function ContactRow({ icon, label, value, href, isLink }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="mt-0.5 text-base shrink-0">{icon}</span>
      <div className="min-w-0">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
        <div className="mt-0.5">
          {isLink && href ? (
            <a href={href} className="font-medium text-emerald-700 hover:text-emerald-900 hover:underline break-all">
              {value}
            </a>
          ) : (
            <p className="text-slate-700 break-all">{value}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact