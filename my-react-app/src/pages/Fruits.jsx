import { Helmet } from 'react-helmet-async'
import { products, seo } from '../data/siteData.js'
import ProductCard from '../components/ProductCard.jsx'

function Fruits() {
  return (
    <>
      <Helmet>
        <title>{seo.products.title}</title>
        <meta name="description" content={seo.products.description} />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Fruits
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Apple, Mango, Melon, Banana, and Oranges handled with grading, packing, and export-ready
            preparation where required.
          </p>
        </header>
        <section
          aria-labelledby="fruits-list-heading"
          className="mt-8"
        >
          <h2
            id="fruits-list-heading"
            className="sr-only"
          >
            Fruits list
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.fruits.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Fruits

