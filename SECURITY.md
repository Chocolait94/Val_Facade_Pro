# Security Policy

## Reporting a Vulnerability

Si vous découvrez une vulnérabilité de sécurité dans ce projet, veuillez nous en informer de manière responsable.

**NE PAS** créer d'issue publique sur GitHub pour les problèmes de sécurité.

### Comment signaler une vulnérabilité

1. Envoyez un email à: contact@valfacade.com
2. Incluez une description détaillée de la vulnérabilité
3. Incluez les étapes pour reproduire le problème
4. Si possible, incluez du code de preuve de concept

### Délai de réponse

- Nous accuserons réception de votre rapport sous 48 heures
- Nous fournirons une évaluation initiale sous 7 jours
- Nous travaillerons avec vous pour comprendre et résoudre le problème

### Politique de divulgation

- Nous demandons 90 jours pour corriger la vulnérabilité avant une divulgation publique
- Nous vous créditerons pour la découverte (sauf si vous préférez rester anonyme)
- Nous publierons un correctif de sécurité dès que possible

## Mesures de sécurité en place

### Application Web
- Content Security Policy (CSP)
- Security Headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Input sanitization avec DOMPurify
- Validation stricte des formulaires
- Protection CSRF

### Infrastructure
- Container Docker sécurisé (non-root user)
- Read-only filesystem
- Dropped capabilities
- Rate limiting
- HTTPS uniquement en production

### Dépendances
- Mise à jour régulière des dépendances
- Scan automatique des vulnérabilités
- Utilisation de versions LTS stables

## Versions supportées

| Version | Supportée          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Best Practices

Pour maintenir un niveau de sécurité élevé:

1. Toujours utiliser HTTPS en production
2. Garder les dépendances à jour
3. Suivre les principes de moindre privilège
4. Effectuer des audits de sécurité réguliers
5. Former l'équipe aux bonnes pratiques de sécurité

---

Merci de contribuer à la sécurité de VAL FACADE!
