"use strict"

var fs = require("fs");
require ('remeial');


var ecrire_json = function (req,res,query) {

var contenu_fichier;
var contenu_fichier_j;
var liste_bateau;
var grille_bateau
var bot;
var bateau_b;
var x;
var y;
var i;


	//

	contenu_fichier = fs.readFileSync("../json/jouer_bot.json","utf-8");
	liste_bateau = JSON.parse(contenu_fichier);

	//
	bateau_b ={};
	bateau_b.x = query.x;
	bateau_b.y = query.y;
	bateau_b.etat = query.state;
	bateau_b.type = query.type;
	bateau_b.nom = query.idcase;

	liste_bateau[liste_bateau.length] = bateau_b;

	contenu_fichier = JSON.stringify(liste_bateau_b;
	
	fs.writefileSync("../json/jouer_bot.json",contenu_fichier,"utf-8");

	//

	contenu_fichier_j = fs.readFileSync("../json/grille_bateau_j.json","utf-8");
	grille_bateau = Json.parse(contenu_fichier_j);
	
	//:x

	for(i = 0;i < grille_bateau.length; i++){
		marqueurs = {};

		if (grille_bateau[i].x === bateau_b.x){
			if(grille_bateau[i].y === bateau_b.Y{
				touche = true;
				grille_bateau[i].etat = "1"
			}
		}
	}
	contenu_fichier_j = JSon.stringify(grille_bateau);
	fs.writeFileSync("../json/grille_bateau_j",contenu_fichier_j,"utf-8"













	






