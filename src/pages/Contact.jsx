import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import DOMPurify from 'dompurify'

// Security: Input length limits
const MAX_LENGTHS = {
  firstName: 50,
  lastName: 50,
  email: 100,
  phone: 20,
  message: 2000,
}

// Security: Rate limiting for form submissions
const SUBMIT_COOLDOWN_MS = 30000 // 30 seconds between submissions
const MAX_SUBMISSIONS = 5 // Max submissions per session

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })

  // Security: Honeypot field (hidden from users, bots fill it)
  const [honeypot, setHoneypot] = useState('')

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Security: Track submission counts and timing
  const lastSubmitTime = useRef(0)
  const submitCount = useRef(0)
  const formLoadTime = useRef(Date.now())

  const validateForm = useCallback(() => {
    const newErrors = {}

    // Security: Check honeypot (bots fill hidden fields)
    if (honeypot) {
      // Silently reject — don't reveal bot detection
      return false
    }

    // Security: Check minimum time on page (bots submit instantly)
    const timeOnPage = Date.now() - formLoadTime.current
    if (timeOnPage < 3000) {
      newErrors.general = 'Veuillez patienter avant de soumettre le formulaire'
      setErrors(newErrors)
      return false
    }

    // Security: Rate limit check
    const now = Date.now()
    if (now - lastSubmitTime.current < SUBMIT_COOLDOWN_MS && lastSubmitTime.current > 0) {
      const waitSeconds = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitTime.current)) / 1000)
      newErrors.general = `Veuillez patienter ${waitSeconds} secondes avant de renvoyer`
      setErrors(newErrors)
      return false
    }

    if (submitCount.current >= MAX_SUBMISSIONS) {
      newErrors.general = 'Nombre maximum de soumissions atteint. Veuillez nous contacter par téléphone.'
      setErrors(newErrors)
      return false
    }

    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const message = formData.message.trim()

    if (!firstName) {
      newErrors.firstName = 'Le prénom est requis'
    } else if (firstName.length > MAX_LENGTHS.firstName) {
      newErrors.firstName = `${MAX_LENGTHS.firstName} caractères maximum`
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(firstName)) {
      newErrors.firstName = 'Caractères invalides dans le prénom'
    }

    if (!lastName) {
      newErrors.lastName = 'Le nom est requis'
    } else if (lastName.length > MAX_LENGTHS.lastName) {
      newErrors.lastName = `${MAX_LENGTHS.lastName} caractères maximum`
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(lastName)) {
      newErrors.lastName = 'Caractères invalides dans le nom'
    }

    if (!email) {
      newErrors.email = "L'email est requis"
    } else if (email.length > MAX_LENGTHS.email) {
      newErrors.email = `${MAX_LENGTHS.email} caractères maximum`
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
      newErrors.email = 'Email invalide'
    }

    if (!phone) {
      newErrors.phone = 'Le numéro de téléphone est requis'
    } else if (phone.length > MAX_LENGTHS.phone) {
      newErrors.phone = `${MAX_LENGTHS.phone} caractères maximum`
    } else if (!/^[\d\s+()-]{10,20}$/.test(phone)) {
      newErrors.phone = 'Numéro de téléphone invalide'
    }

    if (!message) {
      newErrors.message = 'Le message est requis'
    } else if (message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    } else if (message.length > MAX_LENGTHS.message) {
      newErrors.message = `${MAX_LENGTHS.message} caractères maximum`
    }

    // Security: Detect common spam/injection patterns
    const allText = `${firstName} ${lastName} ${message}`
    const spamPatterns = /<script|javascript:|on\w+\s*=|<iframe|<object|<embed|eval\(|document\.|window\./i
    if (spamPatterns.test(allText)) {
      newErrors.general = 'Contenu non autorisé détecté'
      setErrors(newErrors)
      return false
    }

    if (!formData.consent) {
      newErrors.consent = 'Vous devez accepter le traitement de vos données'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, honeypot])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Security: Sanitize all inputs with strict DOMPurify config
    const purifyConfig = { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }
    // eslint-disable-next-line no-unused-vars
    const sanitizedData = {
      firstName: DOMPurify.sanitize(formData.firstName.trim(), purifyConfig),
      lastName: DOMPurify.sanitize(formData.lastName.trim(), purifyConfig),
      email: DOMPurify.sanitize(formData.email.trim(), purifyConfig),
      phone: DOMPurify.sanitize(formData.phone.trim(), purifyConfig),
      message: DOMPurify.sanitize(formData.message.trim(), purifyConfig),
      timestamp: new Date().toISOString(),
    }

    try {
      // Simulate API call - In production, replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Security: Track submission timing
      lastSubmitTime.current = Date.now()
      submitCount.current += 1
      
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    // Security: Enforce maxLength on all text inputs
    if (type !== 'checkbox' && MAX_LENGTHS[name] && value.length > MAX_LENGTHS[name]) {
      return
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Téléphone',
      value: '02 32 40 58 03',
      link: 'tel:0232405803',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: FaEnvelope,
      title: 'Courriel',
      value: 'contact@valfacade.com',
      link: 'mailto:contact@valfacade.com',
      color: 'from-rose-500 to-rose-600',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Adresse',
      value: '101 Rue Grande, Val-De-Reuil, 27100, Eure, France',
      link: 'https://maps.google.com/?q=101+Rue+Grande,+Val-De-Reuil,+27100',
      color: 'from-accent-500 to-accent-600',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Contact - VAL FACADE | Demandez votre Devis Gratuit</title>
        <meta
          name="description"
          content="Contactez VAL FACADE pour un devis gratuit. Téléphone: 02 32 40 58 03 | Email: contact@valfacade.com | Val-de-Reuil, Normandie"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="section-container relative z-10 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Pour toute demande de devis, remplissez le formulaire ci-dessous ou
              contactez-nous directement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-container -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              target={info.link.startsWith('http') ? '_blank' : undefined}
              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card p-8 text-center group cursor-pointer"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
              >
                <info.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
              <p className="text-gray-600">{info.value}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-container pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">
                Envoyez-nous un Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Security: Honeypot field - invisible to humans, bots fill it */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Security: General error message */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    maxLength={MAX_LENGTHS.firstName}
                    autoComplete="given-name"
                    className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    maxLength={MAX_LENGTHS.lastName}
                    autoComplete="family-name"
                    className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse électronique *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={MAX_LENGTHS.email}
                  autoComplete="email"
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={MAX_LENGTHS.phone}
                  autoComplete="tel"
                  className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  maxLength={MAX_LENGTHS.message}
                  className={`textarea-field ${errors.message ? 'border-red-500' : ''}`}
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">{formData.message.length}/{MAX_LENGTHS.message} caractères</p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
                  Je consens par la présente à ce que ces données soient stockées et
                  traitées dans le but d&apos;établir un contact. Je sais que je peux révoquer
                  mon consentement à tout moment. *
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-red-600">{errors.consent}</p>
              )}

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  Merci ! Votre message a été envoyé avec succès. Nous vous
                  contacterons bientôt.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  Une erreur s&apos;est produite. Veuillez réessayer plus tard.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    Envoyer
                    <FaPaperPlane className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[600px] flex flex-col"
          >
            <iframe
              title="VAL FACADE - 101 Rue Grande, Val-De-Reuil"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.5!2d1.1965!3d49.2725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e119f1c2e9c5e7%3A0x0!2s101%20Rue%20Grande%2C%2027100%20Val-de-Reuil!5e0!3m2!1sfr!2sfr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '450px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="flex-1"
            />
            <div className="bg-white p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">VAL FACADE</p>
                <p className="text-sm text-gray-600">101 Rue Grande, 27100 Val-De-Reuil</p>
              </div>
              <a
                href="https://www.google.com/maps/search/101+Rue+Grande,+27100+Val-de-Reuil,+France"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Ouvrir dans Google Maps &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
