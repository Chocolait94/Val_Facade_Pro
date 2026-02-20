import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="a-propos-de-nous" element={<About />} />
          <Route path="contactez-nous" element={<Contact />} />
          <Route path="avis-juridique" element={<Legal />} />
          <Route path="politique-de-confidentialite" element={<Privacy />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
