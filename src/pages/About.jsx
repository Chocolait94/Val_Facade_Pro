import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const features = [
    'Équipe d\'experts qualifiés',
    'Travaux de qualité garantis',
    'Respect des normes et des délais',
    'Amélioration de l\'efficacité énergétique',
    'Intervention en Normandie',
    'Devis personnalisés gratuits',
    'Accompagnement complet',
    'Matériaux durables'
  ]

  return (
    <>
      <Helmet>
        <title>À Propos - VAL FACADE | Notre Expertise en Ravalement et Isolation</title>
        <meta
          name="description"
          content="Découvrez VAL FACADE, entreprise BTP spécialisée en ravalement de façades et isolation thermique. Équipe d'experts qualifiés en Normandie."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="section-container relative z-10 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              À Propos de Nous
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Découvrez Notre Expertise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Une entreprise BTP dédiée à la rénovation de façades et à l&apos;isolation
              thermique
            </p>
          </motion.div>
        </div>

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              className="wave-animate"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
          </svg>
        </div>
      </section>

      {/* Who We Are Section */}
      <AnimatedSection>
        <section className="section-container bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img src="/1.png" alt="Réalisation VAL FACADE - Ravalement" className="aspect-[3/4] object-cover w-full h-full" loading="lazy" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="rounded-2xl overflow-hidden shadow-xl mt-12"
              >
                <img src="/2.png" alt="Réalisation VAL FACADE - Isolation" className="aspect-square object-cover w-full h-full" loading="lazy" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="rounded-2xl overflow-hidden shadow-xl -mt-4"
              >
                <img src="/3.png" alt="Réalisation VAL FACADE - Façade" className="aspect-square object-cover w-full h-full" loading="lazy" />
              </motion.div>
            </div>

            <div>
              <span className="badge badge-primary mb-4">
                Notre Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Qui Nous Sommes ?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                <span className="font-semibold text-gray-900">VAL FACADE</span> est une
                entreprise BTP dédiée à la rénovation de façades et à l&apos;isolation
                thermique.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Notre mission est d&apos;offrir des solutions durables et esthétiques pour
                améliorer l&apos;efficacité énergétique de votre bâtiment. Notre équipe
                d&apos;experts qualifiés garantit des travaux de qualité, respectueux des
                normes et des délais.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl px-4 py-2.5 group hover:bg-primary-100 transition-colors"
                  >
                    <FaCheckCircle className="text-primary-600 flex-shrink-0 text-sm" />
                    <span className="text-gray-700 text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection>
        <section className="bg-gradient-to-b from-gray-50 to-white">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="badge badge-primary mb-4">Nos Valeurs</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-4">
                Ce Qui Nous{' '}
                <span className="gradient-text">Distingue</span>
              </h2>
              <div className="divider" />
              <p className="text-gray-600 text-lg mt-5">
                Nous nous engageons à fournir des services de la plus haute qualité avec
                intégrité et professionnalisme.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualité',
                icon: '⭐',
                description:
                  'Nous utilisons uniquement des matériaux de première qualité et des techniques éprouvées.',
              },
              {
                title: 'Expertise',
                icon: '🔨',
                description:
                  'Notre équipe possède des années d\'expérience dans le domaine du BTP.',
              },
              {
                title: 'Engagement',
                icon: '🤝',
                description:
                  'Nous nous engageons à respecter les délais et le budget convenus.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
          </div>{/* /section-container */}
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="section-container">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl shadow-2xl p-12 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Prêt à Rénover ?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Nous vous proposons des devis personnalisés avec un accompagnement
                professionnel pour vos projets de rénovation en Normandie.
              </p>
              <Link
                to="/contactez-nous"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
              >
                Obtenir un Devis
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
