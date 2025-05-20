
# Projet Gestion des Étudiants et Formations

## Sommaire

- [Description du Projet](#description-du-projet)  
- [Fonctionnalités](#fonctionnalités)  
- [Architecture du Projet](#architecture-du-projet)  
- [Choix Techniques et Justifications](#choix-techniques-et-justifications)  
- [Installation et Lancement](#installation-et-lancement)  
- [Backend](#backend)  
- [Frontend Étudiant (Next.js)](#frontend-étudiant-nextjs)  
- [Frontend Admin (Angular)](#frontend-admin-angular)  
- [Base de Données](#base-de-données)  
- [Documentation du Code](#documentation-du-code)  
- [Captures d’Écran](#captures-décran)  
- [Contact](#contact)  

---

## Description du Projet

Ce projet est une application complète de gestion des étudiants et des formations.  
Chaque étudiant est rattaché à un département et peut s’inscrire à différentes formations.  
L’application propose deux interfaces principales :  
- Un frontend Next.js destiné aux étudiants pour s’inscrire, gérer leur profil et suivre leurs formations.  
- Un frontend Angular destiné à l’administration pour gérer les étudiants, les formations, et consulter des statistiques.

---

## Fonctionnalités

### Frontend Étudiant

- Inscription et connexion sécurisées  
- Consultation et modification du profil  
- Inscription aux formations disponibles  
- Consultation des formations suivies  

### Frontend Admin

- Gestion complète des étudiants (CRUD)  
- Gestion des formations (CRUD)  
- Attribution des étudiants aux départements  
- Visualisation de statistiques (nombre d’étudiants par formation, par département, etc.)  

### Backend

- API RESTful sécurisée avec FastAPI  
- Gestion des entités Étudiant, Département, Formation  
- Authentification et autorisation  
- Validation des données  

---

## Architecture du Projet

```
/backend       - API FastAPI
/frontend-etudiant - Next.js (React)
/frontend-admin - Angular
/database     - MongoDb
```

---

## Choix Techniques et Justifications

- **Backend :** FastAPI pour sa rapidité, sa simplicité, et son support natif de la documentation Swagger.  
- **Frontend Étudiant :** Next.js pour le rendu serveur, SEO et une bonne expérience utilisateur.  
- **Frontend Admin :** Angular pour ses outils de gestion d’état, sa robustesse pour des applications complexes.  
- **Base de données :** PostgreSQL via Neon pour sa performance, fiabilité, et facilité d’intégration avec FastAPI.  
- **Authentification :** JWT pour sécuriser les accès.  

---

## Installation et Lancement

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Étudiant (Next.js)

```bash
cd frontend-etudiant
npm install
npm run dev
```

### Frontend Admin (Angular)

```bash
cd frontend-admin
npm install
ng serve
```

---

## Backend

- Endpoints REST pour CRUD sur Étudiants, Départements, Formations  
- Middleware d’authentification JWT  
- Validation des données avec Pydantic  

---

## Frontend Étudiant (Next.js)

- Pages :  
  - `/register` : inscription  
  - `/login` : connexion  
  - `/profile` : profil utilisateur  
  - `/formations` : liste des formations et inscription  
- Utilisation de `axios` pour les appels API  
- Gestion du state avec React Context  

---

## Frontend Admin (Angular)

- Dashboard avec statistiques  
- Pages de gestion des étudiants et formations  
- Utilisation de services Angular pour communiquer avec l’API backend  
- Formulaires réactifs avec validations  

---

## Base de Données

- Tables principales :  
  - `etudiants`  
  - `departements`  
  - `formations`  
  - `cours` (table de liaison)  
- Relations bien définies avec clés étrangères  

---

## Documentation du Code

Chaque fichier et fonction est documenté avec des commentaires clairs.  
Le projet respecte les bonnes pratiques de développement et est structuré pour faciliter la maintenance et l’évolution.  

---

## Captures d’Écran

*(Insérer ici les images des différentes pages et fonctionnalités du projet)*

---

## Contact

Pour toute question, vous pouvez me contacter à :  
- Email : ton.email@example.com  
- GitHub : https://github.com/sihem barghouda  


---

Merci d’avoir consulté ce projet !
