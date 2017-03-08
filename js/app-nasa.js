/*
Projet Web Design EPF 4A filière TIC
Code écrit par Adrien LENOIRE et Guilhem PEQUILLAT
Date : 08/03/2017
Description du fichier :  ce fichier javascript contient le module angular. Il y a le module pour router les templates. Le controller de la page curiosity, le controller d'opportunity et spirit, le controller des météorites, les filtres et enfin la directive du carrousel.
*/
var app = angular.module('nasa',[
    "ngRoute"/*ngRoute permettra d'afficher les fichiers html contenu dans le dossier partial*/
]);

angular.module('nasa').config([/*Attribution des liens vers les différents fichiers html*/
    '$routeProvider',
    function($routeProvider){
    $routeProvider
        .when('/opporitunityspirit',{//Vers l'article Opportunity et Spirit
        templateUrl:"partials/opportunityspirit.html"
        })
        .when('/accueil',{//Vers la page d'acceuille
        templateUrl:"partials/accueil.html",
        })
        .when('/curiosity',{//Vers l'article Curiosity
        templateUrl:"partials/curiosity.html",
        })
        .otherwise({//La page affiché par défaut est la page d'acceuille, c'est la page qui sera affiché dès que l'on arrive sur le site
        redirectTo:"accueil"
        })
}]);

var urlmanifestcuriosity = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2";//C'est la requête qui est envoyé lors de l'affichage de la page sur Curisity
app.controller('nasaControllerPhotoCuriosityRecherche',
['$scope', '$http', 
 	function ($scope, $http) {
		var ctrl=this;
		ctrl.therover="curiosity";//initialisation du nom du rover
		var photos="";
		ctrl.done=false;//variable de la 
		ctrl.date="2012-08-07";//initialisation de la date des photos que l'on veut récupérer
		ctrl.camera="";
		$http.get(urlmanifestcuriosity).success(function(result){//Envoi requête du manifest
            ctrl.curiositymanifest=result;// récupération du manifest, permet de connaître les dates
		}); 
        /*Ci-dessous, les compteur des différentes caméras*/
		ctrl.fhaz=0;
		ctrl.rhaz=0;
		ctrl.navcam=0;
		ctrl.chemcam=0;
		ctrl.mahli=0;
		ctrl.mardi=0;
		ctrl.mast=0;
		ctrl.tout=0;/*toutes camera confondu*/
		$scope.myRequest=function(){//Fonction déclanché par le bouton de validation du formulaire
            //remise à 0 des compteurs
			ctrl.fhaz=0;
			ctrl.rhaz=0;
			ctrl.navcam=0;
			ctrl.chemcam=0;
			ctrl.mahli=0;
			ctrl.mardi=0;
			ctrl.mast=0;
			$http.get("https://api.nasa.gov/mars-photos/api/v1/rovers/"+ctrl.therover+"/photos?earth_date="+ctrl.date+"&api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2").success(function(result){//Cette requête permet de récupérer les photos de la curiosity en fonction de la date
				ctrl.done=true;//Done passe à true pour indiquer que la première requête est envoyé
				ctrl.photos=result;//récupération des photos dans result (en format JSON)
				for(var i=0;i<ctrl.photos.photos.length;i++){//On parcour le tableau des photos pour compter le nombre de photos prises par caméra
					if(ctrl.photos.photos[i].camera.full_name==="Front Hazard Avoidance Camera"){
						ctrl.fhaz++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Rear Hazard Avoidance Camera"){
						ctrl.rhaz++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Navigation Camera"){
						ctrl.navcam++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Mast Camera"){
						ctrl.mast++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Chemistry and Camera Complex"){
						ctrl.chemcam++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Mars Hand Lens Imager"){
						ctrl.mahli++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Mars Descent Imager"){
						ctrl.mardi++;//si c'est cette caméra on incrémente son compteur
					}
				}
				ctrl.tout=ctrl.fhaz+ctrl.rhaz+ctrl.navcam+ctrl.mast+ctrl.chemcam+ctrl.mahli+ctrl.mardi;
                if(ctrl.fhaz==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltfhaz="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltfhaz="result";
                }
                if(ctrl.rhaz==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltrhaz="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltrhaz="result";
                }
                if(ctrl.navcam==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltnavcam="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltnavcam="result";
                }
                if(ctrl.mast==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltmast="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltmast="result";
                }
                if(ctrl.chemcam==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltchemcam="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltchemcam="result";
                }
                if(ctrl.mahli==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltmahli="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltmahli="result";
                }
                if(ctrl.mardi==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltmardi="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltmardi="result";
                }
                if(ctrl.tout==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.reslttout="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.reslttout="result";
                }
			});
		}
	}
]);


var urlmanifestopportunity = "https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2";//C'est la requête qui permet de récupérer le manifest du rover Opportunity
var urlmanifestspirit = "https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2";//C'est la requête qui permet de récupérer le manifest du rover Spirit
app.controller('nasaControllerPhotoSpiritCuriosityRecherche',
['$scope', '$http', 
 	function ($scope, $http) {
		var ctrl=this;
		ctrl.therover="spirit";//Initialistion du rover sur spirit
		var photos="";
		ctrl.done=false;//informe si la première requête pour avoir des photos
		ctrl.date="2009-6-3";//Initialisation de la date
		ctrl.camera="";//Initialisation du choix de la camera
		$http.get(urlmanifestspirit).success(function(result){//requête pour le manifest du rover spirit
            ctrl.manifestspirit=result;//récupération des informations (dans un fichiers JSON) avec les dates de début et de fin de la mission
		}); 
		$http.get(urlmanifestopportunity).success(function(result){//requête pour le manifest du rover opportunity
            ctrl.manifestopportunity=result;//récupération des informations (dans un fichiers JSON) avec les dates de début et de fin de la mission
		});
        /*Compteurs du nombre de photos par camera*/
		ctrl.fhaz=0;
		ctrl.rhaz=0;
		ctrl.navcam=0;
		ctrl.pancam=0;
		ctrl.minites=0;
		ctrl.tout=0;
		$scope.myRequest=function(){//Envoi des requête pour récupérer les photos
            //Remise à 0 des compteurs
			ctrl.fhaz=0;
			ctrl.rhaz=0;
			ctrl.navcam=0;
			ctrl.pancam=0;
			ctrl.minites=0;
			ctrl.tout=0;
			$http.get("https://api.nasa.gov/mars-photos/api/v1/rovers/"+ctrl.therover+"/photos?earth_date="+ctrl.date+"&api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2").success(function(result){
				ctrl.done=true;//Rend compte qu'une requête a été envoyé
				ctrl.photos=result;//récupération des information avec les photos
				for(var i=0;i<ctrl.photos.photos.length;i++){//On parcour le tableau des photos pour compter le nombre de photos prises par caméra 
					if(ctrl.photos.photos[i].camera.full_name==="Front Hazard Avoidance Camera"){
						ctrl.fhaz++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Rear Hazard Avoidance Camera"){
						ctrl.rhaz++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Navigation Camera"){
						ctrl.navcam++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Panoramic Camera"){
						ctrl.pancam++;//si c'est cette caméra on incrémente son compteur
					}else if(ctrl.photos.photos[i].camera.full_name==="Miniature Thermal Emission Spectrometer (Mini-TES)"){
						ctrl.minites++;//si c'est cette caméra on incrémente son compteur
					}
				}
				ctrl.tout=ctrl.fhaz+ctrl.rhaz+ctrl.navcam+ctrl.pancam+ctrl.minites;
                if(ctrl.fhaz==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltfhaz="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltfhaz="result";
                }
                if(ctrl.rhaz==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltrhaz="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltrhaz="result";
                }
                if(ctrl.navcam==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltnavcam="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltnavcam="result";
                }
                if(ctrl.pancam==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltpancam="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltpancam="result";
                }
                if(ctrl.minites==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.resltminites="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.resltminites="result";
                }if(ctrl.tout==0){//si le compteur est égale à zéro on donne la classe "pasresult" au compteur sur la page html
                    ctrl.reslttout="pasresult";
                }else{//Sinon on donne la classe "result", cela change la couleur d'affichage du compteur
                    ctrl.reslttout="result";
                }
			});
		}
	}
]);

var urlmeteor="https://api.nasa.gov/SSD-CNEOS/CAD?api_key=xoxFnSZ7rp81GCM3nFdklNsDHBHMzl9vKEFotcb2";//Url de la requête pour la fonctionnalité bonus de la page d'accueille.
app.controller('nasaControlerMeteor',[//Le but de ce controller est de récupérer les informations à propos des objets qui passeront proche de la terre dans les 60 prochains jour, de pouvoir les afficher et les trier
	"$http","$filter","$scope",function($http,$filter,$scope){
		var ctrl=this;
        ctrl.choixFiltre="filtreKm";//initialisation du choix du filtre par défaut
		ctrl.donnees=[];// création dans tableau ou seront stoquer les météorites, cela facilitera leur affichage avec ng-repeat
		$http.get(urlmeteor).success(function(result){//récupération des informations avec cette requête
            ctrl.listmeteors=result;//les données sur récupérés
			for(var i=0;i<ctrl.listmeteors.data.length;i++){//réorganisation des données pour pouvoir les manipuler facilement
				ctrl.donnees.push({//On met les données dans la
					"des":ctrl.listmeteors.data[i][0],
					"orbit_id":ctrl.listmeteors.data[i][1],
					"jd":ctrl.listmeteors.data[i][2],
					"cd":ctrl.listmeteors.data[i][3],//la est stoqué la date
					"codeDate":0,//code date, un entier qui permet de savoir l'ordre chronologique des dates
					"dist":ctrl.listmeteors.data[i][4],
                    "distAffichage":"",//La distance qui sera affiché après un passage par un filtre
					"dist_min":ctrl.listmeteors.data[i][5],
					"dist_max":ctrl.listmeteors.data[i][6],
					"v_rel":ctrl.listmeteors.data[i][7],
					"v_inf":ctrl.listmeteors.data[i][8],
					"t_sigma_f":ctrl.listmeteors.data[i][9],
					"h":ctrl.listmeteors.data[i][10]});
                ctrl.donnees[i].distAffichage = $filter(ctrl.choixFiltre)(ctrl.donnees[i].dist_min);
                /*Dans les lignes qui suivent, le code date va être calculé. La date récupéré dans le fichier JSON est comme ceci : "2017-Mar-06 10:42", donc la date est découpé pour récuperer l'information de la date et la traiter correctement  */
				var minute=ctrl.donnees[i].cd.split(":")[1];//récupération des minutes
				var heure=ctrl.donnees[i].cd.split(":")[0].split(' ')[1];//récupération des heures
				var jour=ctrl.donnees[i].cd.split(" ")[0].split("-")[2];//récupération des jours
				var mois;//Les mois sont convertis en entier car ils sont écrit en lettre dans le JSON
				var moisString=ctrl.donnees[i].cd.split("-")[1];
				if(moisString=='Jan'){//test de la chaine de caractère
					var mois=1;//Si correspondance, attribution de la valeur
				}else if(moisString=='Feb'){//test de la chaine de caractère
					var mois=2;//Si correspondance, attribution de la valeur
				}else if(moisString=='Mar'){//test de la chaine de caractère
					var mois=3;//Si correspondance, attribution de la valeur
				}else if(moisString=='Apr'){//test de la chaine de caractère
					var mois=4;//Si correspondance, attribution de la valeur
				}else if(moisString=='May'){//test de la chaine de caractère
					var mois=5;//Si correspondance, attribution de la valeur
				}else if(moisString=='Jun'){//test de la chaine de caractère
					var mois=6;//Si correspondance, attribution de la valeur
				}else if(moisString=='Jul'){//test de la chaine de caractère
					var mois=7;//Si correspondance, attribution de la valeur
				}else if(moisString=='Aug'){//test de la chaine de caractère
					var mois=8;//Si correspondance, attribution de la valeur
				}else if(moisString=='Sep'){//test de la chaine de caractère
					var mois=9;//Si correspondance, attribution de la valeur
				}else if(moisString=='Oct'){//test de la chaine de caractère
					var mois=10;//Si correspondance, attribution de la valeur
				}else if(moisString=='Nov'){//test de la chaine de caractère
					var mois=11;//Si correspondance, attribution de la valeur
				}else if(moisString=='Dec'){//test de la chaine de caractère
					var mois=12;//Si correspondance, attribution de la valeur
				}
				var annee=ctrl.donnees[i].cd.split("-")[0];//récupération du nombre d'années
				ctrl.donnees[i].codeDate=parseInt(minute)+parseInt(heure)*60+parseInt(jour)*60*24+parseInt(mois)*60*24*31+parseInt(annee)*60*24*31*365;//Le code date est en minute (c'est le nombre de minute depuis l'an 0 le 1er janvier)
			}
		});
        $scope.changementFiltre=function(){// déclanché lorsque l'on click sur les choix d'unité
            for(var i=0;i<ctrl.donnees.length;i++){//parcour les résultats
                ctrl.donnees[i].distAffichage = $filter(ctrl.choixFiltre)(ctrl.donnees[i].dist_min);
			}
        }
        ctrl.choixTrie='dist_min/oui';//initialisation des 
        $scope.propertyName = 'dist/oui';
        $scope.sortBy = function() {//Se déclanche avec le ng-click situé sur la liste des choix de trie
            if(ctrl.choixTrie.split("/")[1]==='oui'){//Choisit si dans quelles sens les résultats sont triés
                $scope.reverse=true;
            }else{
                $scope.reverse=false;
            }
            $scope.propertyName = ctrl.choixTrie.split("/")[0];//indication du critère de trie
        };
	}
]);

app.filter('filtreUa', function () {//affiche la distance en unité astronomique
  return function (item) {
      return (item*1).toFixed(5)+" U.A.";//rajoute juste u.a.
  };
});

app.filter('filtreKm', function () {//affiche la distance en km
  return function (item) {
      return (item*1.496*100000000).toFixed(2)+" km";// convertion pour passer en Km
  };
});



app.directive('carrousel', function factory() { 
        return {
        restrict: 'EA',
        replace: true,/*remplace le code compris entre les balises carrousel*/
        transclude: true,
        scope: '=',	
        template: '<div class=\"carrousel\">'
					+"<div class=\"row\" ><br>"
						+"<div class=\"col-xs-2 fleche\">"/*Flèche pour passer à une autre photo*/
							+"<img src=\"images/icone-gauche.png\" ng-click=\"reculer(nasa.photos.photos.length)\" class=\"img-responsive\"></img>"
						+"</div>"
						+"<div class=\"col-xs-8 \">"
							+"<img src=\"{{nasa.photos.photos[choixphoto].img_src}}\" class=\"img-responsive responsimg imgcarrousel\">"/*La ou l'image est chargé*/
						+"</div>"
						+"<div class=\"col-xs-2\">"/*Flèche pour passer à une autre photo*/
							+"<img src=\"images/icone-droit.png\" class=\"img-responsive fleche\" ng-click=\"avancer(nasa.photos.photos.length)\"></img>"
						+"</div>"
					+"</div>"
					+"<div class=\"row text-center\">{{choixphoto+1}} / {{nasa.photos.photos.length}}</div>"/*Affichage du numéro de la photo*/
       			+'</div>',
        link: function(scope, element, attrs){
            scope.choixphoto = 0;/*représente le numéro de la photo sélectionné*/
            scope.avancer = function avancer(nb){/*fonction qui permet d'aller à la photo suivante*/
				if(scope.choixphoto<nb-1){
					scope.choixphoto++;
				}else{/*si il n'y a plus de photo on recommence à 0*/
					scope.choixphoto=0;
				}   
            };
            scope.reculer = function avancer(nb){/*fonction qui permet d'aller à la photo précédente*/
				if(scope.choixphoto>0){
					scope.choixphoto--;
				}else{/*Si la photo est la dernière, on reprend à la fin du tabeau des photos*/
					scope.choixphoto=nb-1;
				}   
            };
        }
    };
    return directiveDefinitionObject; 
});