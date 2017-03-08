<h1>Read Me</h1>
<h2>Description du projet</h2>
<p>Pour le projet de web design, nous avons implémenté un site internet avec la bibliothèque javascript angular et la bibliothèque css bootstrap. Nous avons également utilisé des api de la nasa pour récuperer des informations au format JSON. La première api utilisé sert à récupérer des photos des rovers sur Mars. La deuxième sert à afficher la liste des astéroïdes qui passeront le plus proche de la Terre dans les 60 prochains jours. </p>
<h2>Fonctionnalités implémentées</h2>
<h3>ng-model</h3>
Cette directive est utilisé dans les formulaires de photos de Mars pour envoyer la bonne requête. La date, le rover et la caméra utilisent ng-model pour l'utilisateur ai le bon résultat.
<h3>ng-click</h3>
Ng-click est utilisé dans la liste des météorite. En effet, lorsque l'utilisateur veut changer l'ordre de trie, un ng-click déclanche une fonction qui va modifier l'ordre choisi.
<h3>ng-sumbit</h3>
Cette directive est utilisé pour lancer la recherche des photos des rovers sur Mars.
<h3>ng-class</h3>
Après que les photos soient recherchées, il y a à côté des radios bouton qui servent à choisir la caméra, des numéros qui servent à connaître le nombre de photos prise par chaque caméra. Avec ng-class, la classe de ce numéro est modifié et la couleur de celui-ci change si il y a ou non des photo.
<h3>ng-repeat</h3>
Lors de l'affichage des photos par la caméra, c'est avec ng-repeat que les photos sont affichées sur la page. Ng-repeat est également utilisé pour l'affichage de la liste des météorites.
<h3>ng-if, ng-show</h3>
Pour afficher les images correspondantes à la bonne camera, ng-show est utilisé. Et, pour attendre que le formulaire ai été validé ou pour savoir si le carrousel doit être affiché ng-if est utilisé.
<h3>Filtre custume</h3>
Deux filtres custumes sont utilisés pour la partie avec les météorrites. Ces filtres servent à passer d'une unité de mesure à une autre.
<h3>Responsivité</h3>
Le site est doté d'un menu responsif, c'est à dire qu'il change de forme en dessous d'une certaine largeur d'écran. Ce menu est également compatible avec les smartphones. De plus bootstrap permet d'adapter les dispositions des différents éléments selon la largeur de l'écran. En effet, si l'écran est large, certains éléments seront les uns à côté des autres tandis que si l'écran est moin large, les éléments seront tous sur la même colonne. 
<h3>Design</h3>
Pour donner un aspect agréable au site, les quelques règles données ont été suivit, des border radius faibles et avec des ombres sur les blocks plus proche de l'utilisateur (comme sur la partie météorite. Bootstrap a été utilisé pour le style des boutons. Cependant, la plupart des styles ont été créés via CSS. Une animation sur les liens du menu a également été implémenté.
<h2>Fonctionnalités non-implémentés</h2>
Il est possible que les api utilisées soient indisponible (cela arrive régulièrement). Il faudrait rajouter une fonctionnalité qui permettrait de rajouter un message qui explique la situation lorsque l'utilisateur ne peux pas accéder aux informations qu'il demande.  
<h2>Fonctionnalités bonus</h2>
<h3>Gestion de deux langues</h3>
<p>Il est possible de passer de l'anglais au français sur le site. Pour cela, des partie de code html sont masqués ou affiché en fonction de la langue sélectionné. Cela a été fait en javascript sans utilisé angularJS avec du code écrit directement sur les pages html contenu dans le dossier partial.</p>
<h3>Implémentation d'une directive</h3>
<p>Une directive a été implémenté, celle-ci permet de faire un carrousel de photos. En effet, lorsque l'on sélectionne toutes les caméras dans les formulaires de sélection de photo, le carrousel s'affiche est permet de faire défiler les photos</p>
<h3>Utilisation de angular-route</h3>
Le site de possède donc que une seule vrai page html : index.html. Les différents contenus du site sont chargés en fonction du lien sur le menu sur lequel l'utilisateur clique.
<h2>Remarque</h2>
Il serai bien de proposer des hébergeurs gratuit pour rendre le projet comme hostinger par exemple.