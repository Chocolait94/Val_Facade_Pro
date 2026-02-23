# VAL FACADE - Site Web Moderne

Site web moderne pour VAL FACADE, entreprise spécialisée en ravalement de façades et isolation thermique à Val-de-Reuil, Normandie.

## 🚀 Technologies

- **React 18.3** - Framework JavaScript moderne
- **Vite 6.1** - Build tool ultra-rapide *(mis à jour depuis 5.4)*
- **Tailwind CSS 3.4.17** - Framework CSS utility-first *(mis à jour depuis 3.4.1)*
- **Framer Motion 12** - Animations fluides et modernes *(mis à jour depuis 11)*
- **React Router 6.28** - Navigation SPA *(mis à jour depuis 6.22)*
- **React Icons 5.4** - Icônes vectorielles *(mis à jour depuis 5.0)*
- **DOMPurify 3.2** - Sanitisation des entrées *(mis à jour depuis 3.0)*
- **ESLint 9** - Linter avec flat config *(mis à jour depuis 8, élimine des vulnérabilités)*
- **Docker / Node 22 LTS** - Conteneurisation *(mis à jour depuis Node 20)*
- **Nginx** - Serveur web haute performance

## ✨ Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations d'entrée et effets de texte (Framer Motion)
- ✅ Barre de progression de scroll dans le header
- ✅ Menu mobile en slide-in avec backdrop
- ✅ Navigation fluide entre les pages
- ✅ Formulaire de contact sécurisé avec validation et honeypot
- ✅ Widget météo avec cache sessionStorage et skeleton loading
- ✅ Politique de cookies conforme RGPD (bannière compacte)
- ✅ Headers de sécurité optimisés (CSP, HSTS, Permissions-Policy…)
- ✅ Performance optimisée (lazy loading, code splitting par page)
- ✅ SEO avancé : Open Graph, Twitter Card, JSON-LD LocalBusiness
- ✅ ErrorBoundary global (plus d'écran blanc en cas d'erreur JS)
- ✅ Accessible (WCAG, focus-visible, aria-current, aria-label)

## 📦 Installation

### Prérequis

- Node.js 20 ou supérieur (Node 22 recommandé)
- npm 10 ou supérieur
- Docker (optionnel)

### Variables d'environnement

Copier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_WEATHER_API_KEY` | Clé API OpenWeatherMap ([obtenir une clé](https://openweathermap.org/appid)) |

### Installation locale

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Linter le code
npm run lint

# Builder pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

Le site sera accessible sur `http://localhost:3000`

## 🐳 Docker

### Build et lancement avec Docker

```bash
# Build l'image Docker
docker build -t valfacade-web .

# Lancer le conteneur avec Docker Compose
docker-compose up -d
```

Le site sera accessible sur `http://localhost:3000`

### Arrêter les containers

```bash
docker-compose down
```

## 🔒 Sécurité

Le projet implémente plusieurs mesures de sécurité :

- **Content Security Policy (CSP)** - Protection XSS, `frame-ancestors 'none'` (anti-clickjacking)
- **Strict-Transport-Security (HSTS)** - Forçage HTTPS (63 072 000 s)
- **X-Frame-Options** - Protection clickjacking
- **X-Content-Type-Options** - Protection MIME sniffing
- **Permissions-Policy** - Désactivation caméra, micro, géoloc, paiements, topics
- **Referrer-Policy** - `strict-origin-when-cross-origin`
- **Clé API dans `.env`** - Plus jamais de secrets dans le code source
- **Validation des formulaires** - Sanitization DOMPurify, honeypot anti-bot, rate limiting
- **ErrorBoundary** - Capture des erreurs JS sans exposer de stack traces
- **Container sécurisé** - User non-root, filesystem read-only, Node 22 LTS
- **ESLint 9 (flat config)** - Règles `no-console`, `eqeqeq`, `prefer-const`

## 📱 Pages

1. **Accueil** (`/`) - Page principale avec présentation des services
2. **À Propos** (`/a-propos-de-nous`) - Présentation de l'entreprise
3. **Contact** (`/contactez-nous`) - Formulaire de contact
4. **Avis Juridique** (`/avis-juridique`) - Mentions légales
5. **Politique de Confidentialité** (`/politique-de-confidentialite`) - RGPD

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être modifiées dans `tailwind.config.js` :

```js
{
  colors: {
    primary: { 50: '...', ..., 950: '...' },  // Vert (couleur principale)
    accent:  { 50: '...', ..., 900: '...' },  // Ambre (accent)
  }
}
```

### Contenu

Le contenu des pages se trouve dans `src/pages/` :
- `Home.jsx` - Page d'accueil
- `About.jsx` - À propos
- `Contact.jsx` - Contact
- `Legal.jsx` - Mentions légales
- `Privacy.jsx` - Politique de confidentialité

## 📊 Performance

- ⚡ **Vite 6** — build en ~2.5s
- 📂 **Code splitting** — 1 chunk par page (lazy loading via `React.lazy` + `Suspense`)
- 🗜️ Compression Gzip activée côté Nginx
- 📦 Assets statiques mis en cache 1 an (`Cache-Control: immutable`)
- 🔄 Widget météo mis en cache 10 min dans `sessionStorage`
- 🎯 Tree shaking automatique, `console.log` retirés du build de production

## 🌐 Déploiement

### Déploiement sur un serveur

1. Copier `.env.example` → `.env` et renseigner les variables
2. Builder l'application : `npm run build`
3. Copier le dossier `dist/` sur votre serveur
4. Configurer Nginx/Apache pour servir les fichiers statiques

### Déploiement avec Docker

```bash
# Sur votre serveur
docker-compose up -d --build
```

## 📋 Changelog

### v1.1.0 — Février 2026

**Dépendances**
- Vite 5 → **6.1**, Framer Motion 11 → **12**, React Router 6.22 → **6.28**
- React Icons 5.0 → **5.4**, DOMPurify 3.0 → **3.2**, PostCSS 8.4 → **8.5**
- ESLint 8 → **9** (migration flat config — supprime des vulnérabilités CVE)
- Dockerfile Node 20 → **Node 22 LTS** + `npm ci` pour builds reproductibles

**Sécurité**
- Clé API météo déplacée de la source vers `.env` (`VITE_WEATHER_API_KEY`)
- Fichier `.env.example` ajouté pour l'onboarding
- `Permissions-Policy` : suppression de `interest-cohort` (deprecated), ajout de `browsing-topics`
- `frame-ancestors: 'none'` (remplace `'self'`)
- `worker-src: 'none'` ajouté à la CSP

**Interface**
- Header : barre de progression scroll, menu mobile en drawer animé, pill de page active
- Footer : bande CTA, horaires d'ouverture, icônes sociales redessinées
- Cookie consent : carte compacte en bas à droite (non plus pleine largeur)
- Bouton WhatsApp flottant (page d'accueil)
- Widget météo : skeleton loading + cache sessionStorage + AbortController

**Architecture**
- `ErrorBoundary` global ajouté — évite l'écran blanc
- Toutes les pages en `React.lazy` + `Suspense`
- ESLint 9 flat config (`eslint.config.js`), suppression de `.eslintrc.cjs`
- Tailwind : nouvelles ombres (`shadow-card`, `shadow-glow`), `float`, `shimmer`, classes `glass`, `badge`
- CSS : `focus-visible`, `::selection`, scrollbar Firefox, utilitaires `gpu`, `no-print`
- SEO : Open Graph, Twitter Card, JSON-LD `LocalBusiness`, `geo.region`, `canonical`

## 📄 License

© 2026 VAL FACADE. Tous droits réservés.

## 📞 Contact

- **Email** : contact@valfacade.com
- **Téléphone** : 02 32 40 58 03
- **Adresse** : 101 Rue Grande, 27100 Val-de-Reuil, France

---

Développé avec ❤️ pour VAL FACADE
