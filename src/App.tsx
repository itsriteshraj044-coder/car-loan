import { useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { IntroContext } from './context/IntroContext'
import { useLenis, resetScroll } from './hooks/useLenis'
import { ScrollTrigger } from './hooks/gsap'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const [introDone, setIntroDone] = useState(false)
  useLenis()

  const finishIntro = useCallback(() => {
    setIntroDone(true)
    ScrollTrigger.refresh()
  }, [])

  return (
    <IntroContext.Provider value={introDone}>
      <a href="#main" className="skip-link">Skip to content</a>
      {!introDone && <LoadingScreen onComplete={finishIntro} />}
      <Header />

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          resetScroll()
          requestAnimationFrame(() => ScrollTrigger.refresh())
        }}
      >
        <div key={location.pathname}>
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <Footer />
        </div>
      </AnimatePresence>

      <Cursor />
    </IntroContext.Provider>
  )
}
