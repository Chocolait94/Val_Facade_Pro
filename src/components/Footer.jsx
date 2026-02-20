import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHardHat, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  {
    title: 'Navigation',
    links: [
      { name: 'Accueil',    path: '/' },
      { name: 'À Propos',   path: '/a-propos-de-nous' },
      { name: 'Contact',    path: '/contactez-nous' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { name: 'Avis Juridique',               path: '/avis-juridique' },
      { name: 'Politique de Confidentialité',  path: '/politique-de-confidentialite' },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/valfacade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    hoverClass: 'hover:bg-pink-500',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/kadir-gorduk-974770233/',
    hoverClass: 'hover:bg-blue-600',
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:contact@valfacade.com',
    hoverClass: 'hover:bg-primary-600',
  },
  {
    name: 'Téléphone',
    icon: FaPhone,
    url: 'tel:0232405803',
    hoverClass: 'hover:bg-green-600',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800" aria-label="Pied de page">
      {/* ── CTA Strip ── */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Prêt à donner une nouvelle vie à vos façades ?
              </h2>
              <p className="text-white/80 text-sm">
                Devis gratuit &amp; sans engagement — réponse sous 24h
              </p>
            </div>
            <Link
              to="/contactez-nous"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Demander un Devis
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
                <FaHardHat className="text-white text-base" />
              </div>
              <div>
                <div className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                  VAL FACADE
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  Ravalement &amp; Isolation
                </div>
              </div>
            </Link>

            <p className="text-gray-400 mb-7 leading-relaxed text-sm max-w-sm">
              Entreprise BTP spécialisée dans le ravalement de façades et
              l&apos;isolation thermique par l&apos;extérieur. Solutions durables et
              esthétiques pour vos bâtiments en Normandie.
            </p>

            <address className="not-italic space-y-3 text-sm">
              <a
                href="https://maps.google.com/?q=101+Rue+Grande,+Val-De-Reuil,+27100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <FaMapMarkerAlt className="text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="group-hover:translate-x-0.5 transition-transform">
                  101 Rue Grande, Val-De-Reuil, 27100, Eure
                </span>
              </a>
              <a
                href="tel:0232405803"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <FaPhone className="text-primary-500 flex-shrink-0" />
                <span className="group-hover:translate-x-0.5 transition-transform">
                  02 32 40 58 03
                </span>
              </a>
              <a
                href="mailto:contact@valfacade.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <span className="group-hover:translate-x-0.5 transition-transform">
                  contact@valfacade.com
                </span>
              </a>
            </address>
          </div>

          {/* Footer Link Columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-700 group-hover:bg-primary-400 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Business hours in first column */}
              {section.title === 'Navigation' && (
                <div className="mt-8">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                    Horaires
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex justify-between gap-4">
                      <span>Lun – Ven</span>
                      <span className="text-white">09h – 18h</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Samedi</span>
                      <span className="text-white">09h – 18h</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Dimanche</span>
                      <span className="text-gray-600">Fermé</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${social.hoverClass}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>

            <p className="text-gray-500 text-sm text-center">
              &copy; {currentYear} VAL FACADE. Tous droits réservés.
              <span className="hidden sm:inline"> — Normandie, France 🇫🇷</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
