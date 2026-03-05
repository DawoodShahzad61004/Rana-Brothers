import { Helmet } from 'react-helmet-async'
import { products, seo } from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'

function Vegetables() {
  return (
    <>
      <Helmet>
        <title>{seo.products.title}</title>
        <meta name="description" content={seo.products.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Vegetables
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Onion, Tomatoes, Potato, Ginger, and Garlic managed for daily wholesale supply and export
            requirements with flexible lots and packing.
          </p>
        </header>
        <section
          aria-labelledby="vegetables-list-heading"
          className="mt-8"
        >
          <h2
            id="vegetables-list-heading"
            className="sr-only"
          >
            Vegetables list
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.vegetables.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Vegetables

