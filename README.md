# Lancer le projet Groupomania

## Cloner le projet

## Base de données
Créer un schéma sur MySQL Workbench

## Lancer le serveur
Depuis le dossier "PaulineChevrollier_P7_10122021" : \
Aller dans le dossier backend : `cd backend` \
Installer les dépendances : `npm install` \
Créer un dossier images : `mkdir images` \
Lancer le serveur : `nodemon server`

## Configurer le fichier .env
Depuis le dossier "backend" :
Créer un fichier ".env" : `touch .env` \
Compléter le fichier .env : \
  DB_SECRET_TOKEN = token \
  DB_DATABASE_HOST = adresse de la base de données \
  DB_DATABASE_NAME = nom du schéma créé \
  DB_DATABASE_USERNAME = nom d'utilisateur \
  DB_DATABASE_PASSWORD = mot de passe

## Lancer le site
Depuis le dossier "PaulineChevrollier_P7_10122021" : \
Aller dans le dossier frontend : `cd frontend/my-app` \
Installer les dépendances : `npm install` \
Lancer le site : `npm start`
