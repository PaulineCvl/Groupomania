# Lancer le projet Groupomania

## Cloner le projet
Ouvrir un terminal. \
Depuis le dossier choisi : `git clone https://github.com/PaulineCvl/PaulineChevrollier_P7_10122021.git`

## Base de données
Créer un schéma sur MySQL Workbench : `CREATE DATABASE nom-de-la-base-de-données;`

## Lancer le serveur
Depuis le dossier "PaulineChevrollier_P7_10122021" :
- Aller dans le dossier backend : `cd backend`
- Installer les dépendances : `npm install`
- Créer un dossier images : `mkdir images`
- Lancer le serveur : `nodemon server`

## Configurer le fichier .env
Depuis le dossier "backend" :
- Créer un fichier ".env" : `touch .env`
- Compléter le fichier .env :
```
 DB_SECRET_TOKEN = token
 DB_DATABASE_HOST = adresse de la base de données
 DB_DATABASE_NAME = nom de la base de données créée
 DB_DATABASE_USERNAME = nom d'utilisateur
 DB_DATABASE_PASSWORD = mot de passe
```

## Lancer le site
Depuis le dossier "PaulineChevrollier_P7_10122021" :
- Aller dans le dossier frontend : `cd frontend/my-app`
- Installer les dépendances : `npm install`
- Lancer le site : `npm start`

## Naviguer sur le site
Commencer par se créer un compte :
- Pour créer un compte admin, aller sur Workbench : ```UPDATE nom-de-la-base-de-données.user SET `admin`=true WHERE `id`=1;```

Se connecter \
Créer un post, liker et commenter les autres posts. Personnaliser son profil.
