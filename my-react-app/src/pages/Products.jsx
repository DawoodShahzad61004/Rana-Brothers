import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { products, seo } from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'

function Products() {
  const [query, setQuery] = useState('')

  const allProducts = useMemo(
    () => [...products.fruits, ...products.vegetables],
    [],
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts
    const q = query.toLowerCase()
    return allProducts.filter((p) => p.name.toLowerCase().includes(q))
  }, [allProducts, query])

  return (
    <>
      <Helmet>
        <title>{seo.products.title}</title>
        <meta name="description" content={seo.products.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Products Catalog
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Commission-based handling of all kinds of fruits and vegetables, with flexible lot sizes
            for wholesale and export buyers.
          </p>
        </header>

        <section
          aria-labelledby="product-categories-heading"
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          <h2
            id="product-categories-heading"
            className="sr-only"
          >
            Product Categories
          </h2>
          <Link
            to="/products/fruits"
            className="flex flex-col justify-between rounded-2xl border border-emerald-50 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Category
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Fruits</p>
              <p className="mt-2 text-sm text-slate-700">
                Apple, Mango, Melon, Banana, Oranges – selected for both export and local markets.
              </p>
            </div>
            <p className="mt-4 text-xs font-semibold text-emerald-700">
              View Fruits →
            </p>
          </Link>
          <Link
            to="/products/vegetables"
            className="flex flex-col justify-between rounded-2xl border border-emerald-50 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Category
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Vegetables</p>
              <p className="mt-2 text-sm text-slate-700">
                Onion, Tomatoes, Potato, Ginger, Garlic – handled for wholesale and export lots.
              </p>
            </div>
            <p className="mt-4 text-xs font-semibold text-emerald-700">
              View Vegetables →
            </p>
          </Link>
        </section>

        <section
          aria-labelledby="product-search-heading"
          className="mt-10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="product-search-heading"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Search Products
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Filter fruits and vegetables by name and request a commission-based quote.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <label htmlFor="product-search" className="sr-only">
                Search products by name
              </label>
              <input
                id="product-search"
                type="search"
                placeholder="Search by product name"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-slate-600">
                No products found. Try a different name such as Apple, Mango, Onion, or Potato.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Products

