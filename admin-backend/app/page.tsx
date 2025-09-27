"use client"

import { motion } from "framer-motion"
import Header from "@/components/frontend/header"
import Footer from "@/components/frontend/footer"
import HeroSection from "@/components/frontend/hero-section"
import News from "@/components/frontend/news"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24">
        <HeroSection />

        <motion.div
          className="container mx-auto px-4 py-8 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <News category="all" title="Berita Terbaru" isMobile={false} />

          <div className="grid md:grid-cols-2 gap-8">
            <News category="Keagamaan" title="Berita Keagamaan" isMobile={false} />

            <News category="Sosial" title="Berita Sosial" isMobile={false} />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
