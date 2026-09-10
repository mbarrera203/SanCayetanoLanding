import { ArrowRightIcon, FlameIcon } from 'lucide-react'
import { offerProducts } from '../../data/products'
import { ProductCard } from './ProductCard'

export function OffersSection() {
    return (
        <section
            id="ofertas"
            aria-labelledby="ofertas-heading"
            className="bg-terracotta-50"
        >
            <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="flex flex-wrap items-end justify-between gap-6 border-b border-terracotta-100 pb-8">
                    <div>
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-terracotta">
                            <FlameIcon className="h-4 w-4" aria-hidden="true" />
                            Hasta el domingo
                        </p>
                        <h2
                            id="ofertas-heading"
                            className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl"
                        >
                            Ofertas de la semana
                        </h2>
                        <p className="mt-3 max-w-lg text-base text-charcoal-500">
                            Precios rebajados en muebles, electro y colchones, con 12 cuotas
                            sin interés y 15% off pagando de contado.
                        </p>
                    </div>
                    <a
                        href="#destacados"
                        className="group inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-6 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-terracotta-600"
                    >
                        Ver todas las ofertas
                        <ArrowRightIcon
                            className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </a>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
                    {offerProducts.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
