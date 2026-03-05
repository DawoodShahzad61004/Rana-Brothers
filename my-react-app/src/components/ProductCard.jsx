import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate()

  const handleQuote = () => {
    navigate('/contact', { state: { productName: product.name } })
  }

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-emerald-50 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-700">
            {product.category}
          </span>
        </div>
        <div className="mb-3 aspect-video w-full rounded-xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 text-[11px] text-slate-400 ring-1 ring-emerald-50 flex items-center justify-center">
          <span>{product.name} image placeholder</span>
        </div>
        <dl className="space-y-1.5 text-xs text-slate-600">
          {product.variety && (
            <div className="flex gap-1">
              <dt className="w-24 font-semibold">Variety</dt>
              <dd className="flex-1">{product.variety}</dd>
            </div>
          )}
          {product.grade && (
            <div className="flex gap-1">
              <dt className="w-24 font-semibold">Grade</dt>
              <dd className="flex-1">{product.grade}</dd>
            </div>
          )}
          {product.packaging && (
            <div className="flex gap-1">
              <dt className="w-24 font-semibold">Packaging</dt>
              <dd className="flex-1">{product.packaging}</dd>
            </div>
          )}
          {product.availability && (
            <div className="flex gap-1">
              <dt className="w-24 font-semibold">Availability</dt>
              <dd className="flex-1">{product.availability}</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleQuote}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          Get Quote
        </button>
      </div>
    </article>
  )
}

export default ProductCard

