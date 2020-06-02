# \***\*Test technique Web\*\***

Pour lancer le projet:

cloner le projet en local et executer

- npm i
- npm start

ou copier uniquement le dossier docker en local puis aller dedans et exécuter:

- docker build -t test-web .
- docker run -p 3000:3000 --env-file .env -d test-web

-J'ai utilisé les HOOKS de react dans le projet
-J'ai utilisé la librairie MATERIAL-UI pour l'UI
-J'ai propsé 2 reducer pour filter la liste des équipments:

    un filter classic et un autre avec l'algo undo/todo

    j'ai mis un commentaire dans le reducer undo/todo pour expliquer l'algo:
    sachant que cet algo est très utile pour le temps de réponse de l'affichage si on a un très grand nombre d'équipment qui n'est pas le cas pour le test , le filter classic suffira => je voulais juste vous présenter l'algo pas plus

    Vous pouvez choisir la variable REACT_APP_FILTER_REDUCER dans .env pour switcher entre les reducers

-Bien évidement on peut enrichir le reducer pour gérer le CRUD des équipments par example + autres fonctionalités

-J'ai rajouté un composant Loader et NotFound

# \***\*Saber CHAABANE\*\***
