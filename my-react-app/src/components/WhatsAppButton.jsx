import { contactInfo } from '../data/siteData.js'

function WhatsAppButton() {
  const href = `https://wa.me/${contactInfo.whatsappNumberInternational}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
      aria-label="Quick WhatsApp inquiry"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-lg">
        ☎
      </span>
      <span>Quick Inquiry (WhatsApp)</span>
    </a>
  )
}

export default WhatsAppButton

