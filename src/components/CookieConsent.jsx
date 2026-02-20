import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCookieBite, FaTimes } from 'react-icons/fa'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowConsent(false)
  }

  const reject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Consentement aux cookies"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Colored top strip */}
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-700" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCookieBite className="text-primary-600 text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    Respect de votre vie privée
                  </h3>
                </div>
                <button
                  onClick={reject}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
                  aria-label="Refuser et fermer"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Body */}
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Nous utilisons des cookies pour améliorer votre expérience et mesurer
                l&apos;audience. Vous pouvez modifier votre choix à tout moment.{' '}
                <Link
                  to="/politique-de-confidentialite"
                  className="text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium"
                >
                  En savoir plus
                </Link>
              </p>

              {/* Actions */}
              <div className="flex gap-2.5">
                <button
                  onClick={reject}
                  className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={accept}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
