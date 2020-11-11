# Projet préparatoire: Approfondissement informatique LINFO1212

#### Introduction

Le but de ce projet est de mettre au point un site web dynamique (HTML ; CSS & JavaScript) 
utilisant une base de donnée (MongoDB), le tout hébergé sur un serveur* (Node.JS).  

#### Thème du projet préparatoire

Le projet préparatoire consistera à mettre au point un site web de la commune 
d'Ottignies-Louvain-La-Neuve qui offrira aux utilisateurs la possibilité de poster un rapport concernant
 un quelconque incident sur la voie publique (inspiré de FixMyStreet @ Bruxelles). 
 Ce site devra comporter 3 pages : Un menu principal; Un écran Log In/Sign In; 
 Rapport d'incident.

#### Etapes du projets préparatoire

###### 1 Mise au point d'une "maquette" avec HTML, CSS & JavaScript  (Page web statique)
###### 2 Initialisation serveur web grâce à NodeJS
###### 3 Utilisation d'une base de donnée    (Page web dynamique)
###### 4 Gestion de plusieurs Users
###### 5 Implémentation d'une barre de recherche ainsi que de sa fonction

#### Remarque sur ce site web.
Ouvrez la page `./main.html dans un navigateur (tester sur chrome uniquement).
Le site est responsive pour la plupart des téléphones portables et la plupart des tailles 
d'écrans disponible sur le marché de l'informatique.
    
Le composant de rapport possède son propre fichier css:
    `./static/styles/file.css`
Les autres pages html(ejs) se trouvent dans le dossier:
    `./server/views/`

#### Lancement du serveur

Afin de correctement faire tourner le serveur et sa base de donnée il vous faudra:

###### 1 Installer les modules
Premièrement initialiser node dans le projet avec la commande: 
    
    `npm init`
Ceci installera un dossier avec les exécutable requis de NodeJs.<br/>
Les modules utilisés sont: _express, express-session, mongodb, bcrypt, body-parser, ejs, multer_. <br/>
Assurez vous de les avoir installé avant d'essayer de lancer le serveur, leur installation
peut etre fait via une commande npm <br/> &nbsp;&nbsp;&nbsp;&nbsp;
    
    `npm install <module_name>` 
###### 2 MongoDB
Installer MongoDB sur votre systême puis ouvrez 
un terminal dans un dossier quelconque 
(attention plusieurs fichiers s'installeront dans 
ce dossier et nous vous
conseillons donc d'en créer un pour les accueillir).
Une fois dans ce dossier tapez la commande suivante :
    
    `mongod --dbpath .`
Un serveur MongoDB s'est lancé dans ce terminal, ne le fermez pas ! <br/>

Ouvrez donc un second terminal et placez vous dans le dossier /server/database/` nom du projet`et entrez 
les commandes suivantes afin de charger les presets de la base de données:
    
    `mongoimport -d olln -c users user.json ` 
    `mongoimport -d olln -c reports reports.json`



###### 3 Lancement du serveur

Se placer dans le dossier app dans un terminal grâce à la commande cd:
    
    `cd 'DirWhereYouStoredIt'/appsinf_groupeQ_2/`
    
Ensuite executer le serveur avec la commande:

    `node server/server.js`

###### 4 Utilisateurs preset

    1° pseudo: admin, password: rootpass, mail: admin@admin.be
    2° pseudo: root, password: rootpass, mail: root@root.be
