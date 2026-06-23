'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import ExperimentsSection from '@/components/experiments-section'
import SkillsSection from '@/components/skills-section'
import AuraSection from '@/components/aura-section'
import ProjectsSection from '@/components/projects-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import SmoothScroll from '@/components/smooth-scroll'
import SoundToggle from '@/components/sound-toggle'
import MeshBackground from '@/components/mesh-background'

const CustomCursor = dynamic(() => import('@/components/custom-cursor'), { ssr: false })
const FlowField = dynamic(() => import('@/components/flow-field'), { ssr: false })

const Divider = () => (
  <div className="mx-auto max-w-5xl px-6 md:px-10">
    <div className="h-px w-full" style={{ background: 'var(--divider)' }} />
  </div>
)

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <MeshBackground />
      <FlowField />
      <SoundToggle />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />

        <Divider />
        <ExperimentsSection />

        <Divider />
        <SkillsSection />

        <Divider />
        <AuraSection />

        <Divider />
        <ProjectsSection />

        <Divider />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
