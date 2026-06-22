'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import SmoothScroll from '@/components/providers/SmoothScroll'
import HeroSection from '@/components/sections/HeroSection'
import TimelineSection from '@/components/sections/TimelineSection'
import StatusSection from '@/components/sections/StatusSection'
import AuraXSection from '@/components/sections/AuraXSection'
import AuraGXSection from '@/components/sections/AuraGXSection'
import FutureMessageSection from '@/components/sections/FutureMessageSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main site */}
      {loaded && (
        <SmoothScroll>
          {/* Ambient scan line */}
          <div className="scan-line" aria-hidden="true" />

          <Navbar />

          <main>
            <HeroSection />
            <TimelineSection />
            <StatusSection />
            <AuraXSection />
            <AuraGXSection />
            <FutureMessageSection />
            <ContactSection />
          </main>

          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}
