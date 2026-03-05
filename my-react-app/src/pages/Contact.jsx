import { useEffect, useMemo, useState } from 'react'
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

function Contact() {
  const location = useLocation()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <>
      <Helmet>
        <title>{seo.contact.title}</title>
        <meta name="description" content={seo.contact.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Contact & Get Quote
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Share your requirements for fruits and vegetables, and Rana Brothers will respond with a
            commission-based quote and dispatch plan.
          </p>
        </header>

        <section
          aria-labelledby="contact-form-heading"
          className="mt-8 grid gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]"
        >
          <div>
            <h2
              id="contact-form-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              Inquiry Form
            </h2>

            <form
              noValidate
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 rounded-2xl border border-emerald-50 bg-white/90 p-4 shadow-sm"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    required
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="product"
                    className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Product
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    required
                  >
                    <option value="">Select a product</option>
                    {productOptions.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  {errors.product && (
                    <p className="mt-1 text-xs text-red-600">{errors.product}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  required
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              {submitted && (
                <div
                  role="status"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900"
                >
                  Your message has been submitted. The team at Rana Brothers will review your
                  requirements and reach out using the contact details provided.
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          <aside aria-label="Contact information" className="space-y-6">
            <div className="rounded-2xl border border-emerald-50 bg-white/90 p-4 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Direct Contact
              </h2>
              <dl className="mt-3 space-y-1.5 text-sm text-slate-700">
                <div className="flex gap-2">
                  <dt className="w-16 font-semibold">Phone</dt>
                  <dd>{contactInfo.phone}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 font-semibold">PTCL</dt>
                  <dd>{contactInfo.ptcl}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 font-semibold">Email</dt>
                  <dd>{contactInfo.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 font-semibold">Address</dt>
                  <dd>{contactInfo.address}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Social & Messaging
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Facebook:</span> link placeholder
                </li>
                <li>
                  <span className="font-semibold">WhatsApp:</span> chat link placeholder
                </li>
                <li>
                  <span className="font-semibold">WhatsApp Business:</span>{' '}
                  company with company&apos;s logo
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}

export default Contact

