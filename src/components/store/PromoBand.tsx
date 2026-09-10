import { CreditCardIcon, StarIcon, TagIcon } from 'lucide-react'
import { MercadoPagoMark } from '../PaymentMarks'

export function PromoBand() {
    return (
        <section
            aria-label="Beneficios y planes de financiación"
            className="mt-14 border-y border-sand-200 bg-sand-50 lg:mt-20"
        >
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-sand-200 px-5 sm:grid-cols-2 sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-12">
                <div className="flex items-center justify-center gap-4 py-7 sm:border-r sm:border-sand-200 lg:py-9">
                    <div className="text-center">
                        <div
                            className="flex items-center justify-center gap-1 text-terracotta-400"
                            aria-hidden="true"
                        >
                            <StarIcon className="h-3 w-3 fill-current" />
                            <StarIcon className="h-3.5 w-3.5 fill-current" />
                            <StarIcon className="h-3 w-3 fill-current" />
                        </div>
                        <p className="mt-1 text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                            20
                        </p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal-500">
                            años
                        </p>
                    </div>
                    <div className="h-12 w-px bg-sand-300" aria-hidden="true" />
                    <p className="max-w-[7rem] text-sm font-semibold leading-snug text-charcoal">
                        San Cayetano Muebles
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4 py-7 lg:border-r lg:border-sand-200 lg:py-9">
                    <CreditCardIcon
                        className="hidden h-9 w-9 shrink-0 text-charcoal sm:block"
                        aria-hidden="true"
                    />
                    <div>
                        <p className="flex items-baseline gap-2">
                            <span className="text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                                12
                            </span>
                            <span className="text-sm font-bold uppercase leading-tight tracking-wide text-charcoal">
                                cuotas
                                <br />
                                sin interés
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-charcoal-500">
                            con todas las tarjetas
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 border-t border-sand-200 py-7 sm:border-r sm:border-t-0 lg:py-9">
                    <div>
                        <p className="flex items-baseline gap-2">
                            <span className="text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                                6
                            </span>
                            <span className="text-sm font-bold uppercase leading-tight tracking-wide text-charcoal">
                                cuotas
                                <br />
                                sin interés
                            </span>
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-charcoal-500">
                            con <MercadoPagoMark />
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 border-t border-sand-200 py-7 sm:border-t-0 lg:py-9">
                    <TagIcon
                        className="hidden h-9 w-9 shrink-0 text-charcoal sm:block"
                        aria-hidden="true"
                    />
                    <div>
                        <p className="flex items-baseline gap-1">
                            <span className="text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                                15
                            </span>
                            <span className="text-xl font-semibold leading-none text-terracotta">
                                %
                            </span>
                            <span className="ml-1 text-sm font-bold uppercase tracking-wide text-charcoal">
                                off
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-charcoal-500">
                            de contado o transferencia
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
