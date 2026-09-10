import { Header } from '../components/store/Header'
import { Hero } from '../components/store/Hero'
import { PromoBand } from '../components/store/PromoBand'
import { CategoryStrip } from '../components/store/CategoryStrip'
import { FeaturedProducts } from '../components/store/FeaturedProducts'
import { WorkshopBand } from '../components/store/WorkshopBand'
import { OffersSection } from '../components/store/OffersSection'
import { Footer } from '../components/store/Footer'
import { CheckoutModal } from '../components/store/CheckoutModal'

export function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        <Hero />
        <PromoBand />
        <CategoryStrip />
        <FeaturedProducts />
        <WorkshopBand />
        <OffersSection />
      </main>
      <Footer />
      <CheckoutModal />
    </div>
  )
}
