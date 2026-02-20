import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaShieldAlt, FaUserShield, FaLock, FaCookie, FaEnvelope } from 'react-icons/fa'

export default function Privacy() {
  const sections = [
    {
      id: 'preambule',
      title: 'PRÉAMBULE',
      icon: FaShieldAlt,
      content: `La présente politique de confidentialité a pour but d'informer les utilisateurs du site internet de l'entreprise VAL FAÇADE, située à Val-de-Reuil, sur la manière dont sont collectées, utilisées et protégées leurs données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679).`,
    },
    {
      id: 'responsable',
      title: 'IDENTITÉ DU RESPONSABLE DE TRAITEMENT',
      icon: FaUserShield,
      content: null,
      list: [
        'Dénomination : VAL FAÇADE',
        'Adresse postale : 101 Rue Grande, 27100 Val-de-Reuil, France',
        'Email : contact@valfacade.com',
        'Téléphone : 02.32.40.58.03',
      ],
    },
    {
      id: 'donnees',
      title: 'DONNÉES COLLECTÉES',
      icon: FaLock,
      content: `Nous collectons uniquement les données strictement nécessaires à la prise de contact ou à la gestion de vos demandes. Ces données peuvent inclure :`,
      list: [
        'Identité : Nom et prénom',
        'Coordonnées : Adresse e-mail, numéro de téléphone, adresse postale (le cas échéant)',
        'Contenu : Message ou détails de la demande formulée',
      ],
    },
    {
      id: 'finalites',
      title: 'FINALITÉS DU TRAITEMENT',
      icon: FaEnvelope,
      content: `Les données personnelles sont collectées et traitées pour les objectifs suivants :`,
      list: [
        'Gestion des demandes : Répondre aux sollicitations via le formulaire de contact',
        'Relation commerciale : Établir des devis et gérer la relation contractuelle',
        'Suivi client : Assurer le service après-vente et le suivi des dossiers',
        'Amélioration continue : Optimiser la qualité de nos services et de l\'expérience sur notre site',
      ],
    },
    {
      id: 'base-legale',
      title: 'BASE LÉGALE DU TRAITEMENT',
      content: `Les traitements de vos données reposent sur les fondements juridiques suivants :`,
      list: [
        'L\'exécution d\'un contrat ou de mesures précontractuelles (ex : demande de devis)',
        'Le consentement de la personne concernée (ex : envoi d\'un formulaire)',
        'L\'intérêt légitime de l\'entreprise dans la gestion et le développement de ses relations commerciales',
      ],
    },
    {
      id: 'destinataires',
      title: 'DESTINATAIRES DES DONNÉES',
      content: `Les données collectées sont exclusivement destinées à l'usage de VAL FAÇADE. Elles peuvent être transmises à d'éventuels sous-traitants techniques (hébergeur, prestataire web) uniquement dans le cadre strict de l'exécution de leurs missions et dans le respect du cadre légal.`,
      highlight: 'Engagement : Vos données ne sont en aucun cas revendues à des tiers.',
    },
    {
      id: 'conservation',
      title: 'DURÉE DE CONSERVATION',
      content: `Les données personnelles sont conservées pour une durée limitée, adaptée à la finalité du traitement :`,
      list: [
        'Durée maximale : 3 ans à compter du dernier contact émanant de votre part ou de la fin de la relation contractuelle',
        'Exception : Sauf obligation légale contraire imposant une conservation plus longue (ex : comptabilité)',
      ],
    },
    {
      id: 'securite',
      title: 'SÉCURITÉ DES DONNÉES',
      content: `VAL FAÇADE s'engage à mettre en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité, l'intégrité et la confidentialité de vos données personnelles contre tout accès non autorisé, perte ou altération.`,
    },
    {
      id: 'droits',
      title: 'DROITS DES PERSONNES CONCERNÉES',
      content: `Conformément à la législation en vigueur, vous disposez des droits suivants sur vos données :`,
      list: [
        'Droit d\'accès : Connaître les données détenues vous concernant',
        'Droit de rectification : Corriger des données inexactes',
        'Droit à l\'effacement : Demander la suppression de vos données (« droit à l\'oubli »)',
        'Droit d\'opposition : Vous opposer au traitement de vos données',
        'Droit à la limitation : Demander la suspension temporaire du traitement',
        'Droit à la portabilité : Récupérer vos données pour les transmettre ailleurs',
      ],
      subContent: 'Pour exercer ces droits, vous pouvez nous contacter par email à contact@valfacade.com ou par courrier à l\'adresse de l\'entreprise.',
    },
    {
      id: 'cookies',
      title: 'COOKIES',
      icon: FaCookie,
      content: `Le site internet peut utiliser des cookies à des fins de navigation, de statistiques ou de fonctionnement technique. Vous avez la possibilité, à tout moment, de paramétrer vos préférences directement via les réglages de votre navigateur internet.`,
    },
  ]

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - VAL FACADE | Protection des Données</title>
        <meta
          name="description"
          content="Politique de confidentialité et protection des données personnelles de VAL FACADE. Conforme au RGPD."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="section-container relative z-10 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaShieldAlt className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-white/90">
              Date de mise à jour : 24/12/2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-4">
                  {section.icon && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                        <section.icon className="text-white text-xl" />
                      </div>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 flex-1">
                    ARTICLE {index + 1} : {section.title}
                  </h2>
                </div>

                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="space-y-2 mb-4">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlight && (
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
                    <p className="text-primary-900 font-semibold">
                      {section.highlight}
                    </p>
                  </div>
                )}

                {section.subContent && (
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {section.subContent}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-4">ARTICLE 10 : CONTACT</h2>
              <p className="text-white/90 leading-relaxed mb-6">
                Pour toute question relative à la présente politique de confidentialité
                ou pour toute demande concernant vos données personnelles, vous pouvez
                contacter nos services :
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-2">
                <p className="font-semibold text-lg">VAL FAÇADE</p>
                <p className="text-white/90">Adresse : 101 Rue Grande, 27100 Val-de-Reuil</p>
                <p className="text-white/90">
                  Email :{' '}
                  <a
                    href="mailto:contact@valfacade.com"
                    className="underline hover:text-white"
                  >
                    contact@valfacade.com
                  </a>
                </p>
                <p className="text-white/90">
                  Téléphone :{' '}
                  <a href="tel:0232405803" className="underline hover:text-white">
                    02.32.40.58.03
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
