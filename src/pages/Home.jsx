import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import WeatherWidget from '../components/WeatherWidget'
import {
  FaHome,
  FaThermometerHalf,
  FaTools,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaPaintRoller,
  FaHardHat,
  FaShieldAlt,
  FaClock,
  FaLeaf,
  FaPhone,
} from 'react-icons/fa'

/* ─── Reusable animated wrapper ─── */
const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Data ─── */
const STATS = [
  { number: '50+',  label: 'Projets Réalisés',       icon: FaCheckCircle },
  { number: '10+',  label: 'Clients Satisfaits',      icon: FaStar },
  { number: '3+',   label: "Années d'Expérience",     icon: FaHardHat },
]

const SERVICES = [
  {
    title: 'Ravalement de Façades',
    description: "Transformez l'apparence de votre bâtiment avec nos solutions de ravalement sur mesure.",
    icon: FaPaintRoller,
    gradient: 'from-primary-500 to-primary-700',
    bg: 'bg-primary-50',
  },
  {
    title: 'Isolation Thermique',
    description: "Améliorez l'efficacité énergétique avec notre isolation thermique par l'extérieur (ITE).",
    icon: FaThermometerHalf,
    gradient: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Projets Personnalisés',
    description: 'Des solutions adaptées à vos besoins spécifiques avec un accompagnement complet.',
    icon: FaTools,
    gradient: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50',
  },
  {
    title: 'Toute la Normandie',
    description: 'Nous intervenons dans toute la région Normandie avec des équipes qualifiées.',
    icon: FaMapMarkedAlt,
    gradient: 'from-accent-500 to-accent-700',
    bg: 'bg-accent-50',
  },
]

const WHY_US = [
  {
    icon: FaShieldAlt,
    title: 'Garantie Décennale',
    desc: 'Tous nos travaux sont couverts par une assurance décennale pour votre tranquillité.',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
  },
  {
    icon: FaClock,
    title: 'Respect des Délais',
    desc: 'Nous nous engageons à respecter les délais convenus pour chaque chantier.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FaLeaf,
    title: 'Matériaux Écologiques',
    desc: 'Priorité aux matériaux durables, certifiés et respectueux de l\'environnement.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: FaStar,
    title: 'Devis Gratuit',
    desc: 'Étude personnalisée et devis détaillé sans engagement sous 24h.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>VAL FACADE — Ravalement de Façades et Isolation Thermique | Normandie</title>
        <meta
          name="description"
          content="Spécialiste en ravalement de façades et isolation thermique en Normandie. Plus de 50 projets réalisés à Val-de-Reuil. Devis gratuit et personnalisé."
        />
      </Helmet>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh-gradient">
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { className: 'top-24 -left-16 w-80 h-80 bg-primary-200', x: [0, 80, 0], y: [0, 40, 0], d: 20 },
            { className: 'top-48 -right-16 w-64 h-64 bg-accent-200',  x: [0, -80, 0], y: [0, 80, 0], d: 25 },
            { className: '-bottom-16 left-1/3 w-72 h-72 bg-primary-300', x: [0, 40, 0], y: [0, -40, 0], d: 22 },
          ].map((blob, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full mix-blend-multiply filter blur-2xl opacity-25 ${blob.className}`}
              animate={{ x: blob.x, y: blob.y }}
              transition={{ duration: blob.d, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            />
          ))}
        </div>

        <div className="section-container relative z-10 text-center pt-28">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="badge badge-primary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Entreprise BTP en Normandie
            </span>
          </motion.div>

          {/* Weather badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <WeatherWidget />
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
          >
            Ravalement de Façades
            <br />
            <span className="gradient-text">et Isolation Thermique</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Nous sommes une entreprise BTP spécialisée dans le ravalement de façades 
            et l'isolation thermique par l'extérieur, offrant des solutions durables et esthétiques.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contactez-nous" className="btn-primary group text-base shadow-glow">
              Demander un Devis Gratuit
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:0232405803"
              className="btn-secondary text-base flex items-center gap-2"
            >
              <FaPhone className="text-primary-600" />
              02 32 40 58 03
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass rounded-2xl shadow-soft px-6 py-7 text-center"
              >
                <stat.icon className="text-3xl text-primary-500 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll caret */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-400 rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          ABOUT SNIPPET
      ════════════════════════════════════ */}
      <AnimatedSection>
        <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-primary mb-4">À Propos de Nous</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
                À Propos de{' '}
                <span className="gradient-text">VAL FACADE</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                Notre équipe d'experts qualifiés garantit des travaux de qualité, 
                respectueux des normes et des délais, pour améliorer l'efficacité énergétique de votre bâtiment.
                Nous intervenons en Normandie et pouvons nous déplacer, 
                proposant des devis personnalisés et un accompagnement complet pour vos projets de rénovation.
              </p>

              <Link to="/a-propos-de-nous" className="btn-primary group">
                En Savoir Plus
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl overflow-hidden shadow-card-hover"
              >
                <img
                  src="/image.png"
                  alt="Réalisation VAL FACADE — Ravalement de façade"
                  className="aspect-square object-cover w-full h-full"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl overflow-hidden shadow-card-hover mt-8"
              >
                <img
                  src="/image2.png"
                  alt="Réalisation VAL FACADE — Isolation thermique"
                  className="aspect-square object-cover w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ════════════════════════════════════
          SERVICES
      ════════════════════════════════════ */}
      <AnimatedSection>
        <section className="bg-gray-50">
          <div className="section-container">
            <div className="text-center mb-14">
              <span className="badge badge-primary mb-4">Nos Services</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-5">
                Solutions Complètes pour{' '}
                <span className="gradient-text">Vos Façades</span>
              </h2>
              <div className="divider" />
              <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-5">
                Une gamme complète de services pour la rénovation et
                l&apos;amélioration de vos façades.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, i) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="card p-7 group cursor-default"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                    aria-hidden="true"
                  >
                    <service.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════ */}
      <AnimatedSection>
        <section className="section-container">
          <div className="text-center mb-14">
            <span className="badge badge-primary mb-4">Pourquoi Nous Choisir ?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-5">
              Nos Engagements{' '}
              <span className="gradient-text">Qualité</span>
            </h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl hover:shadow-card transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`text-2xl ${item.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* ════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════ */}
      <AnimatedSection>
        <section className="section-container">
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-4xl shadow-2xl overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-10 md:p-16">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                  Prêt à Transformer Vos Façades ?
                </h2>
                <p className="text-xl mb-8 text-white/80 leading-relaxed">
                  Contactez-nous dès aujourd&apos;hui pour un devis gratuit et
                  personnalisé. Réponse garantie sous 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contactez-nous"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Demander un Devis
                    <FaArrowRight />
                  </Link>
                  <a
                    href="tel:0232405803"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    <FaPhone />
                    02 32 40 58 03
                  </a>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
                <motion.div
                  animate={{ rotate: [0, 4, -4, 0], y: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaHome className="text-white/10 text-[260px]" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>


    </>
  )
}