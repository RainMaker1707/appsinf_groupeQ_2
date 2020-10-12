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
Se placer dans le dossier app dans un terminal grâce à la commande cd:
    `cd 'DirWhereYouStoredIt'/appsinfNode/`
    
ensuite executer le serveur avec la commande:
    `node server/server.js`
