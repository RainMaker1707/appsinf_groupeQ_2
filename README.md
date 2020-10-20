# Projet en approfondissement informatique LINFO1212

#### Introduction

Le but de ce projet est de mettre au point un site web dynamique (HTML ; CSS & JavaScript) 
utilisant une base de donnée (MongoDB), le tout hébergé sur un serveur* (Node.JS). 

Ce cours comprendra d'abord un projet préparatoire qui nous formera durant 9 semaines afin 
de mettre au point, de manière autonome, un site web de notre choix respectant au minimum 
les critères demandés. 

#### Thème du projet préparatoire

Le projet préparatoire consistera à mettre au point un site web de la commune 
d'Ottignies-Louvain-La-Neuve qui offrira aux utilisateurs de poster un rapport concernant
 un quelconque incident sur la voie publique (inspiré de FixMyStreet @ Bruxelles). 
 Ce site devra comporter 3 pages : Un menu principal; Un écran Log In/Sign In; 
 Rapport d'incident.

#### Etapes du projets préparatoire

###### 1 Mise au point d'une "maquette" avec HTML, CSS & JavaScript  (Page web statique)
###### 2 Initialisation serveur web grâce à NodeJS
###### 3 Utilisation d'une base de donnée    (Page web dynamique)
###### 4 Gestion de plusieurs Users
###### 5 Implémentation d'une barre de recherche ainsi que de sa fonction

#### Utilisation de la maquette prototype
Ouvrez la page `./main.html dans un navigateur (tester sur chrome uniquement).
Le site est responsive pour la plupart des téléphones portables et la plupart des tailles 
d'écrans disponible sur le marché de l'informatique.

Le composant chargé de contenir les informations d'un ***"incident"*** sont toutes chargée à partir 
d'un script Js se trouvant dans 
    `./components/reportComp.js`
    
Ce composant possède son propre fichier css:
    `./styles/file.css`
Les autres pages html se trouves dans le dossier:
    `./pages/`

#### Lancement du serveur

Afin de correctement faire tourner le serveur et sa base de donnée il vous faudra:
######1 Installer les modules

les modules utilisés sont: express, express-session, mongodb, bcrypt, body-parser. <br/>
Assurez vous de les avoir installer avant d'essayer de lancer le servur, leur installation
peut etre fait via une commande npm <br/> &nbsp;&nbsp;&nbsp;&nbsp;
    `npm install <module_name>` 
######2 MongoDB

Ouvrez un terminal dans un dossier quelconque (attention plusieurs fichiers s'installeront dans ce dossier et nous vous
conseillons donc d'en créer un pour les accueillir).
Une fois dans ce dossier tapez la commande suivante :
<br/> `mongod --dbpath .` <br/>
Un serveur MongoDB s'est lancé dans ce terminal, ne le fermez pas ! <br/>

Ouvrez donc un second terminal et placez vous dans le dossier /server/database/` du projet`et entrez 
la commandes suivantes afin de charger les presets de la base de données:
<br/> &nbsp;&nbsp;&nbsp;&nbsp; `mongoimport -d olln -c users user.json`


######3 Lancement du serveur

Se placer dans le dossier app dans un terminal grâce à la commande cd:
<br/> &nbsp;&nbsp;&nbsp;&nbsp;    `cd 'DirWhereYouStoredIt'/appsinfNode/`
    
Ensuite executer le serveur avec la commande:
<br/> &nbsp;&nbsp;&nbsp;&nbsp;    `node server/server.js`

######4 Utilisateurs preset

    1° pseudo: admin, password: rootpass
    
    2° pseudo: RainMaker, password: rootpass
