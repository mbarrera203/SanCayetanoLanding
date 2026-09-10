import React from 'react';
import { Header } from '../components/store/Header';
import { Hero } from '../components/store/Hero';
import { FeaturedProducts } from '../components/store/FeaturedProducts';
import { WorkshopBand } from '../components/store/WorkshopBand';
import { Footer } from '../components/store/Footer';
import { CheckoutModal } from '../components/store/CheckoutModal';

export function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <WorkshopBand />
      </main>
      <Footer />
      <CheckoutModal />
    </div>);

}