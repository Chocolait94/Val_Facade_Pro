import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from './CookieConsent'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
