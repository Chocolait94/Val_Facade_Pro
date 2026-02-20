import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaBuilding, FaMapMarkerAlt, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa'

export default function Legal() {
  const legalInfo = [
    {
      icon: FaBuilding,
      label: "Nom de l'entreprise",
      value: 'VAL FACADE',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Siège social',
      value: '101 Rue Grande, 27100 Val-de-Reuil',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'contact@valfacade.com',
      link: 'mailto:contact@valfacade.com',
    },
    {
      icon: FaPhone,
      label: 'Téléphone',
      value: '02.32.40.58.03',
      link: 'tel:0232405803',
    },
    {
      icon: FaPhone,
      label: 'Mobile',
      value: '06.37.84.26.43',
      link: 'tel:0637842643',
    },
    {
      icon: FaIdCard,
      label: 'SIRET',
      value: '90502052500010',
    },
    {
      icon: FaIdCard,
      label: 'TVA Intracommunautaire',
      value: 'FR62905020525',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Avis Juridique - VAL FACADE | Mentions Légales</title>
        <meta
          name="description"
          content="Mentions légales de VAL FACADE. SIRET: 90502052500010 | TVA: FR62905020525 | RCS Évreux"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="absolute inset-0 bg-black/40" />
        <div className="section-container relative z-10 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Avis Juridique
            </h1>
            <p className="text-xl text-white/90">
              Informations légales et mentions obligatoires
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="space-y-8">
              {legalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                      <info.icon className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      {info.label}
                    </div>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-lg text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-lg text-gray-900 font-medium">
                        {info.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Autorité de régulation / Immatriculation
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Inscription au RCS
                  </h3>
                  <p className="text-gray-700">
                    Inscrit au greffe d&apos;Évreux, le 09/11/2021
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Inscription au RNE
                  </h3>
                  <p className="text-gray-700">
                    Inscrit le 09/11/2021 à la Chambre des Métiers d&apos;Évreux
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Propriété Intellectuelle
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                L&apos;ensemble des contenus (textes, images, logos, etc.) présents sur ce
                site sont la propriété exclusive de VAL FACADE, sauf mention contraire.
                Toute reproduction, représentation, modification, publication,
                adaptation totale ou partielle des éléments du site, quel que soit le
                moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
                préalable.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Hébergement
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ce site est hébergé conformément aux exigences légales en vigueur.
                Pour toute question concernant l&apos;hébergement, veuillez nous contacter
                via les coordonnées indiquées ci-dessus.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
