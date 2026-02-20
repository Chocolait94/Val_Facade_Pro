import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaHardHat } from 'react-icons/fa'

const NAV_ITEMS = [
  { name: 'Accueil',  path: '/' },
  { name: 'À Propos', path: '/a-propos-de-nous' },
  { name: 'Contact',  path: '/contactez-nous' },
]

export default function Header() {
  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false) }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* ── Scroll progress ── */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 origin-left z-[60]"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/60 py-2.5'
            : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
              aria-label="VAL FACADE — retour à l'accueil"
            >
              <motion.div
                whileHover={{ scale: 1.06, rotate: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-800 rounded-xl flex items-center justify-center shadow-glow flex-shrink-0"
              >
                <FaHardHat className="text-white text-lg" />
              </motion.div>
              <div className="leading-none">
                <div className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors tracking-tight">
                  VAL FACADE
                </div>
                <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                  Ravalement &amp; Isolation
                </div>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      active
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-primary-50 -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:0232405803"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-primary-600 text-xs" />
                </div>
                <span className="font-medium">02 32 40 58 03</span>
              </a>
              <Link
                to="/contactez-nous"
                className="btn-primary !py-2.5 !px-5 text-sm"
              >
                Devis Gratuit
              </Link>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-all"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-white shadow-2xl md:hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                    <FaHardHat className="text-white text-sm" />
                  </div>
                  <span className="font-bold text-gray-900">VAL FACADE</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col p-4 gap-1 flex-1" aria-label="Navigation mobile">
                {NAV_ITEMS.map((item, i) => {
                  const active = location.pathname === item.path
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                          active
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.name}
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Contact block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 border-t border-gray-100 space-y-3"
              >
                <a
                  href="tel:0232405803"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 transition-all"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary-600 text-xs" />
                  </div>
                  <span className="font-medium text-sm">02 32 40 58 03</span>
                </a>
                <a
                  href="mailto:contact@valfacade.com"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-700 transition-all"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary-600 text-xs" />
                  </div>
                  <span className="font-medium text-sm">contact@valfacade.com</span>
                </a>
                <Link
                  to="/contactez-nous"
                  className="btn-primary w-full justify-center !py-3"
                >
                  Devis Gratuit
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
