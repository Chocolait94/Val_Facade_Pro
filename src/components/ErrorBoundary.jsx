import { Component } from 'react'
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa'

/**
 * Class-based Error Boundary — catches render-time JS errors
 * and displays a friendly fallback instead of a white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message ?? 'Erreur inconnue' }
  }

  componentDidCatch(error, info) {
    // In production you could send this to a monitoring service (Sentry, etc.)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Oups, quelque chose s&apos;est mal passé
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Une erreur inattendue s&apos;est produite. Veuillez recharger la page ou
            contacter notre équipe si le problème persiste.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={this.handleReload}
              className="btn-primary"
            >
              <FaRedo className="mr-2" /> Recharger la page
            </button>
            <a
              href="mailto:contact@valfacade.com"
              className="btn-secondary"
            >
              Contacter le support
            </a>
          </div>
        </div>
      </div>
    )
  }
}
