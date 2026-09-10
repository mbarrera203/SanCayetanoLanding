import {
    BedDoubleIcon,
    LampIcon,
    LayersIcon,
    RefrigeratorIcon,
    SofaIcon,
    UtensilsIcon,
} from 'lucide-react'
import { Category } from '../../types'
import { categories, countByCategory } from '../../data/products'

const icons: Record<Category, typeof SofaIcon> = {
    Living: SofaIcon,
    Comedor: UtensilsIcon,
    Dormitorio: BedDoubleIcon,
    Electro: RefrigeratorIcon,
    Colchones: LayersIcon,
    Deco: LampIcon,
}

export function CategoryStrip() {
    return (
        <section
            aria-labelledby="categorias-heading"
            className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 lg:px-12 lg:pt-24"
        >
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2
                    id="categorias-heading"
                    className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl"
                >
                    Comprá por categoría
                </h2>
                <p className="text-sm text-charcoal-500">
                    Muebles, electro y descanso con envío a todo el país
                </p>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map(({ label, href, blurb }) => {
                    const Icon = icons[label]
                    const count = countByCategory(label)
                    return (
                        <li key={label} id={href.replace('#', '')}>
                            <a
                                href="#destacados"
                                className="group flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-5 transition-colors duration-150 ease-out hover:border-terracotta-200 hover:bg-terracotta-50"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand-100 text-charcoal transition-colors duration-150 ease-out group-hover:bg-white">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="mt-4 text-base font-semibold text-charcoal">
                                    {label}
                                </span>
                                <span className="mt-1 text-xs leading-relaxed text-charcoal-500">
                                    {blurb}
                                </span>
                                <span className="mt-auto pt-4 text-xs font-medium text-charcoal-400">
                                    {count} {count === 1 ? 'producto' : 'productos'}
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
