
# Projet Full Stack - Application de Gestion de Formations en Ligne

## 🧩 Structure du Projet

Ce projet est composé de plusieurs parties backend et frontend réparties en microservices et applications clientes, avec des technologies modernes : FastAPI, Spring Boot, Angular, Next.js, PostgreSQL, MongoDB, Redis.

---

## 🏁 Partie 1 : Découverte de FastAPI - Gestion des Étudiants

### Backend (FastAPI)
- Création d’une API REST avec FastAPI pour gérer une liste d’étudiants.
- Les étudiants ont un nom, un prénom, un email et un identifiant unique.
- Exemple d’endpoint :
  - `GET /students` : liste des étudiants
  - `POST /students` : ajouter un étudiant
  - `GET /students/{id}` : consulter un étudiant

### Frontend Étudiant (Next.js)
- Affichage des étudiants avec possibilité d’en ajouter via formulaire.

---

## 📘 Partie 2 : Ajout des Entités "Département" et "Formation"

### Backend
- Ajout des modèles `Departement` et `Formation` :
  - Un étudiant appartient à un seul département.
  - Un étudiant peut suivre plusieurs formations.
- Base de données : MongoDb (choisie pour sa robustesse, normalisation, support large avec FastAPI et ORM SQLAlchemy).

### Frontend Étudiant (Next.js)
- Inscription d’un étudiant au site.
- Consultation des formations suivies.
- Consultation du profil.

### Frontend Admin (Angular)
- Gestion des étudiants (CRUD).
- Gestion des formations (CRUD).
- Statistiques (nombre d’étudiants par département, par formation...)

---

## 🌐 Partie 3 : Microservice Spring Boot - Favoris et Recommandation

### Microservice Favoris (Spring Boot)
- Gestion des favoris par utilisateur (ajout, suppression, récupération).
- Base de données : MongoDB (souplesse, flexibilité pour données utilisateur non strictement relationnelles).
- Utilisation de Redis pour accélérer les lectures fréquentes (cache des favoris).

### Tests
- Tests unitaires : JUnit + Mockito
- Tests d’intégration : Spring Test
- Tests E2E : Selenium / Cypress

---

## 🤖 Partie 4 : Recommandation de Livres et Résumés IA

### Scraping & Recommandations (FastAPI)
- Scraping du site [books.toscrape.com](https://books.toscrape.com).
- Stockage dans PostgreSQL (`recommended_books`).
- Route GET `/recommendations` :
  - Filtres : `category`, `price_min`, `price_max`

### Résumé Intelligent de Livre
- Route GET `/books/summary?title=...`
- Résumé généré automatiquement avec API OpenAI (ou HuggingFace, Mistral, etc.)

---

## 🚀 Déploiement et Organisation Agile

### Déploiement
- API et microservices conteneurisés avec Docker.
- Base de données hébergée sur PostgreSQL / MongoDB Atlas.
- Frontend déployé avec Vercel (Next.js) et Firebase/Netlify (Angular).

### Organisation Scrum
- Jira pour la gestion des tâches, user stories, sprints.
- Revue quotidienne, démonstration à la fin de chaque sprint.

---

## 📁 Structure des Répertoires

```
/backend-fastapi
/backend-springboot-favoris
/frontend-nextjs-etudiant
/frontend-angular-admin
/database/postgresql
/tests/
/scraping/
```

---

## 👨‍💻 Contributeurs

- Étudiant(e) : Barghouda Sihem


---

## 📄 Licence

Ce projet est sous licence MIT.
